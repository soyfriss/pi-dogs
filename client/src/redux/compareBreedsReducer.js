import * as actionTypes from './actionTypes.js';

const initialState = {
    items: [],
    isCollapsed: false,
};

export default function compareBreedsReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_BREEDS_SUCCEEDED:
            return {
                ...state,
                items: [],
                isCollapsed: false
            }
        case actionTypes.FETCH_BREEDS_FAILED:
            return {
                ...state,
                items: [],
                isCollapsed: false
            }
        case actionTypes.BREED_CHECKED:
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case actionTypes.BREED_UNCHECKED:
            return {
                ...state,
                items: state.items.filter(breed =>
                    !(breed.id === action.payload.id && breed.source === action.payload.source)
                )
            }
        case actionTypes.BREEDS_ALL_UNCHECKED:
            return {
                ...state,
                items: []
            }
        case actionTypes.COLLAPSE_CHECKED_BREEDS:
            return {
                ...state,
                isCollapsed: true
            }
        case actionTypes.EXPAND_CHECKED_BREEDS:
            return {
                ...state,
                isCollapsed: false
            }
        default:
            return state;
    }
}