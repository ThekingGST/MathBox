# Mathbox

> An interactive platform to visualize, code, and truly understand the mathematics powering the AI revolution.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black.svg?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB.svg?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Why This Exists

Most math education platforms treat mathematical concepts as static equations on a white background. As AI and Machine Learning demand deeper geometric intuition, static math isn't enough. **Mathbox** exists to make math deeply interactive — bridging the gap between theoretical calculus/linear algebra and interactive 3D visualizations, paired with live Python execution in the browser.

## Quick Start

Mathbox is built on Next.js 16 (App Router) and uses Turbopack. You don't need any complex backend to run it locally.

```bash
# Clone the repository
git clone https://github.com/yourname/mathbox.git
cd mathbox

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the platform. 

## The Stack

- **Framework**: Next.js 16 (React 19 + Server Components)
- **Styling**: Pure, high-performance Vanilla CSS (Custom "Math-Indigo" Design System)
- **State Management**: Zustand
- **Content Engine**: `next-mdx-remote/rsc` with KaTeX and custom components
- **Interactivity**: Three.js / React Three Fiber (Visualizations) & Pyodide (WASM Python Sandbox)

## Content Authoring

Mathbox is a content-driven platform. Lessons are written in `MDX`.

To add a new lesson, place an `.mdx` file inside the `content/` directory following the `[topic]/[subject]/[lesson-name].mdx` hierarchy. Spaces are not allowed in folder names.

**Example `content/linear-algebra/vectors/what-is-a-vector.mdx`:**

```mdx
---
title: "What is a Vector?"
description: "Understanding magnitude, direction, and vector spaces."
order: 1
status: "published"
---

Welcome to Linear Algebra! Let's explore vectors.

<MathBlock math="\vec{v} = \begin{bmatrix} x \\ y \end{bmatrix}" display />

<VizSlot id="VectorAddition" />

<CodeBlock language="python">
import numpy as np
v = np.array([1, 2])
print(v)
</CodeBlock>
```

The system automatically extracts the frontmatter, builds the sidebar navigation, and parses headings for the interactive Table of Contents.

## Architecture Highlights

1. **Server-Side Content Pipeline**: MDX is compiled securely on the server using `compileMDX`. Custom React components are baked into the registry before sending HTML to the client, preventing React serialization errors.
2. **Hydration Gating**: Persistent local state (like lesson completion tracking) is deferred via a `<ProgressHydrationGate>` to prevent painful Next.js hydration mismatches between the server payload and client `localStorage`.
3. **No Phantom CSS**: The project deliberately bans utility CSS frameworks like Tailwind in favor of a strictly managed, highly-performant `globals.css` that provides rich glassmorphism and ambient animations.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to add new 3D visualizations or expand the Python REPL sandbox.

## License

MIT © [Saiteja Gavuji]
