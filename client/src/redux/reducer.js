import * as actionTypes from './actionTypes.js';

const initialState = {
    breeds: {
        items: [],
        status: 'idle',
        error: null
    },
    temperaments: {
        items: [],
        status: 'idle',
        error: null
    },
    breedDetail: {
        item: {},
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
        weight: { min: 0, max: 0 }
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
                filters: {
                    temperaments: [],
                    source: '',
                    weight: { min: 0, max: 0 }
                },
                breeds: {
                    ...state.breeds,
                    items: action.payload
                },
                searchResults: action.payload
            }
        case actionTypes.FETCH_BREEDS_FAILED:
            return {
                ...state,
                breeds: {
                    ...state.breeds,
                    items: [],
                    status: 'failed',
                    error: action.payload
                }
            }
        case actionTypes.FETCH_BREEDS_COMPLETED:
            return {
                ...state,
                breeds: {
                    ...state.breeds,
                    status: 'succeeded',
                }
            }
        case actionTypes.FETCH_BREED_REQUESTED:
            return {
                ...state,
                breedDetail: {
                    ...state.breedDetail,
                    status: 'loading',
                    error: null
                }
            }
        case actionTypes.FETCH_BREED_SUCCEEDED:
            return {
                ...state,
                breedDetail: {
                    ...state.breedDetail,
                    status: 'succeeded',
                    item: action.payload
                }
            }
        case actionTypes.FETCH_BREED_FAILED:
            return {
                ...state,
                breedDetail: {
                    ...state.breedDetail,
                    status: 'failed',
                    error: action.payload,
                    item: {}
                }
            }
        case actionTypes.FETCH_BREED_CLEARED:
            return {
                ...state,
                breedDetail: {}
            }
        case actionTypes.NEW_BREED_STATUS_CLEARED:
            return {
                ...state,
                newBreed: {
                    item: {},
                    status: 'idle',
                    error: null
                }
            }
        case actionTypes.NEW_BREED_REQUESTED:
            return {
                ...state,
                newBreed: {
                    ...state.newBreed,
                    status: 'creating',
                    error: null
                }
            }
        case actionTypes.NEW_BREED_SUCCEEDED:
            return {
                ...state,
                newBreed: {
                    ...state.newBreed,
                    item: action.payload.breed,
                    status: 'succeeded'
                },
                breeds: {
                    ...state.breeds,
                    items: action.payload.addToBreeds ? [...state.breeds.items, action.payload.breed] : state.breeds.items
                },
                searchResults: action.payload.addToBreeds ? [...state.searchResults, action.payload.breed] : state.searchResults
            };
        case actionTypes.NEW_BREED_FAILED:
            return {
                ...state,
                newBreed: {
                    status: 'failed',
                    error: action.payload
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
        case actionTypes.WEIGHT_FILTER_CHANGED:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    weight: action.payload,
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
        default:
            return state;
    }
}