'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProgressStore } from '@/stores/useProgressStore';
import type { Course } from '@/types/content';

interface CourseSidebarProps {
  course: Course;
}

export function CourseSidebar({ course }: CourseSidebarProps) {
  const pathname = usePathname();
  const getLessonProgress = useProgressStore((s) => s.getLessonProgress);
  const getTopicCompletion = useProgressStore((s) => s.getTopicCompletion);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      style={{
        width: isOpen ? '280px' : '64px',
        flexShrink: 0,
        height: 'calc(100vh - 64px)',
        position: 'sticky',
        top: '64px',
        overflowY: isOpen ? 'auto' : 'hidden',
        overflowX: 'hidden',
        padding: '1.5rem 0',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(6,7,10,0.8)',
        backdropFilter: 'blur(12px)',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        whiteSpace: 'nowrap',
      }}
    >
      {/* Header and Toggle Button */}
      <div 
        style={{ 
          padding: isOpen ? '0 1.25rem 1.25rem' : '0 1rem 1.25rem', 
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isOpen ? 'space-between' : 'center',
        }}
      >
        {isOpen && (
          <Link
            href="/learn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              color: '#f8fafc',
              fontWeight: 800,
              fontSize: '1.1rem',
              letterSpacing: '-0.02em',
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>📐</span>
            Mathbox
          </Link>
        )}
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          title={isOpen ? "Close Sidebar" : "Open Sidebar"}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#cbd5e1',
            cursor: 'pointer',
            padding: '0.4rem 0.5rem',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)';
            e.currentTarget.style.color = '#a5b4fc';
            e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.color = '#cbd5e1';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          }}
        >
          {isOpen ? '◀' : '☰'}
        </button>
      </div>

      {/* Course topics - hide immediately when animating to avoid text overflow */}
      <nav style={{ 
        padding: '1rem 0',
        opacity: isOpen ? 1 : 0, 
        transition: 'opacity 0.2s ease',
        pointerEvents: isOpen ? 'auto' : 'none'
      }}>
        {course.topics.map((topic) => {
          const pct = getTopicCompletion(topic.slug);
          return (
            <div key={topic.slug} style={{ marginBottom: '0.25rem' }}>
              {/* Topic header */}
              <div
                style={{
                  padding: '0.6rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                }}
              >
                <span style={{ fontSize: '1rem' }}>{topic.icon}</span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: topic.color ?? '#6366f1',
                  }}
                >
                  {topic.title}
                </span>
                {pct > 0 && (
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontSize: '0.65rem',
                      color: '#64748b',
                      fontWeight: 600,
                    }}
                  >
                    {pct}%
                  </span>
                )}
              </div>

              {/* Subjects + lessons */}
              {topic.subjects.map((subject) => (
                <div key={subject.slug}>
                  <div
                    style={{
                      padding: '0.35rem 1.25rem 0.35rem 2.5rem',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: '#475569',
                    }}
                  >
                    {subject.title}
                  </div>
                  {subject.lessons.map((lesson) => {
                    const slugPath = `${topic.slug}/${subject.slug}/${lesson.slug.split('/').pop()}`;
                    const progress = getLessonProgress(slugPath);
                    const isActive = pathname?.includes(lesson.slug);
                    const isCompleted = progress?.status === 'completed';

                    return (
                      <Link
                        key={lesson.slug}
                        href={`/learn/${lesson.slug}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          padding: '0.45rem 1.25rem 0.45rem 2.75rem',
                          fontSize: '0.825rem',
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? '#a5b4fc' : isCompleted ? '#86efac' : '#94a3b8',
                          background: isActive ? 'rgba(99,102,241,0.1)' : 'transparent',
                          borderRight: isActive ? '2px solid #6366f1' : '2px solid transparent',
                          textDecoration: 'none',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <span style={{ fontSize: '0.7rem', flexShrink: 0 }}>
                          {isCompleted ? '✓' : '○'}
                        </span>
                        {lesson.frontmatter.title}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

