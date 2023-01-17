import { sortBreeds } from '../breeds/breedsActions.js';
import * as actionTypes from '../../common/constants/actionTypes.js';

export function changeSearchText(value) {
    return function (dispatch) {
        dispatch({ type: 'breeds/searchTextChanged', payload: value });
    }
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

export function collapseTemperamentFilter() {
    return function (dispatch) {
        dispatch({ type: actionTypes.COLLAPSE_TEMPERAMENT_FILTER });
    }
}

export function expandTemperamentFilter() {
    return function (dispatch) {
        dispatch({ type: actionTypes.EXPAND_TEMPERAMENT_FILTER });
    }
}

export function changeWeightFilter(weight) {
    return function (dispatch) {
        dispatch({ type: actionTypes.WEIGHT_FILTER_CHANGED, payload: weight });
    }
}

export function collapseWeightFilter() {
    return function (dispatch) {
        dispatch({ type: actionTypes.COLLAPSE_WEIGHT_FILTER });
    }
}

export function expandWeightFilter() {
    return function (dispatch) {
        dispatch({ type: actionTypes.EXPAND_WEIGHT_FILTER });
    }
}

export function changeSourceFilter(source) {
    return function (dispatch) {
        dispatch({ type: actionTypes.SOURCE_FILTER_CHANGED, payload: source });
    }
}

export function collapseSourceFilter() {
    return function (dispatch) {
        dispatch({ type: actionTypes.COLLAPSE_SOURCE_FILTER });
    }
}

export function expandSourceFilter() {
    return function (dispatch) {
        dispatch({ type: actionTypes.EXPAND_SOURCE_FILTER });
    }
}

export function changeCurrentFilterPage(value) {
    return function (dispatch) {
        dispatch({ type: actionTypes.CURRENT_TEMPERAMENT_FILTER_PAGE_CHANGED, payload: value });
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
        const { breeds, filters } = getState();

        const breedsCopy = [...breeds.searchResults];

        // Return all breeds if filters are empty
        if (filters.temperaments.length === 0 &&
            (filters.weight.min === 0 && filters.weight.max === 0) &&
            filters.source === ''
        ) {
            dispatch({ type: actionTypes.BREEDS_FILTERED, payload: breedsCopy });
            return dispatch(sortBreeds(breeds.sort));
        }

        // Filter breeds
        const filteredBreeds = [];

        for (const breed of breedsCopy) {
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
        dispatch(sortBreeds(breeds.sort));
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
