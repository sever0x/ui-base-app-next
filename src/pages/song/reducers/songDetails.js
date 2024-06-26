import {
    ERROR_RECEIVE_SONG_BY_ID, ERROR_RECEIVE_UPDATE_SONG,
    RECEIVE_SONG_BY_ID, RECEIVE_UPDATE_SONG,
    REQUEST_SONG_BY_ID,
    REQUEST_UPDATE_SONG
} from "../constants/actionTypes";

const initialState = {
    currentSong: {
        id: null,
        title: '',
        artist: {
            id: 0,
            name: '',
            country: ''
        },
        album: '',
        genres: '',
        duration: 0,
        releaseYear: null
    },
    errors: [],
    isFetchingSongById: false,
    isFailedReceiveSongById: false,
    isFetchingUpdateSong: false,
    isFailedUpdatingSong: false,
};

const convertErrors = (errors) => errors.map(error => ({
    code: error.code,
    description: error.description,
}));

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case ERROR_RECEIVE_SONG_BY_ID: {
            return {
                ...state,
                errors: [action.payload],
                isFailedReceiveSongById: true,
                isFetchingSongById: false,
            }
        }

        case REQUEST_SONG_BY_ID: {
            return {
                ...state,
                isFetchingSongById: true,
            }
        }

        case RECEIVE_SONG_BY_ID: {
            const response = action.payload;
            const { id, title, artist, album, genres, duration, releaseYear } = response;
            return {
                ...state,
                currentSong: {
                    id,
                    title,
                    artist: {
                        id: artist.id,
                        name: artist.name,
                        country: artist.country
                    },
                    album,
                    genres,
                    duration,
                    releaseYear
                },
                isFetchingSongById: false,
            }
        }

        case REQUEST_UPDATE_SONG: {
            return {
                ...state,
                isFetchingUpdateSong: true
            }
        }

        case RECEIVE_UPDATE_SONG: {
            const response = action.payload;
            const { id, title, artist, album, genres, duration, releaseYear } = response;
            return {
                ...state,
                currentSong: {
                    id,
                    title,
                    artist: {
                        id: artist.id,
                        name: artist.name,
                        country: artist.country
                    },
                    album,
                    genres,
                    duration,
                    releaseYear
                },
                isFetchingUpdateSong: false,
            }
        }

        case ERROR_RECEIVE_UPDATE_SONG: {
            return {
                ...state,
                errors: [action.payload],
                isFailedUpdatingSong: true,
                isFetchingUpdateSong: false,
            }
        }

        default: {
            return state
        }
    }
}