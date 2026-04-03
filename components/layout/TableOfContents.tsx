'use client';

import React, { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

/**
 * Right-side TOC that auto-highlights the active section
 * based on IntersectionObserver scroll position.
 */
export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -60% 0%', threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside
      style={{
        width: '220px',
        flexShrink: 0,
        height: 'calc(100vh - 64px)',
        position: 'sticky',
        top: '64px',
        overflowY: 'auto',
        padding: '2rem 0 2rem 1.5rem',
      }}
    >
      <p
        style={{
          fontSize: '0.65rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: '#475569',
          marginBottom: '1rem',
        }}
      >
        On this page
      </p>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
        {headings.map(({ id, text, level }) => {
          const isActive = activeId === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              style={{
                display: 'block',
                fontSize: '0.78rem',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#a5b4fc' : '#64748b',
                padding: '0.3rem 0',
                paddingLeft: level === 3 ? '0.875rem' : '0',
                textDecoration: 'none',
                borderLeft: isActive ? '2px solid #6366f1' : '2px solid transparent',
                paddingInlineStart: level === 3 ? '0.875rem' : '0.25rem',
                transition: 'color 0.15s ease',
                lineHeight: 1.4,
              }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {text}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
