import { create } from "zustand";

export interface Course {
  id: number;
  modules: {
    id: string;
    title: string;
    lessons: {
      id: string;
      title: string;
      duration: string;
    }[];
  }[];
}

export interface PlayerState {
  course: Course | null;
  currentModuleIndex: number;
  currentLessonIndex: number;
  isLoading: boolean;

  play: (payload: { lessonIndex: number, moduleIndex: number; }) => void;
  next: () => void;
}


export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentLessonIndex: 0,
    currentModuleIndex: 0,
    isLoading: true,

    play(payload) {
      set({
        currentModuleIndex: payload.moduleIndex,
        currentLessonIndex: payload.lessonIndex
      });
    },

    next() {
      const { currentLessonIndex, currentModuleIndex, course } = get();
      const nextLessonIndex = currentLessonIndex + 1;
      const nextLesson = course?.modules[currentModuleIndex].lessons[nextLessonIndex];

      if (nextLesson) {
        set({
          currentLessonIndex: nextLessonIndex
        });
        return;
      }

      const nextModuleIndex = currentModuleIndex + 1;
      const nextModule = course?.modules[nextModuleIndex];

      if (nextModule) {
        set({
          currentLessonIndex: 0,
          currentModuleIndex: nextModuleIndex
        });
      }
    }
  };
});