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
                    items: action.payload
                },
                searchResults: action.payload
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
                breedDetail: {
                    ...state.breedDetail,
                    status: 'loading',
                    error: null
                }
            }
        case 'breeds/fetchBreedSucceeded':
            return {
                ...state,
                breedDetail: {
                    ...state.breedDetail,
                    status: 'succeeded',
                    item: action.payload
                }
            }
        case 'breeds/fetchBreedFailed':
            return {
                ...state,
                breedDetail: {
                    ...state.breedDetail,
                    status: 'failed',
                    error: action.payload,
                    item: {}
                }
            }
        case 'breeds/breedCleared':
            return {
                ...state,
                breedDetail: {}
            }
        case 'breeds/createBreedStatusCleared':
            return {
                ...state,
                newBreed: {
                    item: {},
                    status: 'idle',
                    error: null
                }
            }
        case 'breeds/createBreedRequested':
            return {
                ...state,
                newBreed: {
                    ...state.newBreed,
                    status: 'creating',
                    error: null
                }
            }
        case 'breeds/createBreedSucceeded':
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
        case 'breeds/createBreedFailed':
            return {
                ...state,
                newBreed: {
                    status: 'failed',
                    error: action.payload
                }
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
        case 'breeds/currentFilterPageChanged':
            return {
                ...state,
                currentFilterPage: action.payload
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
                temperaments: {
                    ...state.temperaments,
                    status: 'loading',
                    error: null
                }
            }
        case 'temperaments/fetchTemperamentsSucceeded':
            return {
                ...state,
                temperaments: {
                    ...state.temperaments,
                    status: 'succeeded',
                    items: action.payload
                }
            }
        case 'temperaments/fetchTemperamentsFailed':
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