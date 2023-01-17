import { combineReducers } from 'redux';

import breedsReducer from '../features/breeds/breedsReducer.js';
import temperamentsReducer from '../features/filters/temperamentsReducer.js';
import filtersReducer from '../features/filters/filtersReducer.js';
import compareBreedsReducer from '../features/compare-breeds/compareBreedsReducer.js';

const rootReducer = combineReducers({
    breeds: breedsReducer,
    temperaments: temperamentsReducer,
    filters: filtersReducer,
    compareBreeds: compareBreedsReducer
});

export default rootReducer;
