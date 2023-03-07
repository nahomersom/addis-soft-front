import axios from "axios";
import { SongResponse } from "../model/songsResponse";
const baseUrl = 'http://localhost:8000/api/songs/'

export const fetchSongs = async () => axios.get(`${baseUrl}getAll`);

export const registerSong = async (data: SongResponse) => axios.post(`${baseUrl}add`, data)

export const deleteSong = async (id: string) => axios.delete(`${baseUrl}delete/${id}`)

export const updateSong = async (id: string,data:SongResponse) => axios.patch(`${baseUrl}update/${id}`, data)