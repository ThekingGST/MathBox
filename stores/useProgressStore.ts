import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ProgressStore, LessonProgress, LessonStatus, UserProgress } from '@/types/progress';

const initialState: UserProgress = {
  lessons: {},
  totalCompleted: 0,
  lastVisited: undefined,
};

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      isHydrated: false,

      setHydrated: () => set({ isHydrated: true }),

      setLessonStatus: (slugPath: string, status: LessonStatus) => {
        set((state) => {
          const existing = state.lessons[slugPath] ?? {};
          const now = new Date().toISOString();

          const updated: LessonProgress = {
            ...existing,
            status,
            ...(status === 'in-progress' && !existing.startedAt ? { startedAt: now } : {}),
            ...(status === 'completed' ? { completedAt: now } : {}),
          };

          const lessons = { ...state.lessons, [slugPath]: updated };
          const totalCompleted = Object.values(lessons).filter(
            (l) => l.status === 'completed'
          ).length;

          return { lessons, totalCompleted };
        });
      },

      setQuizScore: (slugPath: string, score: number) => {
        set((state) => ({
          lessons: {
            ...state.lessons,
            [slugPath]: {
              ...state.lessons[slugPath],
              quizScore: score,
            },
          },
        }));
      },

      setLastVisited: (slugPath: string) => set({ lastVisited: slugPath }),

      resetProgress: () => set({ ...initialState, isHydrated: true }),

      getLessonProgress: (slugPath: string) => {
        return get().lessons[slugPath];
      },

      getTopicCompletion: (topicSlug: string) => {
        const lessons = get().lessons;
        const topicLessons = Object.entries(lessons).filter(([key]) =>
          key.startsWith(`${topicSlug}/`)
        );
        if (topicLessons.length === 0) return 0;
        const completed = topicLessons.filter(
          ([, v]) => v.status === 'completed'
        ).length;
        return Math.round((completed / topicLessons.length) * 100);
      },
    }),
    {
      name: 'mathbox-progress-v1',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
