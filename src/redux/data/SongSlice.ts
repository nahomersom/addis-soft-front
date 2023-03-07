import { createSlice } from "@reduxjs/toolkit";
import { SongResponse } from "../../model/songsResponse";

type SongState = {
    data: SongResponse[]; 
    error: null | string;
    isPending: boolean;

  };
  
  const initialState: SongState = {
    data: [],
    error: null,
    isPending: false,
  };

 const songSlice = createSlice({
   name:'songs',
   
   initialState:{
    songs:initialState,
    error: null,
    isPending: false,
    success:true
   },
   reducers:{
getSongsFetch:(state)=>{
        state.isPending = true;
    },
getSongsSuccess:(state,action)=>{
        state.songs.data = action.payload;
        state.isPending = false;
   },
  getSongsFailure:(state)=>{
         state.isPending = false;
   },
  addSong:(state,action)=>{
       state.success = true;
       console.log('action',action.payload);
       state.songs.data.push(action.payload);
   },
    addSongPending:(state,action)=>{
    state.isPending = true;
},
patchSongPending:(state,action)=>{
  state.isPending = true;
},
 patchSong:(state,action)=>{
    state.success = true;
    let id = action.payload._id;
    state.songs.data = state.songs.data.map(i => i._id == id ? action.payload : i)
    return state
},
removeSong:(state,action)=>{
  state.success = true;
  let id = action.payload.id;
  state.songs.data = state.songs.data.filter(i => i._id !== id)
  return state
}

}
});
export const {getSongsFetch,
  addSongPending,
  getSongsSuccess,getSongsFailure,addSong,patchSong,removeSong,patchSongPending} = songSlice.actions;
export default songSlice.reducer;