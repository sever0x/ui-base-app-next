import {ERROR_CREATE_SONG, RECEIVE_CREATE_SONG, REQUEST_CREATE_SONG, RESET_CREATE_SONG} from "../constants/actionTypes";
import {createSong} from "../../../app/api/api";

const requestCreateSong = () => ({
    type: REQUEST_CREATE_SONG
});

const receiveCreateSong = (createdSong) => ({
    payload: createdSong,
    type: RECEIVE_CREATE_SONG
});

const errorCreateSong = (err) => ({
    payload: err,
    type: ERROR_CREATE_SONG
});

const resetCreateSong = () => ({
    type: RESET_CREATE_SONG
});

const fetchCreateSong = (song) => (dispatch) => {
    dispatch(requestCreateSong());
    return createSong(song)
        .then((createdSong) => dispatch(receiveCreateSong(createdSong)))
        .catch((err)=> {
            dispatch(errorCreateSong(err));
            return Promise.reject(err);
        });
}

const exportFunctions = {
    fetchCreateSong,
    resetCreateSong
}

export default exportFunctions;