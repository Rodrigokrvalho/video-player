import { describe, expect, it } from 'vitest';
import { player as reducer, play, next, Course, PlayerState } from './player';

const mocPlayerSlice: PlayerState = {
  course: {
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
  },
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: false
};


describe('player slice', () => {
  it('should be able to play', () => {
    const newState = reducer(mocPlayerSlice, play({ lessonIndex: 1, moduleIndex: 0 }));

    expect(newState.currentLessonIndex).toEqual(1);
    expect(newState.currentModuleIndex).toEqual(0);
  });

  it('should be able to play next video automatically', () => {
    const newState = reducer(mocPlayerSlice, play({ lessonIndex: 1, moduleIndex: 0 }));

    expect(newState.currentLessonIndex).toEqual(1);
    expect(newState.currentModuleIndex).toEqual(0);
  });

  it('should to be able to jump to next module if it is on the last lesson of the module', () => {
    const initialState = {
      ...mocPlayerSlice,
      currentModuleIndex: 0,
      currentLessonIndex: 1,
    };

    const newState = reducer(initialState, next());

    expect(newState.currentModuleIndex).toEqual(1);
    expect(newState.currentLessonIndex).toEqual(0);
  });

  it('should not to be able to update on the end of the last lesson of the module', () => {
    const initialState = {
      ...mocPlayerSlice,
      currentModuleIndex: 1,
      currentLessonIndex: 1,
    };

    const newState = reducer(initialState, next());

    expect(newState.currentModuleIndex).toEqual(1);
    expect(newState.currentLessonIndex).toEqual(1);
  });
});