import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { api } from "../../lib/axios";

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
}

const initialState: PlayerState = {
  course: null,
  currentLessonIndex: 0,
  currentModuleIndex: 0,
  isLoading: true
};

export const loadCourse = createAsyncThunk(
  'player/load',
  async () => {
    const response = await api.get('/course');

    return response.data;
  }
);

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    play(state, action: PayloadAction<{ lessonIndex: number, moduleIndex: number; }>) {
      state.currentLessonIndex = action.payload.lessonIndex;
      state.currentModuleIndex = action.payload.moduleIndex;
    },
    next(state) {
      const nextLessonIndex = state.currentLessonIndex + 1;
      const nextLesson = state.course?.modules[state.currentModuleIndex].lessons[nextLessonIndex];

      if (nextLesson) {
        state.currentLessonIndex = nextLessonIndex;
        return;
      }

      const nextModuleIndex = state.currentModuleIndex + 1;
      const nextModule = state.course?.modules[nextModuleIndex];

      if (nextModule) {

        state.currentLessonIndex = 0;
        state.currentModuleIndex = nextModuleIndex;
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(loadCourse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadCourse.fulfilled, (state, action) => {
      state.course = action.payload;
      state.isLoading = false;
    });
  },
});

export const player = playerSlice.reducer;

export const { play, next } = playerSlice.actions;

export const usePlayerCurrentIndex = () => useAppSelector(state => {
  const { currentLessonIndex, currentModuleIndex } = state.player;

  const currentModule = state.player.course?.modules[currentModuleIndex];
  const currentLesson = currentModule?.lessons[currentLessonIndex];

  return { currentLesson, currentModule };
});