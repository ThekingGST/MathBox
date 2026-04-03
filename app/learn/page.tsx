import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCourse } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Learn | Mathbox',
  description: 'Explore all math topics — Linear Algebra, Calculus, Probability, and more.',
};

export default async function LearnPage() {
  const course = getCourse();

  // Show empty state if no content exists yet
  if (course.topics.length === 0) {
    return (
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          padding: '3rem 2rem',
          textAlign: 'center',
          gap: '1.25rem',
        }}
      >
        <div style={{ fontSize: '3rem' }}>📚</div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc' }}>
          Lessons are on the way
        </h1>
        <p style={{ color: '#64748b', maxWidth: '380px', lineHeight: 1.7, fontSize: '0.9rem' }}>
          The content pipeline is set up. Add <code style={{ fontFamily: 'monospace', color: '#a5b4fc' }}>.mdx</code> files
          inside <code style={{ fontFamily: 'monospace', color: '#a5b4fc' }}>content/</code> to see them here.
        </p>
        <Link
          href="/"
          style={{
            marginTop: '0.5rem',
            padding: '0.625rem 1.5rem',
            background: 'rgba(99,102,241,0.12)',
            border: '1px solid rgba(99,102,241,0.25)',
            borderRadius: '0.75rem',
            color: '#a5b4fc',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '0.875rem',
          }}
        >
          ← Home
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: '3rem 3rem 6rem', maxWidth: '900px' }}>
      {/* Page header */}
      <div style={{ marginBottom: '3rem' }}>
        <p
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: '#6366f1',
            marginBottom: '0.75rem',
          }}
        >
          Course Catalog
        </p>
        <h1
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#f8fafc',
            lineHeight: 1.1,
          }}
        >
          Choose your topic
        </h1>
        <p style={{ color: '#64748b', marginTop: '0.875rem', fontSize: '1rem', lineHeight: 1.6 }}>
          Every topic is self-contained. Start anywhere.
        </p>
      </div>

      {/* Topic grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {course.topics.map((topic) => {
          const totalLessons = topic.subjects.reduce((n, s) => n + s.lessons.length, 0);
          const firstLesson = topic.subjects[0]?.lessons[0];

          return (
            <Link
              key={topic.slug}
              href={firstLesson ? `/learn/${firstLesson.slug}` : '#'}
              style={{ textDecoration: 'none' }}
            >
              <div
                className="glass-card"
                style={{
                  padding: '1.75rem',
                  borderRadius: '1.5rem',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    background: `${topic.color ?? '#6366f1'}15`,
                    border: `1px solid ${topic.color ?? '#6366f1'}30`,
                    marginBottom: '1.25rem',
                  }}
                >
                  {topic.icon ?? '📐'}
                </div>
                <h2
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#f1f5f9',
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {topic.title}
                </h2>
                <p
                  style={{
                    color: '#64748b',
                    fontSize: '0.825rem',
                    lineHeight: 1.6,
                    marginBottom: '1.25rem',
                  }}
                >
                  {topic.description}
                </p>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: topic.color ?? '#6366f1',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  {totalLessons} {totalLessons === 1 ? 'lesson' : 'lessons'} →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
