import { describe, expect, it } from "vitest";
import { useStore } from ".";


describe('zustand store', () => {
  it('should to be able to play', () => {
    const { play } = useStore.getState();

    play({ lessonIndex: 2, moduleIndex: 5 });

    const { currentLessonIndex, currentModuleIndex } = useStore.getState();

    expect(currentLessonIndex).toEqual(2);
    expect(currentModuleIndex).toEqual(5);
  });
});