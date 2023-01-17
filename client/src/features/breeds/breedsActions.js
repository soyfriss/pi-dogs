import { getBreeds } from "../../common/integrations/api.js";
import { filterBreeds } from "../filters/filtersActions.js";
import { sortByNameAsc } from "../../common/utils/sortByName.js";
import * as actionTypes from '../../common/constants/actionTypes.js';
import * as errors from '../../common/constants/errors.js';

export function fetchBreeds(keepFilters = false) {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: actionTypes.FETCH_BREEDS_REQUESTED });

            const { filters } = getState();
            const response = await getBreeds(filters.searchText);

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
                const { breeds } = getState();
                dispatch(sortBreeds(breeds.sort));
            }


            dispatch({ type: actionTypes.FETCH_BREEDS_COMPLETED })
        } catch (error) {
            // console.log('fetchBreeds error: ', error);
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

function sortBreedsByNameDesc() {
    const collator = new Intl.Collator("en", {
        numeric: true,
        sensitivity: "base",
    });

    return (a, b) => collator.compare(b.name, a.name);
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

export function changeCurrentPage(value) {
    return function (dispatch) {
        dispatch({ type: actionTypes.CURRENT_PAGE_CHANGED, payload: value });
    }
}


