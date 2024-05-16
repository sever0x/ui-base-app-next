import * as actionTypes from '../constants/actionTypes';

const initialState = {
    list: [],
    loading: false,
    errors: [],
    totalPages: 0,
};

const songReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ERROR_RECEIVE_SONG_LIST:
            return {
                ...state,
                errors: action.payload,
                loading: false,
            };

        case actionTypes.REQUEST_SONG_LIST:
            return {
                ...state,
                loading: true,
                errors: [],
            };

        case actionTypes.RECEIVE_SONG_LIST:
            return {
                ...state,
                list: action.payload.list,
                totalPages: action.payload.totalPages,
                loading: false,
                errors: [],
            };

        case actionTypes.REQUEST_DELETE_SONG:
            return {
                ...state,
                loading: true,
                errors: [],
            };

        case actionTypes.RESPONSE_DELETE_SONG:
            return {
                ...state,
                list: state.list.filter((song) => song.id !== action.payload.id),
                loading: false,
                errors: [],
            };

        case actionTypes.ERROR_DELETE_SONG:
            return {
                ...state,
                errors: [action.payload.message],
                loading: false,
            };

        default:
            return state;
    }
};

export default songReducer;