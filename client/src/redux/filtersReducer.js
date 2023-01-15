import * as actionTypes from './actionTypes.js';

const initialState = {
    searchText: '',
    temperaments: [],
    source: '',
    weight: { min: 0, max: 0 },
    isTemperamentCollapsed: false,
    isWeightCollapsed: false,
    isSourceCollapsed: false
};

export default function filtersReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SEARCH_TEXT_CHANGED:
            return {
                ...state,
                searchText: action.payload
            }
        case actionTypes.FETCH_BREEDS_SUCCEEDED:
            if (action.payload.keepFilters) {
                return state;
            }
            return {
                ...state,
                temperaments: [],
                source: '',
                weight: { min: 0, max: 0 },
                isTemperamentCollapsed: false,
                isWeightCollapsed: false,
                isSourceCollapsed: false
            }
        case actionTypes.FETCH_BREEDS_FAILED:
            return {
                ...state,
                filters: {
                    temperaments: [],
                    source: '',
                    weight: { min: 0, max: 0 },
                    isTemperamentCollapsed: false,
                    isWeightCollapsed: false,
                    isSourceCollapsed: false
                }
            }
        case actionTypes.TEMPERAMENT_FILTER_ADDED:
            return {
                ...state,
                temperaments: [...state.temperaments, action.payload]
            }
        case actionTypes.TEMPERAMENT_FILTER_REMOVED:
            return {
                ...state,
                temperaments: action.payload
            }
        case actionTypes.COLLAPSE_TEMPERAMENT_FILTER:
            return {
                ...state,
                isTemperamentCollapsed: true
            }
        case actionTypes.EXPAND_TEMPERAMENT_FILTER:
            return {
                ...state,
                isTemperamentCollapsed: false
            }
        case actionTypes.WEIGHT_FILTER_CHANGED:
            return {
                ...state,
                weight: action.payload
            }
        case actionTypes.COLLAPSE_WEIGHT_FILTER:
            return {
                ...state,
                isWeightCollapsed: true
            }
        case actionTypes.EXPAND_WEIGHT_FILTER:
            return {
                ...state,
                isWeightCollapsed: false
            }
        case actionTypes.SOURCE_FILTER_CHANGED:
            return {
                ...state,
                source: action.payload
            }
        case actionTypes.COLLAPSE_SOURCE_FILTER:
            return {
                ...state,
                isSourceCollapsed: true
            }
        case actionTypes.EXPAND_SOURCE_FILTER:
            return {
                ...state,
                isSourceCollapsed: false
            }
        case actionTypes.ALL_FILTERS_CLEARED:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}