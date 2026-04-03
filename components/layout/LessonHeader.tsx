import React from 'react';
import Link from 'next/link';
import type { LessonFrontmatter } from '@/types/content';

interface LessonHeaderProps {
  frontmatter: LessonFrontmatter;
  topicSlug: string;
  subjectSlug: string;
  readingTimeMinutes: number;
}

const DIFFICULTY_CONFIG = {
  beginner: { label: 'Beginner', color: '#86efac', bg: 'rgba(34,197,94,0.08)' },
  intermediate: { label: 'Intermediate', color: '#fcd34d', bg: 'rgba(245,158,11,0.08)' },
  advanced: { label: 'Advanced', color: '#fca5a5', bg: 'rgba(239,68,68,0.08)' },
};

export function LessonHeader({
  frontmatter,
  topicSlug,
  subjectSlug,
  readingTimeMinutes,
}: LessonHeaderProps) {
  const diff = DIFFICULTY_CONFIG[frontmatter.difficulty] ?? DIFFICULTY_CONFIG.beginner;

  return (
    <header style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      {/* Breadcrumb */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.75rem',
          color: '#64748b',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <Link href="/learn" style={{ color: '#64748b', textDecoration: 'none' }}>
          Learn
        </Link>
        <span>/</span>
        <Link
          href={`/learn/${topicSlug}`}
          style={{ color: '#64748b', textDecoration: 'none', textTransform: 'capitalize' }}
        >
          {topicSlug.replace(/-/g, ' ')}
        </Link>
        <span>/</span>
        <span style={{ color: '#94a3b8', textTransform: 'capitalize' }}>
          {subjectSlug.replace(/-/g, ' ')}
        </span>
      </nav>

      {/* Tags row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        <span
          style={{
            padding: '0.25rem 0.75rem',
            borderRadius: '2rem',
            fontSize: '0.7rem',
            fontWeight: 700,
            background: diff.bg,
            color: diff.color,
            border: `1px solid ${diff.color}33`,
          }}
        >
          {diff.label}
        </span>
        <span style={{ color: '#475569', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <span>⏱</span> {readingTimeMinutes} min read
        </span>
        {frontmatter.tags.map((tag) => (
          <span
            key={tag}
            style={{
              padding: '0.2rem 0.625rem',
              borderRadius: '2rem',
              fontSize: '0.65rem',
              fontWeight: 600,
              background: 'rgba(255,255,255,0.04)',
              color: '#64748b',
              border: '1px solid rgba(255,255,255,0.07)',
              textTransform: 'lowercase',
            }}
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          color: '#f8fafc',
          marginBottom: '1rem',
        }}
      >
        {frontmatter.title}
      </h1>

      {/* Description */}
      <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '640px' }}>
        {frontmatter.description}
      </p>
    </header>
  );
}
