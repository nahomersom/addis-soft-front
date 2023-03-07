import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import {songSaga} from '../sagas/songSaga';
import songsSlice from '../data/SongSlice'
const saga = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    songs: songsSlice, 
  },
  middleware:[saga]
});
saga.run(songSaga)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch