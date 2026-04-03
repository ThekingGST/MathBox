'use client';

import React from 'react';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
  lessonTitle?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class LessonErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[LessonErrorBoundary] Lesson crashed:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            padding: '3rem 2rem',
            textAlign: 'center',
            gap: '1.5rem',
          }}
        >
          <div style={{ fontSize: '3rem' }}>📖</div>
          <h2 style={{ color: '#f8fafc', fontWeight: 800, fontSize: '1.5rem' }}>
            {this.props.lessonTitle
              ? `"${this.props.lessonTitle}" failed to load`
              : 'Lesson failed to load'}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: '400px' }}>
            {this.state.error?.message ??
              'There was an unexpected error rendering this lesson. Please try again or go back to the course index.'}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => this.setState({ hasError: false })}
              style={{
                padding: '0.6rem 1.5rem',
                background: 'rgba(99, 102, 241, 0.15)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '0.75rem',
                color: '#a5b4fc',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              Try Again
            </button>
            <Link
              href="/learn"
              style={{
                padding: '0.6rem 1.5rem',
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '0.75rem',
                color: '#94a3b8',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              Back to Courses
            </Link>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
