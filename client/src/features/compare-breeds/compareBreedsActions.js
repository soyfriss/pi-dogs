import * as actionTypes from '../../common/constants/actionTypes.js';

export function checkBreed(breed) {
    return function (dispatch) {
        dispatch({ type: actionTypes.BREED_CHECKED, payload: breed });
    }
}

export function uncheckBreed(breedId, source) {
    return function (dispatch) {
        dispatch({ type: actionTypes.BREED_UNCHECKED, payload: {id: breedId, source} });
    }
}

export function uncheckAllBreeds() {
    return function (dispatch) {
        dispatch({ type: actionTypes.BREEDS_ALL_UNCHECKED });
    }
}

export function collapseCheckedBreeds() {
    return function (dispatch) {
        dispatch({ type: actionTypes.COLLAPSE_CHECKED_BREEDS });
    }
}

export function expandCheckedBreeds() {
    return function (dispatch) {
        dispatch({ type: actionTypes.EXPAND_CHECKED_BREEDS });
    }
}
