import * as actionTypes from './actionTypes.js';

const initialState = {
    currentPage: 1,
    currentFilterPage: 1,
};

export default function paginationReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CURRENT_PAGE_CHANGED:
            return {
                ...state,
                currentPage: action.payload
            }
        case actionTypes.CURRENT_FILTER_PAGE_CHANGED:
            return {
                ...state,
                currentFilterPage: action.payload
            }
        default:
            return state;
    }
}