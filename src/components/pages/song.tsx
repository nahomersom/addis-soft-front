import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import SharedButton from "../shared/button";

import { SongResponse } from "../../model/songsResponse";
import {  addSongPending, patchSongPending } from "../../redux/data/SongSlice";
import TextField from "../shared/TextField";
import { RootState } from "../../redux/store/store";
const Container = styled.div`
display:flex;
justify-content:center;
`
const Wrapper = styled.div`
margin-top:60px;
width:50%;
`
const FormHolder = styled.div`
display:flex;
flex-direction:column;
gap:10px;
h2{
    align-self:center;
}
`
const initialValue = {
    _id:'',
    title:'',
    artist:'',
    album:'',
    genre:'',
    
    }


    const Song = () =>{

   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const songs = useSelector((state: RootState) => state.songs.songs.data);
    const existingSongs = songs.filter(song => song._id === params.id);
    const [values,setValues] = useState<SongResponse>(
         existingSongs[0] ?? initialValue
    );

   

 
    

    const handleFormSubmit= () =>{
        if(params.id && existingSongs){
            dispatch(patchSongPending({
                _id:params.id,
                title:values.title,
                artist:values.artist,
                genre:values.genre,
                album:values.album
    
            }))
        }else{

            dispatch(addSongPending({
                title:values.title,
                artist:values.artist,
                genre:values.genre,
                album:values.album
    
            }))
        }
        setValues(initialValue);
       
         navigate('/');
    }
    return(
        <Container>

    <Wrapper>
        <FormHolder>

        <h2>Add a new Song</h2>
        <TextField
     label="Title"
     value={values.title}
     onChange={(e) => setValues({...values,title:e.target.value})}
     props={{
        placeholder:'Song Title',
     }}
    />
          <TextField
     label="Artist"
     value={values.artist}
     onChange={(e) => setValues({...values,artist:e.target.value})}
     props={{
        placeholder:'Artist Name',
     }}
    />
          <TextField
     label="Album"
     value={values.album}
     onChange={(e) => setValues({...values,album:e.target.value})}
     props={{
        placeholder:'Album Name',
     }}
    />
          <TextField
     label="Genre"
     value={values.genre}
     onChange={(e) => setValues({...values,genre:e.target.value})}
     props={{
        placeholder:'Genre',
     }}
    />
    <SharedButton
    label='Submit'
    onClick={handleFormSubmit}
    props={{
        width:'5%',
     }}
    ></SharedButton>
        </FormHolder>
    </Wrapper>
        </Container>
);

}
export default Song