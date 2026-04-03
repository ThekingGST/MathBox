import React from 'react';
import { Callout } from './Callout';
import { CodeBlock } from './CodeBlock';
import { VizSlot } from './VizSlot';
import { MathBlock } from './MathBlock';
import type { MDXComponents as MDXComponentsType } from 'mdx/types';

/**
 * The central MDX component registry.
 * This object maps HTML element names and custom component names
 * to the actual React components used when rendering lesson MDX files.
 *
 * Add new components here as they are built in later phases.
 */
export const MDXComponents: MDXComponentsType = {
  // ─── Custom Block Components ─────────────────────────────────────────────
  Callout,
  VizSlot,
  MathBlock,

  // ─── Code ─────────────────────────────────────────────────────────────────
  pre: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  code: (props: React.HTMLAttributes<HTMLElement> & { children?: string }) => {
    // Block code (has a className like "language-python")
    if (props.className) {
      return <CodeBlock className={props.className}>{props.children ?? ''}</CodeBlock>;
    }
    // Inline code
    return (
      <code
        style={{
          fontFamily: 'var(--font-jetbrains-mono, monospace)',
          fontSize: '0.85em',
          background: 'rgba(99,102,241,0.12)',
          color: '#a5b4fc',
          padding: '0.1em 0.4em',
          borderRadius: '0.25rem',
          border: '1px solid rgba(99,102,241,0.2)',
        }}
      >
        {props.children}
      </code>
    );
  },

  // ─── Typography ───────────────────────────────────────────────────────────
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1
      style={{
        fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        lineHeight: 1.15,
        marginBottom: '1.5rem',
        marginTop: '1rem',
        color: '#f8fafc',
      }}
    >
      {children}
    </h1>
  ),
  h2: ({ children, id }: { children?: React.ReactNode; id?: string }) => (
    <h2
      id={id}
      style={{
        fontSize: '1.5rem',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: '#f1f5f9',
        margin: '3rem 0 1rem',
        paddingTop: '1rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        scrollMarginTop: '6rem',
      }}
    >
      {children}
    </h2>
  ),
  h3: ({ children, id }: { children?: React.ReactNode; id?: string }) => (
    <h3
      id={id}
      style={{
        fontSize: '1.15rem',
        fontWeight: 700,
        color: '#cbd5e1',
        margin: '2.25rem 0 0.75rem',
        scrollMarginTop: '6rem',
      }}
    >
      {children}
    </h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p
      style={{
        color: '#94a3b8',
        lineHeight: 1.8,
        marginBottom: '1.25rem',
        fontSize: '1rem',
      }}
    >
      {children}
    </p>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong style={{ color: '#e2e8f0', fontWeight: 700 }}>{children}</strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em style={{ color: '#c7d2fe', fontStyle: 'italic' }}>{children}</em>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      style={{
        color: '#818cf8',
        textDecoration: 'underline',
        textDecorationColor: 'rgba(129,140,248,0.4)',
        textUnderlineOffset: '3px',
      }}
    >
      {children}
    </a>
  ),

  // ─── Lists ────────────────────────────────────────────────────────────────
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul
      style={{
        color: '#94a3b8',
        lineHeight: 1.8,
        marginBottom: '1.25rem',
        paddingLeft: '1.5rem',
        listStyleType: 'disc',
      }}
    >
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol
      style={{
        color: '#94a3b8',
        lineHeight: 1.8,
        marginBottom: '1.25rem',
        paddingLeft: '1.5rem',
        listStyleType: 'decimal',
      }}
    >
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li style={{ marginBottom: '0.375rem' }}>{children}</li>
  ),

  // ─── Divider ─────────────────────────────────────────────────────────────
  hr: () => (
    <hr
      style={{
        border: 'none',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        margin: '2.5rem 0',
      }}
    />
  ),

  // ─── Blockquote ──────────────────────────────────────────────────────────
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote
      style={{
        borderLeft: '3px solid #6366f1',
        paddingLeft: '1.25rem',
        margin: '1.75rem 0',
        color: '#94a3b8',
        fontStyle: 'italic',
      }}
    >
      {children}
    </blockquote>
  ),
};
