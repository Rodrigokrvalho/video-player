import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { next, usePlayerCurrentIndex } from "../store/slices/player";


export function Video() {
  const dispatch = useDispatch();
  const { currentLesson } = usePlayerCurrentIndex();

  function handlePlayNext() {
    dispatch(next());
  }

  return (
    <div className='w-full bg-zinc-900 aspect-video'>
      <ReactPlayer
        width="100%"
        height="100%"
        onEnded={handlePlayNext}
        url={`https://youtube.com/watch?v=${currentLesson.id}`}
        controls
        playing
      />
    </div>
  );
}