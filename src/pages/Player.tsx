import { ChevronDown, MessageCircle } from 'lucide-react';
import ReactPlayer from 'react-player';
import { Header } from '../components/Header';
import { Video } from '../components/Video';
import { Module } from '../components/Module';
import { useAppDispatch, useAppSelector } from '../store';
import { loadCourse, usePlayerCurrentIndex } from '../store/slices/player';
import { useEffect } from 'react';

export function Player() {
  const dispatch = useAppDispatch();

  const modules = useAppSelector(state => state.player.course?.modules);
  const currentModule = useAppSelector(state => state.player.currentModuleIndex);

  const { currentLesson } = usePlayerCurrentIndex();

  useEffect(() => {
    dispatch(loadCourse());
  }, []);

  useEffect(() => {
    if (currentLesson) {
      document.title = currentLesson.title;
    }
  }, [currentLesson]);

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">

          <Header />

          <button className='flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600'>
            <MessageCircle className='w-4  h-4' />
            Deixar feedback
          </button>

        </div>

        <main className='relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80' >
          <div className='flex-1'>
            <Video />
          </div>

          <aside className='w-80 overflow-y-scroll border-l border-zinc-800 bg-zinc-900 divide-y-2 divide-zinc-900 absolute top-0 bottom-0 right-0 scrollbar scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-950'>
            {modules && modules.map((module, index) => (
              <Module
                isOpen={index === currentModule}
                key={module.id}
                moduleIndex={index}
                title={module.title}
                amountOfLessons={module.lessons.length}
              />
            ))}


          </aside>
        </main>
      </div>
    </div>
  );
}