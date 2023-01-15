import { combineReducers } from 'redux';

import breedsReducer from './breedsReducer.js';
import temperamentsReducer from './temperamentsReducer.js';
import filtersReducer from './filtersReducer.js';
import paginationReducer from './paginationReducer.js';
import compareBreedsReducer from './compareBreedsReducer';

const rootReducer = combineReducers({
    breeds: breedsReducer,
    temperaments: temperamentsReducer,
    filters: filtersReducer,
    pagination: paginationReducer,
    compareBreeds: compareBreedsReducer
});

export default rootReducer;
