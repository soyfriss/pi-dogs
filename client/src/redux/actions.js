import axios from 'axios';
import { getBreeds, getBreed, postBreed, getTemperaments } from './api.js';

export function changeSearchText(value) {
    return function (dispatch) {
        dispatch({ type: 'breeds/searchTextChanged', payload: value });
    }
}

export function fetchBreeds() {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: 'breeds/fetchBreedsRequested' });

            // const baseEndpoint = 'http://localhost:3001/dogs';
            const { searchText } = getState();
            // const endPoint = searchText ? `${baseEndpoint}?name=${searchText}` : baseEndpoint;
            // console.log('endPoint: ', endPoint);
            const responseBreeds = await getBreeds(searchText);
            const responseTemperaments = await getTemperaments();
            const temperaments = responseTemperaments.data.sort(sortBreedsByNameAsc());

            // dispatch({ type: 'breeds/fetchBreedsSucceeded', payload: { breeds: response.data, filters: emptyFilters } });
            dispatch({ type: 'breeds/fetchBreedsSucceeded', payload: { breeds: responseBreeds.data, temperaments } });

            // Sorting
            const { sort } = getState();
            dispatch(sortBreeds(sort));

            dispatch({ type: 'breeds/fetchBreedsCompleted' })
        } catch (error) {
            console.log('fetchBreeds error: ', error);
            dispatch({
                type: 'breeds/fetchBreedsFailed',
                payload: {
                    message: error.response.data,
                    status: error.response.status
                }
            });
            // console.log(error);
        }
    }
}

export function fetchBreed(id, source) {
    return async function (dispatch) {
        try {
            dispatch({ type: 'breeds/fetchBreedRequested' });

            const response = await getBreed(id, source);

            dispatch({ type: 'breeds/fetchBreedSucceeded', payload: response.data });
        } catch (error) {
            dispatch({
                type: 'breeds/fetchBreedFailed',
                payload: {
                    message: error.response.data,
                    status: error.response.status
                }
            });
            // console.log(error);
        }
    }
}

export function clearCreateBreedStatus() {
    return function (dispatch) {
        dispatch({ type: 'breeds/createBreedStatusCleared' });
    }
}

export function createBreed(breed) {
    return async function (dispatch, getState) {

        try {
            dispatch({ type: 'breeds/createBreedRequested' });

            const response = await postBreed(breed);

            const { searchText, searchResults, sort } = getState();

            if (!searchText || (searchText && breed.name.toLowerCase().includes(searchText.toLowerCase()))) {
                const breeds = [...searchResults];
                breeds.push(response.data);

                dispatch({ type: 'breeds/createBreedSucceeded', payload: { breed: response.data, addToBreeds: true } });

                dispatch(filterBreeds());
            } else {
                dispatch({ type: 'breeds/createBreedSucceeded', payload: { breed: response.data, addToBreeds: false } });
            }
        } catch (error) {
            dispatch({ type: 'breeds/createBreedFailed', payload: error });
            console.log('createBreed error: ', error);
        }
    }
}

export function clearBreed() {
    return function (dispatch) {
        dispatch({ type: 'breeds/breedCleared' });
    }
}

export function sortBreeds(criteria) {
    return function (dispatch, getState) {
        dispatch({ type: 'breeds/sortCriteriaChanged', payload: criteria })

        const { breeds } = getState();
        const breedsSorted = [...breeds.items];

        if (criteria === 'nameAsc') {
            dispatch({
                type: 'breeds/breedsByNameAscSorted',
                payload: breedsSorted.sort(sortBreedsByNameAsc())
            });
        }
        if (criteria === 'nameDesc') {
            dispatch({
                type: 'breeds/breedsByNameDescSorted',
                payload: breedsSorted.sort(sortBreedsByNameDesc())
            });
        }
        if (criteria === 'minWeight') {
            dispatch({
                type: 'breeds/breedsByMinWeightSorted',
                payload: breedsSorted.sort(sortBreedsByMinWeight())
            });
        }
        if (criteria === 'maxWeight') {
            dispatch({
                type: 'breeds/breedsByMaxWeightSorted',
                payload: breedsSorted.sort(sortBreedsByMaxWeight())
            });
        }
    }
}

function sortBreedsByNameAsc() {
    return ((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
}

function sortBreedsByNameDesc() {
    return ((a, b) => (a.name < b.name ? 1 : a.name > b.name ? -1 : 0));
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

export function addBreedTemperamentFilter(temperament) {
    return function (dispatch) {
        dispatch({ type: 'breeds/breedTemperamentFilterAdded', payload: temperament });
    }
}

export function removeBreedTemperamentFilter(temperament) {
    return function (dispatch, getState) {
        const { filters } = getState();
        const temperaments = filters.temperaments.filter(f => f !== temperament);

        dispatch({ type: 'breeds/breedTemperamentFilterRemoved', payload: temperaments });
    }
}

export function applyBreedWeightFilter(weight) {
    return function (dispatch) {
        dispatch({ type: 'breeds/breedWeightFilterApplied', payload: weight });
    }
}

export function applyBreedSourceFilter(source) {
    return function (dispatch) {
        dispatch({ type: 'breeds/breedSourceFilterApplied', payload: source });
    }
}

export function changeCurrentPage(value) {
    return function (dispatch) {
        dispatch({ type: 'breeds/currentPageChanged', payload: value });
    }
}

export function clearAllFilters() {
    return function (dispatch) {
        const filters = {
            temperaments: [],
            source: '',
            weight: { min: 0, max: 0 }
        }
        dispatch({ type: 'breeds/allFiltersCleared', payload: filters });
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
            dispatch({ type: 'breeds/breedsFiltered', payload: breeds });
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

        dispatch({ type: 'breeds/breedsFiltered', payload: filteredBreeds });
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

export function fetchTemperaments() {
    return async function (dispatch) {
        try {
            await dispatch({ type: 'temperaments/fetchTemperamentsRequested' });

            const baseEndpoint = 'http://localhost:3001/temperaments';
            const response = await axios.get(baseEndpoint);
            dispatch({ type: 'temperaments/fetchTemperamentsSucceeded', payload: response.data });

        } catch (error) {
            dispatch({
                type: 'temperaments/fetchTemperamentsFailed',
                payload: {
                    message: error.response.data,
                    status: error.response.status
                }
            });
        }
    }
}

