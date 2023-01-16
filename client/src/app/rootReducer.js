import { combineReducers } from 'redux';

import breedsReducer from './redux/breedsReducer.js';
import temperamentsReducer from './redux/temperamentsReducer.js';
import filtersReducer from './redux/filtersReducer.js';
import compareBreedsReducer from './redux/compareBreedsReducer';

const rootReducer = combineReducers({
    breeds: breedsReducer,
    temperaments: temperamentsReducer,
    filters: filtersReducer,
    compareBreeds: compareBreedsReducer
});

export default rootReducer;
