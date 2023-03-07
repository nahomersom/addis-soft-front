import axios from 'axios';
import {call,put,takeEvery,SagaReturnType, takeLatest, all} from 'redux-saga/effects';
import { deleteSong, fetchSongs, registerSong, updateSong } from '../../Api/api';
import { addSong, getSongsSuccess, patchSong, removeSong } from '../data/SongSlice';




function* workGetSongsFetch(){
    const songs:SagaReturnType<typeof fetchSongs> = yield call(fetchSongs); 
    yield put(getSongsSuccess(songs.data));
}
function* workCreateSongs(data:any){
    yield call(registerSong,data.payload); 
    yield put(addSong(data.payload));
}
function* workPatchSongs(data:any){
    yield call(updateSong,data.payload._id,data.payload); 
 
    yield put(patchSong(data.payload));
}
function* workDeleteSongs(SongResponse:any){
    let id = SongResponse.payload.id
    yield call(deleteSong,id); 
    yield put(removeSong(id));
}



function* sagas(){
    yield takeLatest('songs/getSongsFetch',workGetSongsFetch)
    yield takeLatest('songs/addSongPending',workCreateSongs)
    yield takeLatest('songs/patchSongPending',workPatchSongs)
    yield takeLatest('songs/removeSong',workDeleteSongs)
}
export function* songSaga() {
    yield all([
        sagas()
    ])
}








