import React from 'react';
import { TableOfContents } from './TableOfContents';
import type { LessonFrontmatter } from '@/types/content';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface LessonShellProps {
  children: React.ReactNode;
  headings?: Heading[];
  frontmatter?: LessonFrontmatter;
}

/**
 * The 3-column lesson reading layout:
 * [Sidebar (fixed via layout)] | [Lesson Content] | [Table of Contents]
 *
 * Note: The sidebar itself is rendered by app/learn/layout.tsx.
 * LessonShell handles the content + right TOC columns only.
 */
export function LessonShell({ children, headings = [] }: LessonShellProps) {
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        minHeight: 0,
      }}
    >
      {/* Main content column */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
          padding: '3rem 3rem 6rem',
          maxWidth: '760px',
        }}
      >
        {children}
      </main>

      {/* Right TOC column — hidden on smaller viewports via CSS */}
      <div
        style={{
          display: 'flex',
          flexShrink: 0,
        }}
        className="toc-panel"
      >
        <TableOfContents headings={headings} />
      </div>
    </div>
  );
}
