import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { next, usePlayerCurrentIndex } from "../store/slices/player";
import { useAppSelector } from "../store";
import { Loader } from "lucide-react";


export function Video() {
  const dispatch = useDispatch();
  const { currentLesson } = usePlayerCurrentIndex();
  const isCourseLoading = useAppSelector(state => state.player.isLoading);

  function handlePlayNext() {
    dispatch(next());
  }

  return (
    <div className='w-full bg-zinc-900 aspect-video'>
      {isCourseLoading
        ? (
          <div className="flex h-full items-center justify-center">
            <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
          </div>
        )
        : (
          <ReactPlayer
            width="100%"
            height="100%"
            onEnded={handlePlayNext}
            url={`https://youtube.com/watch?v=${currentLesson?.id}`}
            controls
            playing
          />
        )
      }
    </div>
  );
}