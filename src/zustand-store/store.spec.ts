import { beforeEach, describe, expect, it } from "vitest";
import { useStore as store } from ".";

const mocCourse = {
  id: 1,
  modules: [
    {
      id: '1',
      title: 'Iniciando com React',
      lessons: [
        { id: 'Jai8w6K_GnY', title: 'CSS Modules', duration: '13:45' },
        { id: 'w-DW4DhDfcw', title: 'Estilização do Post', duration: '10:05' },
      ],
    },
    {
      id: '2',
      title: 'Estrutura da aplicação',
      lessons: [
        { id: 'gE48FQXRZ_o', title: 'Componente: Comment', duration: '13:45' },
        { id: 'Ng_Vk4tBl0g', title: 'Responsividade', duration: '10:05' },
      ],
    },
  ],
};

const initialState = store.getState();

describe('zustand store', () => {
  beforeEach(() => {
    store.setState(initialState);
  });

  it('should to be able to play', () => {
    const { play } = store.getState();

    play({ lessonIndex: 2, moduleIndex: 5 });

    const { currentLessonIndex, currentModuleIndex } = store.getState();

    expect(currentLessonIndex).toEqual(2);
    expect(currentModuleIndex).toEqual(5);
  });

  it('should be able to play next video automatically', () => {
    store.setState({ course: mocCourse });
    const { next } = store.getState();

    next();

    const { currentLessonIndex, currentModuleIndex } = store.getState();

    expect(currentLessonIndex).toEqual(1);
    expect(currentModuleIndex).toEqual(0);
  });

  it('should to be able to jump to next module if it is on the last lesson of the module', () => {
    store.setState({
      course: mocCourse,
      currentModuleIndex: 0,
      currentLessonIndex: 1,
    });

    const { next } = store.getState();

    next();

    const { currentLessonIndex, currentModuleIndex } = store.getState();

    expect(currentModuleIndex).toEqual(1);
    expect(currentLessonIndex).toEqual(0);
  });

  it('should not to be able to update on the end of the last lesson of the module', () => {
    store.setState({
      course: mocCourse,
      currentModuleIndex: 1,
      currentLessonIndex: 1,
    });

    const { next } = store.getState();

    next();

    const { currentLessonIndex, currentModuleIndex } = store.getState();

    expect(currentModuleIndex).toEqual(1);
    expect(currentLessonIndex).toEqual(1);
  });
});