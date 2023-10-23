import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { player } from './slices/player';


export const store = configureStore({
  reducer: {
    player,
  }
});


export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;