import { compileMDX } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { MDXComponents } from '@/components/mdx/MDXComponents';
import type { LessonFrontmatter } from '@/types/content';

/**
 * Compile raw MDX string into a renderable React Server Component.
 * Includes: math (KaTeX), auto-linked headings, custom component registry.
 *
 * @param source - Raw .mdx file content (including frontmatter)
 */
export async function compileMdxLesson(source: string) {
  const { content, frontmatter } = await compileMDX<LessonFrontmatter>({
    source,
    components: MDXComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [
          rehypeKatex,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
              properties: {
                className: ['anchor-link'],
                ariaLabel: 'Link to section',
              },
            },
          ],
        ],
      },
    },
  });

  return { content, frontmatter };
}
