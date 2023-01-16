import * as actionTypes from '../../common/constants/actionTypes.js';

const initialState = {
    items: [],
    searchResults: [],
    status: 'idle',
    error: null,
    sort: 'nameAsc',
    currentPage: 1
};

export default function breedsReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_BREEDS_REQUESTED:
            return {
                ...state,
                status: 'loading',
                error: null
            }
        case actionTypes.FETCH_BREEDS_SUCCEEDED:
            return {
                ...state,
                items: action.payload.breeds,
                searchResults: action.payload.breeds
            }
        case actionTypes.FETCH_BREEDS_FAILED:
            return {
                ...state,
                items: [],
                searchResults: [],
                status: 'failed',
                error: action.payload
            }
        case actionTypes.FETCH_BREEDS_COMPLETED:
            return {
                ...state,
                status: 'succeeded'
            }
        case actionTypes.BREEDS_FILTERED:
            return {
                ...state,
                items: action.payload
            }
        case actionTypes.SORT_CRITERIA_CHANGED:
            return {
                ...state,
                sort: action.payload
            }
        case actionTypes.BREEDS_SORTED_BY_NAME_ASC:
        case actionTypes.BREEDS_SORTED_BY_NAME_DESC:
        case actionTypes.BREEDS_SORTED_BY_MIN_WEIGHT:
        case actionTypes.BREEDS_SORTED_BY_MAX_WEIGHT:
            return {
                ...state,
                items: action.payload
            };
        case actionTypes.CURRENT_PAGE_CHANGED:
            return {
                ...state,
                currentPage: action.payload
            }
        default:
            return state;
    }
}