import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { Lesson, LessonFrontmatter, Subject, Topic, Course } from '@/types/content';

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Get all lesson slugs under a given topic/subject path.
 * Returns slugs as "topic/subject/lesson" strings.
 */
export function getAllLessonSlugs(): string[] {
  const slugs: string[] = [];

  if (!fs.existsSync(CONTENT_DIR)) return slugs;

  const topics = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const topic of topics) {
    const topicPath = path.join(CONTENT_DIR, topic);
    const subjects = fs.readdirSync(topicPath, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const subject of subjects) {
      const subjectPath = path.join(topicPath, subject);
      const files = fs.readdirSync(subjectPath)
        .filter((f) => f.endsWith('.mdx'));

      for (const file of files) {
        const lessonSlug = file.replace(/\.mdx$/, '');
        slugs.push(`${topic}/${subject}/${lessonSlug}`);
      }
    }
  }

  return slugs;
}

/**
 * Read the raw frontmatter and markdown body for a lesson.
 * slugPath: "topic/subject/lesson"
 */
export function getLessonData(slugPath: string): Lesson {
  const filePath = path.join(CONTENT_DIR, `${slugPath}.mdx`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const { minutes } = readingTime(content);
  const [topic, subject] = slugPath.split('/');

  return {
    slug: slugPath,
    frontmatter: data as LessonFrontmatter,
    readingTimeMinutes: Math.ceil(minutes),
    filePath,
    // @ts-expect-error — topic/subject derived from path for convenience
    topic,
    subject,
  };
}

/**
 * Build a fully structured Course object from the content directory.
 * Used by the /learn index page.
 */
export function getCourse(): Course {
  const topicDirs = fs.existsSync(CONTENT_DIR)
    ? fs.readdirSync(CONTENT_DIR, { withFileTypes: true }).filter((d) => d.isDirectory())
    : [];

  const topics: Topic[] = topicDirs.map((topicDir) => {
    const topicSlug = topicDir.name;
    const topicMetaPath = path.join(CONTENT_DIR, topicSlug, '_meta.json');
    const topicMeta = fs.existsSync(topicMetaPath)
      ? JSON.parse(fs.readFileSync(topicMetaPath, 'utf-8'))
      : { title: topicSlug, description: '', icon: '📚', color: '#6366f1', order: 0 };

    const subjectDirs = fs
      .readdirSync(path.join(CONTENT_DIR, topicSlug), { withFileTypes: true })
      .filter((d) => d.isDirectory());

    const subjects: Subject[] = subjectDirs.map((subjectDir) => {
      const subjectSlug = subjectDir.name;
      const subjectMetaPath = path.join(CONTENT_DIR, topicSlug, subjectSlug, '_meta.json');
      const subjectMeta = fs.existsSync(subjectMetaPath)
        ? JSON.parse(fs.readFileSync(subjectMetaPath, 'utf-8'))
        : { title: subjectSlug, description: '', order: 0 };

      const lessonFiles = fs
        .readdirSync(path.join(CONTENT_DIR, topicSlug, subjectSlug))
        .filter((f) => f.endsWith('.mdx'));

      const lessons: Lesson[] = lessonFiles
        .map((file) => getLessonData(`${topicSlug}/${subjectSlug}/${file.replace(/\.mdx$/, '')}`))
        .sort((a, b) => a.frontmatter.order - b.frontmatter.order);

      return { slug: subjectSlug, ...subjectMeta, lessons } satisfies Subject;
    }).sort((a, b) => a.order - b.order);

    return { slug: topicSlug, ...topicMeta, subjects } satisfies Topic;
  }).sort((a, b) => a.order - b.order);

  return { topics };
}
