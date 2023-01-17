import * as actionTypes from '../../common/constants/actionTypes.js';

const initialState = {
    items: [],
    status: 'idle',
    error: null
};

export default function temperamentsReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_TEMPERAMENTS_REQUESTED:
            return {
                ...state,
                status: 'loading',
                error: null
            }
        case actionTypes.FETCH_TEMPERAMENTS_SUCCEEDED:
            return {
                ...state,
                status: 'succeeded',
                items: action.payload
            }
        case actionTypes.FETCH_TEMPERAMENTS_FAILED:
            return {
                ...state,
                status: 'failed',
                error: action.payload,
                items: []
            }
        default:
            return state;
    }
}