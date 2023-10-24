import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronDown } from "lucide-react";
import { Lesson } from "./Lesson";
import { useAppSelector } from '../store';
import { useDispatch } from 'react-redux';
import { play } from '../store/slices/player';

interface ModuleProps {
  moduleIndex: number;
  title: string;
  amountOfLessons: number;
  isOpen: boolean;
}

export function Module({ amountOfLessons, title, moduleIndex, isOpen }: ModuleProps) {
  const { currentLessonIndex, currentModuleIndex } = useAppSelector(state => {
    const { currentLessonIndex, currentModuleIndex } = state.player;

    return { currentLessonIndex, currentModuleIndex };
  });
  const lessons = useAppSelector(state => state.player.course?.modules[moduleIndex].lessons);
  const dispatch = useDispatch();

  function handlePlayLesson(moduleIndex: number, lessonIndex: number) {
    dispatch(play({ moduleIndex, lessonIndex }));
  }

  return (
    <Collapsible.Root className='group' defaultOpen={isOpen}>
      <Collapsible.Trigger className='flex w-full items-center gap-3 bg-zinc-800 p-4'>
        <span className='flex h-10 w-10 rounded-full items-center justify-center bg-zinc-900 text-xs'>{moduleIndex + 1}</span>

        <div className='flex flex-col gap-1 text-left'>
          <strong className='text-sm'>{title}</strong>
          <span className='text-xs text-zinc-400'>{amountOfLessons} aula{amountOfLessons > 1 && 's'}</span>
        </div>

        <ChevronDown className='w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform' />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className='relative flex flex-col gap-4 p-6'>
          {lessons && lessons.map((lesson, lessonIndex) => {
            const isCurrent = currentModuleIndex === moduleIndex && currentLessonIndex === lessonIndex;
            return (
              <Lesson
                onPlay={() => handlePlayLesson(moduleIndex, lessonIndex)}
                key={lesson.id}
                title={lesson.title}
                duration={lesson.duration}
                isCurrent={isCurrent}
              />
            );
          })}
        </nav>
      </Collapsible.Content>

    </Collapsible.Root>
  );
}