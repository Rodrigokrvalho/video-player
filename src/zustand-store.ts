import { create } from "zustand";
import { api } from "./lib/axios";

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
  load: () => Promise<void>;
}


export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentLessonIndex: 0,
    currentModuleIndex: 0,
    isLoading: true,

    async load() {
      set({ isLoading: true });

      const response = await api.get('/course');

      set({
        course: response.data,
        isLoading: false
      });

    },

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

export const usePlayerCurrentIndexZustand = () => useStore(state => {
  const { currentLessonIndex, currentModuleIndex } = state;

  const currentModule = state.course?.modules[currentModuleIndex];
  const currentLesson = currentModule?.lessons[currentLessonIndex];

  return { currentLesson, currentModule };
});