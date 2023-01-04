import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addBreedTemperamentFilter,
    removeBreedTemperamentFilter,
    applyBreedWeightFilter,
    applyBreedSourceFilter,
    filterBreeds,
    changeCurrentPage
} from '../redux/actions.js';
import styles from './Filters.module.css';
import SearchResult from './SearchResult.jsx';
import CurrentFilters from './CurrentFilters.jsx';
import TemperamentFilter from './TemperamentFilter.jsx';
import WeightFilter from './WeightFilter.jsx';
import SourceFilter from './SourceFilter.jsx';

function Filters() {
    const dispatch = useDispatch();
    const breeds = useSelector(state => state.breeds.items);
    const filters = useSelector(state => state.filters);

    useEffect(() => {
        console.log('useEffect() en Filters.jsx');
    }, []);

    const addTemperamentFilter = (temperament) => {
        dispatch(addBreedTemperamentFilter(temperament));
        dispatch(filterBreeds());
        dispatch(changeCurrentPage(1));
    }

    const removeTemperamentFilter = (temperament) => {
        dispatch(removeBreedTemperamentFilter(temperament));
        dispatch(filterBreeds());
        dispatch(changeCurrentPage(1));
    }

    const removeWeight = () => {
        dispatch(applyBreedWeightFilter({ min: 0, max: 0 }))
        dispatch(filterBreeds());
        dispatch(changeCurrentPage(1));
    }

    const removeSource = () => {
        dispatch(applyBreedSourceFilter(''))
        dispatch(filterBreeds());
        dispatch(changeCurrentPage(1));
    }

    return <>
        <SearchResult totalBreeds={breeds.length} />
        <CurrentFilters
            filters={filters}
            removeTemperamentFilter={removeTemperamentFilter}
            removeWeight={removeWeight}
            removeSource={removeSource}
        />

        {breeds && breeds.length > 1 &&
            <>
                <p className={styles.filterTitle}>TEMPERAMENTS</p>
                <TemperamentFilter addTemperamentFilter={addTemperamentFilter} />

                <p className={styles.filterTitle}>WEIGHT</p>
                <WeightFilter />

                {filters.source === '' && <p className={styles.filterTitle}>SOURCE</p>}
                <SourceFilter />
            </>
        }

    </>
}

export default Filters;