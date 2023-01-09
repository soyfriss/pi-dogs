import { getBreeds, getTemperaments } from '../integrations/api.js';
import * as actionTypes from './actionTypes.js';
import * as errors from '../constants/errors.js';

export function changeSearchText(value) {
    return function (dispatch) {
        dispatch({ type: 'breeds/searchTextChanged', payload: value });
    }
}

export function fetchBreeds(keepFilters = false) {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: actionTypes.FETCH_BREEDS_REQUESTED });

            const { searchText } = getState();
            const response = await getBreeds(searchText);

            if (!response.ok) {
                return dispatch({
                    type: actionTypes.FETCH_BREEDS_FAILED,
                    payload: response.error
                });
            }

            dispatch({ type: actionTypes.FETCH_BREEDS_SUCCEEDED, payload: { breeds: response.data, keepFilters } });

            if (keepFilters) {
                // Filtering
                dispatch(filterBreeds());
            } else {
                // Sorting
                const { sort } = getState();
                dispatch(sortBreeds(sort));
            }


            dispatch({ type: actionTypes.FETCH_BREEDS_COMPLETED })
        } catch (error) {
            console.log('fetchBreeds error: ', error);
            dispatch({
                type: actionTypes.FETCH_BREEDS_FAILED,
                payload: {
                    message: errors.DEFAULT_ERROR_MESSAGE,
                    status: errors.DEFAULT_ERROR_STATUS
                }
            });
        }
    }
}

export function fetchTemperaments() {
    return async function (dispatch) {
        try {
            await dispatch({ type: actionTypes.FETCH_TEMPERAMENTS_REQUESTED });

            const response = await getTemperaments();

            if (!response.ok) {
                return dispatch({
                    type: actionTypes.FETCH_TEMPERAMENTS_FAILED,
                    payload: response.error
                });
            }

            const temperaments = response.data.sort(sortByNameAsc());
            dispatch({ type: actionTypes.FETCH_TEMPERAMENTS_SUCCEEDED, payload: temperaments });

        } catch (error) {
            console.log('fetchTemperaments error: ', error);
            dispatch({
                type: actionTypes.FETCH_TEMPERAMENTS_FAILED,
                payload: {
                    message: errors.DEFAULT_ERROR_MESSAGE,
                    status: errors.DEFAULT_ERROR_STATUS
                }
            });
        }
    }
}


export function sortBreeds(criteria) {
    return function (dispatch, getState) {
        dispatch({ type: actionTypes.SORT_CRITERIA_CHANGED, payload: criteria })

        const { breeds } = getState();
        const breedsSorted = [...breeds.items];

        if (criteria === 'nameAsc') {
            dispatch({
                type: actionTypes.BREEDS_SORTED_BY_NAME_ASC,
                payload: breedsSorted.sort(sortByNameAsc())
            });
        }
        if (criteria === 'nameDesc') {
            dispatch({
                type: actionTypes.BREEDS_SORTED_BY_NAME_DESC,
                payload: breedsSorted.sort(sortBreedsByNameDesc())
            });
        }
        if (criteria === 'minWeight') {
            dispatch({
                type: actionTypes.BREEDS_SORTED_BY_MIN_WEIGHT,
                payload: breedsSorted.sort(sortBreedsByMinWeight())
            });
        }
        if (criteria === 'maxWeight') {
            dispatch({
                type: actionTypes.BREEDS_SORTED_BY_MAX_WEIGHT,
                payload: breedsSorted.sort(sortBreedsByMaxWeight())
            });
        }
    }
}

function sortByNameAsc() {
    return ((a, b) => (a.localeCompare(b, undefined, {sensitivity: 'base'})));
    // return ((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
}

function sortBreedsByNameDesc() {
    return ((a, b) => (b.localeCompare(a, undefined, {sensitivity: 'base'})));
    // return ((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? 1 : a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 0));
}

function sortBreedsByMinWeight() {
    return ((a, b) => {
        let [minA, maxA] = a.weight.split(' - ');
        let [minB, maxB] = b.weight.split(' - ');

        let result = parseInt(minA) - parseInt(minB);

        if (result === 0) {
            result = parseInt(maxA) - parseInt(maxB);
        }

        return result;
    });
}

function sortBreedsByMaxWeight() {
    return ((a, b) => {
        const [minA, maxA] = a.weight.split(' - ');
        const [minB, maxB] = b.weight.split(' - ');

        let result = parseInt(minB) - parseInt(minA);

        if (result === 0) {
            result = parseInt(maxB) - parseInt(maxA);
        }

        return result;
    });
}

export function addTemperamentFilter(temperament) {
    return function (dispatch) {
        dispatch({ type: actionTypes.TEMPERAMENT_FILTER_ADDED, payload: temperament });
    }
}

export function removeTemperamentFilter(temperament) {
    return function (dispatch, getState) {
        const { filters } = getState();
        const temperaments = filters.temperaments.filter(f => f !== temperament);

        dispatch({ type: actionTypes.TEMPERAMENT_FILTER_REMOVED, payload: temperaments });
    }
}

export function changeWeightFilter(weight) {
    return function (dispatch) {
        dispatch({ type: actionTypes.WEIGHT_FILTER_CHANGED, payload: weight });
    }
}

export function changeSourceFilter(source) {
    return function (dispatch) {
        dispatch({ type: actionTypes.SOURCE_FILTER_CHANGED, payload: source });
    }
}

export function changeCurrentPage(value) {
    return function (dispatch) {
        dispatch({ type: actionTypes.CURRENT_PAGE_CHANGED, payload: value });
    }
}

export function changeCurrentFilterPage(value) {
    return function (dispatch) {
        dispatch({ type: actionTypes.CURRENT_FILTER_PAGE_CHANGED, payload: value });
    }
}

export function clearAllFilters() {
    return function (dispatch) {
        const filters = {
            temperaments: [],
            source: '',
            weight: { min: 0, max: 0 }
        }
        dispatch({ type: actionTypes.ALL_FILTERS_CLEARED, payload: filters });
    }
}

export function filterBreeds() {
    return function (dispatch, getState) {
        const { searchResults, filters, sort } = getState();

        const breeds = [...searchResults];

        // Return all breeds if filters are empty
        if (filters.temperaments.length === 0 &&
            (filters.weight.min === 0 && filters.weight.max === 0) &&
            filters.source === ''
        ) {
            dispatch({ type: actionTypes.BREEDS_FILTERED, payload: breeds });
            return dispatch(sortBreeds(sort));
        }

        // Filter breeds
        const filteredBreeds = [];

        for (const breed of breeds) {
            // Filter by temperaments
            if (!isFilterByTemperamentsOK(breed, filters.temperaments)) {
                continue;
            }

            // Filter by weight
            if (!isFilterByWeightOK(breed, filters.weight)) {
                continue;
            }

            // Filter by source
            if (!isFilterBySourceOK(breed, filters.source)) {
                continue;
            }

            filteredBreeds.push(breed)
        }

        dispatch({ type: actionTypes.BREEDS_FILTERED, payload: filteredBreeds });
        dispatch(sortBreeds(sort));
    }
}

function isFilterByTemperamentsOK(breed, filters) {
    if (filters.length === 0) {
        return true;
    }

    if (!breed.temperament) {
        return false;
    }

    let isTemperamentIncluded = true;
    for (const temperament of filters) {
        if (breed.temperament.indexOf(temperament) === -1) {
            isTemperamentIncluded = false;
            break;
        }
    }

    return isTemperamentIncluded;
}

function isFilterByWeightOK(breed, filter) {
    if (filter.min === 0 && filter.max === 0) {
        return true;
    }

    if (!breed.weight) {
        return false;
    }

    const [min, max] = breed.weight.split(' - ');

    return ((min >= filter.min) && (max <= filter.max));
}

function isFilterBySourceOK(breed, filter) {
    if (filter === '') {
        return true;
    }

    return (breed.source === filter);
}