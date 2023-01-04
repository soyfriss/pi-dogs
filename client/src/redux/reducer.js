const initialState = {
    breeds: {
        items: [],
        status: 'idle',
        error: null
    },
    breedDetail: {},
    searchResults: [],
    searchText: '',
    temperaments: [],
    filters: {
        temperaments: [],
        source: '',
        weight: { min: 0, max: 0 }
    },
    currentPage: 1,
    sort: 'nameAsc'
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'breeds/searchTextChanged':
            return {
                ...state,
                searchText: action.payload
            }
        case 'breeds/fetchBreedsRequested':
            return {
                ...state,
                breeds: {
                    ...state.breeds,
                    status: 'loading',
                    error: null
                }
            }
        case 'breeds/fetchBreedsSucceeded':
            return {
                ...state,
                filters: {
                    temperaments: [],
                    source: '',
                    weight: { min: 0, max: 0 }
                },
                breeds: {
                    ...state.breeds,
                    items: action.payload.breeds
                },
                searchResults: action.payload.breeds,
                temperaments: action.payload.temperaments
            }
        case 'breeds/fetchBreedsFailed':
            return {
                ...state,
                breeds: {
                    ...state.breeds,
                    items: [],
                    status: 'failed',
                    error: action.payload
                }
            }
        case 'breeds/fetchBreedsCompleted':
            return {
                ...state,
                breeds: {
                    ...state.breeds,
                    status: 'succeeded',
                }
            }
        case 'breeds/fetchBreedRequested':
            return {
                ...state,
                loadingBreedDetail: true,
                error: undefined
            }
        case 'breeds/fetchBreedSucceeded':
            return {
                ...state,
                loadingBreedDetail: false,
                breedDetail: action.payload,
            }
        case 'breeds/fetchBreedFailed':
            return {
                ...state,
                loadingBreedDetail: false,
                error: action.payload
            }
        case 'breeds/breedCleared':
            return {
                ...state,
                breedDetail: {}
            }
        case 'breeds/breedTemperamentFilterAdded':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    temperaments: [...state.filters.temperaments, action.payload]
                }
            }
        case 'breeds/breedTemperamentFilterRemoved':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    temperaments: action.payload
                }
            }
        case 'breeds/breedWeightFilterApplied':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    weight: action.payload,
                }
            }
        case 'breeds/breedSourceFilterApplied':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    source: action.payload,
                }
            }
        case 'breeds/allFiltersCleared':
            return {
                ...state,
                filters: action.payload
            }
        case 'breeds/breedsFiltered':
            return {
                ...state,
                breeds: {
                    ...state.breeds,
                    items: action.payload
                }
            }
        case 'breeds/currentPageChanged':
            return {
                ...state,
                currentPage: action.payload
            }
        case 'breeds/sortCriteriaChanged':
            return {
                ...state,
                sort: action.payload
            }
        case 'breeds/breedsByNameAscSorted':
            return {
                ...state,
                breeds: {
                    ...state.breeds,
                    items: action.payload
                }
            };
        case 'breeds/breedsByNameDescSorted':
            return {
                ...state,
                breeds: {
                    ...state.breeds,
                    items: action.payload
                }
            };
        case 'breeds/breedsByMinWeightSorted':
            return {
                ...state,
                breeds: {
                    ...state.breeds,
                    items: action.payload
                }
            };
        case 'breeds/breedsByMaxWeightSorted':
            return {
                ...state,
                breeds: {
                    ...state.breeds,
                    items: action.payload
                }
            };
        case 'temperaments/fetchTemperamentsRequested':
            return {
                ...state,
                loadingTemperaments: true,
                error: ''
            }
        case 'temperaments/fetchTemperamentsSucceeded':
            return {
                ...state,
                loadingTemperaments: false,
                temperaments: action.payload
            }
        case 'temperaments/fetchTemperamentsFailed':
            return {
                ...state,
                loadingTemperaments: false,
                error: action.payload
            }
        default:
            return state;
    }
}