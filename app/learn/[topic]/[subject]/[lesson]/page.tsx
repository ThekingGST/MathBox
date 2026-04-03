import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllLessonSlugs, getLessonData } from '@/lib/content';
import { compileMdxLesson } from '@/lib/mdx';
import { LessonShell } from '@/components/layout/LessonShell';
import { LessonHeader } from '@/components/layout/LessonHeader';
import { ProgressHydrationGate } from '@/components/providers/ProgressHydrationGate';
import fs from 'fs';
import path from 'path';

interface PageParams {
  params: Promise<{ topic: string; subject: string; lesson: string }>;
}

// Generate all possible lesson paths at build time
export async function generateStaticParams() {
  const slugs = getAllLessonSlugs();
  return slugs.map((slug) => {
    const [topic, subject, lesson] = slug.split('/');
    return { topic, subject, lesson };
  });
}

// Dynamic metadata per lesson
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  try {
    const { topic, subject, lesson } = await params;
    const slugPath = `${topic}/${subject}/${lesson}`;
    const lessonData = getLessonData(slugPath);
    return {
      title: `${lessonData.frontmatter.title} | Mathbox`,
      description: lessonData.frontmatter.description,
    };
  } catch {
    return { title: 'Lesson | Mathbox' };
  }
}

export default async function LessonPage({ params }: PageParams) {
  const { topic, subject, lesson } = await params;
  const slugPath = `${topic}/${subject}/${lesson}`;

  // Check lesson exists
  const filePath = path.join(process.cwd(), 'content', `${slugPath}.mdx`);
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  // Load and compile the MDX.
  // compileMdxLesson already bakes in the MDXComponents registry server-side.
  // DO NOT pass components again at render time — that crosses the server/client
  // boundary and causes "Functions cannot be passed to Client Components" errors.
  const lessonData = getLessonData(slugPath);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { content, frontmatter } = await compileMdxLesson(raw);

  const headings: { id: string; text: string; level: number }[] = [];

  return (
    // LessonShell and LessonHeader are Server Components — safe to render here.
    // ProgressHydrationGate is a Client Component but receives no function props.
    <LessonShell headings={headings} frontmatter={frontmatter}>
      <LessonHeader
        frontmatter={frontmatter}
        topicSlug={topic}
        subjectSlug={subject}
        readingTimeMinutes={lessonData.readingTimeMinutes}
      />
      <ProgressHydrationGate>
        {/* content is a React Server Component — render it directly, no extra props */}
        <article className="mdx-content">{content}</article>
      </ProgressHydrationGate>
    </LessonShell>
  );
}
