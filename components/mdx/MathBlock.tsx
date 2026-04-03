'use client';

import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface MathBlockProps {
  children: string;
  display?: boolean;
}

/**
 * Renders a KaTeX math expression.
 * Used inline via $...$ or as a display block via $$...$$
 */
export function MathBlock({ children, display = true }: MathBlockProps) {
  if (display) {
    return (
      <div className="math-block">
        <BlockMath math={children} />
      </div>
    );
  }
  return <InlineMath math={children} />;
}
