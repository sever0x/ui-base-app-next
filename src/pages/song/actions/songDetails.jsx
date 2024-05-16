import {
    ERROR_RECEIVE_SONG_BY_ID,
    ERROR_RECEIVE_UPDATE_SONG,
    RECEIVE_SONG_BY_ID,
    RECEIVE_UPDATE_SONG,
    REQUEST_SONG_BY_ID,
    REQUEST_UPDATE_SONG
} from "../constants/actionTypes";
import {getSongById, updateSongById} from "../../../app/api/api";

const requestSongById = () => ({
   type: REQUEST_SONG_BY_ID
});

const receiveSongById = (song) => ({
    payload: song,
    type: RECEIVE_SONG_BY_ID
});

const errorReceiveSongById = (err) => ({
    payload: err,
    type: ERROR_RECEIVE_SONG_BY_ID
});

const requestUpdateSong = () => ({
   type: REQUEST_UPDATE_SONG
});

const receiveResponseUpdateSong = (song) => ({
    payload: song,
    type: RECEIVE_UPDATE_SONG
});

const errorReceiveUpdateSong = (err) => ({
   payload: err,
   type: ERROR_RECEIVE_UPDATE_SONG
});

const fetchUpdateSongById = ({updatedSongId, updatedSong}) => (dispatch) => {
    dispatch(requestUpdateSong());
    return updateSongById({updatedSongId, updatedSong})
        .then((song) => {
            dispatch(receiveResponseUpdateSong(song));
        })
        .catch((err) => {
            dispatch(errorReceiveUpdateSong(err));
            return Promise.reject(err);
        })
}

const fetchGetSongById = (id) => (dispatch) => {
    dispatch(requestSongById());
    return getSongById(id)
        .then((song) => dispatch(receiveSongById(song)))
        .catch((err)=> {
            dispatch(errorReceiveSongById(err));
            return Promise.reject(err);
        });
}

const exportFunctions = {
    fetchGetSongById,
    fetchUpdateSongById
}

export default exportFunctions;