import {
    ERROR_DELETE_SONG,
    ERROR_RECEIVE_SONG_LIST,
    RECEIVE_SONG_LIST,
    REQUEST_DELETE_SONG,
    REQUEST_SONG_LIST,
    RESPONSE_DELETE_SONG
} from "../constants/actionTypes";
import {deleteSongById, getSongList} from "../../../app/api/api";

const receiveSongList = (list) => ({
    payload: list,
    type: RECEIVE_SONG_LIST
});

const requestSongList = () => ({
    type: REQUEST_SONG_LIST
});

const errorReceiveSongList = (errors) => ({
    payload: errors,
    type: ERROR_RECEIVE_SONG_LIST
})

const responseDeleteSong = (boolResponse) => ({
    payload: boolResponse,
    type: RESPONSE_DELETE_SONG
});

const requestDeleteSong = () => ({
    type: REQUEST_DELETE_SONG
});

const errorDeleteSong = (err) => ({
    payload: { message: 'Error deleting song' },
    type: ERROR_DELETE_SONG
})

const fetchSongList = (params) => (dispatch) => {
    dispatch(requestSongList());
    return getSongList(params)
        .then((list) => dispatch(receiveSongList(list)))
        .catch((err) => dispatch(errorReceiveSongList(err)));
}

const fetchDeleteSong = (id) => (dispatch) => {
    dispatch(requestDeleteSong());
    return deleteSongById(id)
        .then((boolResponse) => dispatch(responseDeleteSong(boolResponse)))
        .catch((err) => {
            dispatch(errorDeleteSong(err));
            return Promise.reject(err);
        });
}

const exportFunctions = {
    fetchSongList,
    fetchDeleteSong
}

export default exportFunctions;
