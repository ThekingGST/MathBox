// Types for lesson content and course structure

export type LessonStatus = 'locked' | 'available' | 'in-progress' | 'completed';

export interface LessonFrontmatter {
  title: string;
  description: string;
  order: number;
  topic: string;
  subject: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  prerequisites: string[]; // lesson slugs
  tags: string[];
}

export interface Lesson {
  slug: string;
  frontmatter: LessonFrontmatter;
  readingTimeMinutes: number;
  filePath: string;
}

export interface Subject {
  slug: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Topic {
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  subjects: Subject[];
}

export interface Course {
  topics: Topic[];
}

export interface MDXSource {
  compiledSource: string;
  frontmatter: LessonFrontmatter;
  scope?: Record<string, unknown>;
}
