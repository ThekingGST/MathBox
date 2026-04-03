import React from 'react';
import { getCourse } from '@/lib/content';
import { CourseSidebar } from '@/components/layout/CourseSidebar';

export default async function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Course data is fetched server-side so the sidebar is SSR'd
  const course = getCourse();

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
      }}
    >
      <CourseSidebar course={course} />
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
    </div>
  );
}
