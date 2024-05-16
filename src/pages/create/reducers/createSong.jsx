import {ERROR_CREATE_SONG, RECEIVE_CREATE_SONG, REQUEST_CREATE_SONG, RESET_CREATE_SONG} from "../constants/actionTypes";

const initialState = {
    createdSongId: null,
    errors: [],
    isFetchingCreateSong: false,
    isFailedCreateSong: false
};

const convertErrors = (errors) => errors.map(error => ({
    code: error.code,
    description: error.description,
}));

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case ERROR_CREATE_SONG: {
            return {
                ...state,
                errors: convertErrors(action.payload),
                isFailedCreateSong: true,
                isFetchingCreateSong: false,
            }
        }

        case REQUEST_CREATE_SONG: {
            return {
                ...state,
                isFetchingCreateSong: true,
            }
        }

        case RECEIVE_CREATE_SONG: {
            console.log(`im here ${JSON.stringify(action.payload)}`);
            const { id } = action.payload;
            return {
                ...state,
                createdSongId: id,
                isFetchingSongById: false,
            }
        }

        case RESET_CREATE_SONG: {
            return {
                ...state,
                createdSongId: null
            }
        }

        default: {
            return state
        }
    }
}