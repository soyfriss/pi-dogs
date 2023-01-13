import * as actionTypes from './actionTypes.js';

const initialState = {
    breeds: {
        items: [],
        status: 'idle',
        error: null
    },
    checkedBreeds: [],
    isCheckedBreedsCollapsed: false,
    temperaments: {
        items: [],
        status: 'idle',
        error: null
    },
    newBreed: {
        item: {},
        status: 'idle',
        error: null
    },
    searchResults: [],
    searchText: '',
    filters: {
        temperaments: [],
        source: '',
        weight: { min: 0, max: 0 },
        isTemperamentCollapsed: false,
        isWeightCollapsed: false,
        isSourceCollapsed: false
    },
    currentPage: 1,
    currentFilterPage: 1,
    sort: 'nameAsc',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SEARCH_TEXT_CHANGED:
            return {
                ...state,
                searchText: action.payload
            }
        case actionTypes.FETCH_BREEDS_REQUESTED:
            return {
                ...state,
                breeds: {
                    ...state.breeds,
                    status: 'loading',
                    error: null
                }
            }
        case actionTypes.FETCH_BREEDS_SUCCEEDED:
            return {
                ...state,
                filters: action.payload.keepFilters ? state.filters : {
                    temperaments: [],
                    source: '',
                    weight: { min: 0, max: 0 },
                    isTemperamentCollapsed: false,
                    isWeightCollapsed: false,
                    isSourceCollapsed: false
                },
                breeds: {
                    ...state.breeds,
                    items: action.payload.breeds
                },
                searchResults: action.payload.breeds,
                checkedBreeds: [],
                isCheckedBreedsCollapsed: false
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
                },
                breeds: {
                    ...state.breeds,
                    items: [],
                    status: 'failed',
                    error: action.payload
                },
                searchResults: [],
                checkedBreeds: [],
                isCheckedBreedsCollapsed: false
            }
        case actionTypes.FETCH_BREEDS_COMPLETED:
            return {
                ...state,
                breeds: {
                    ...state.breeds,
                    status: 'succeeded',
                }
            }
        case actionTypes.TEMPERAMENT_FILTER_ADDED:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    temperaments: [...state.filters.temperaments, action.payload]
                }
            }
        case actionTypes.TEMPERAMENT_FILTER_REMOVED:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    temperaments: action.payload
                }
            }
        case actionTypes.COLLAPSE_TEMPERAMENT_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    isTemperamentCollapsed: true
                }
            }
        case actionTypes.EXPAND_TEMPERAMENT_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    isTemperamentCollapsed: false
                }
            }
        case actionTypes.WEIGHT_FILTER_CHANGED:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    weight: action.payload,
                }
            }
        case actionTypes.COLLAPSE_WEIGHT_FILTER:
            console.log('reducer COLLAPSE_WEIGHT_FILTER');
            return {
                ...state,
                filters: {
                    ...state.filters,
                    isWeightCollapsed: true
                }
            }
        case actionTypes.EXPAND_WEIGHT_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    isWeightCollapsed: false
                }
            }
        case actionTypes.SOURCE_FILTER_CHANGED:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    source: action.payload,
                }
            }
        case actionTypes.COLLAPSE_SOURCE_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    isSourceCollapsed: true
                }
            }
        case actionTypes.EXPAND_SOURCE_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    isSourceCollapsed: false
                }
            }
        case actionTypes.ALL_FILTERS_CLEARED:
            return {
                ...state,
                filters: action.payload
            }
        case actionTypes.BREEDS_FILTERED:
            return {
                ...state,
                breeds: {
                    ...state.breeds,
                    items: action.payload
                }
            }
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
        case actionTypes.SORT_CRITERIA_CHANGED:
            return {
                ...state,
                sort: action.payload
            }
        case actionTypes.BREEDS_SORTED_BY_NAME_ASC:
            return {
                ...state,
                breeds: {
                    ...state.breeds,
                    items: action.payload
                }
            };
        case actionTypes.BREEDS_SORTED_BY_NAME_DESC:
            return {
                ...state,
                breeds: {
                    ...state.breeds,
                    items: action.payload
                }
            };
        case actionTypes.BREEDS_SORTED_BY_MIN_WEIGHT:
            return {
                ...state,
                breeds: {
                    ...state.breeds,
                    items: action.payload
                }
            };
        case actionTypes.BREEDS_SORTED_BY_MAX_WEIGHT:
            return {
                ...state,
                breeds: {
                    ...state.breeds,
                    items: action.payload
                }
            };
        case actionTypes.FETCH_TEMPERAMENTS_REQUESTED:
            return {
                ...state,
                temperaments: {
                    ...state.temperaments,
                    status: 'loading',
                    error: null
                }
            }
        case actionTypes.FETCH_TEMPERAMENTS_SUCCEEDED:
            return {
                ...state,
                temperaments: {
                    ...state.temperaments,
                    status: 'succeeded',
                    items: action.payload
                }
            }
        case actionTypes.FETCH_TEMPERAMENTS_FAILED:
            return {
                ...state,
                temperaments: {
                    ...state.temperaments,
                    status: 'failed',
                    error: action.payload,
                    items: []
                }
            }
        case actionTypes.BREED_CHECKED:
            return {
                ...state,
                checkedBreeds: [...state.checkedBreeds, action.payload]
            }
        case actionTypes.BREED_UNCHECKED:
            return {
                ...state,
                checkedBreeds: state.checkedBreeds.filter(breed =>
                    !(breed.id === action.payload.id && breed.source === action.payload.source)
                )
            }
        case actionTypes.BREEDS_ALL_UNCHECKED:
            return {
                ...state,
                checkedBreeds: []
            }
        case actionTypes.COLLAPSE_CHECKED_BREEDS:
            return {
                ...state,
                isCheckedBreedsCollapsed: true
            }
        case actionTypes.EXPAND_CHECKED_BREEDS:
            return {
                ...state,
                isCheckedBreedsCollapsed: false
            }
        default:
            return state;
    }
}