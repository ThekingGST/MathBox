// Types for user progress tracking (anonymous, localStorage-only)

export type LessonStatus = 'not-started' | 'in-progress' | 'completed';

export interface LessonProgress {
  status: LessonStatus;
  startedAt?: string;   // ISO date string
  completedAt?: string; // ISO date string
  quizScore?: number;   // 0–100
}

export interface UserProgress {
  // key: "topic/subject/lesson" slug path
  lessons: Record<string, LessonProgress>;
  totalCompleted: number;
  lastVisited?: string; // lesson slug path
}

export interface ProgressStore extends UserProgress {
  setLessonStatus: (slugPath: string, status: LessonStatus) => void;
  setQuizScore: (slugPath: string, score: number) => void;
  setLastVisited: (slugPath: string) => void;
  resetProgress: () => void;
  getLessonProgress: (slugPath: string) => LessonProgress | undefined;
  getTopicCompletion: (topicSlug: string) => number; // 0–100 percentage
  isHydrated: boolean;
  setHydrated: () => void;
}
