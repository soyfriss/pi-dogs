import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Filters.module.css';
import {
    addTemperamentFilter as addBreedTemperamentFilter,
    removeTemperamentFilter as removeBreedTemperamentFilter,
    changeWeightFilter,
    changeSourceFilter,
    filterBreeds,
    changeCurrentPage,
    collapseTemperamentFilter,
    expandTemperamentFilter,
    collapseWeightFilter,
    expandWeightFilter,
    collapseSourceFilter,
    expandSourceFilter
} from '../../common/redux/actions.js';
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
        // console.log('useEffect() en Filters.jsx');
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
        dispatch(changeWeightFilter({ min: 0, max: 0 }))
        dispatch(filterBreeds());
        dispatch(changeCurrentPage(1));
    }

    const removeSource = () => {
        dispatch(changeSourceFilter(''))
        dispatch(filterBreeds());
        dispatch(changeCurrentPage(1));
    }

    const handleCollapseTemperamentFilter = () => {
        if (filters.isTemperamentCollapsed) {
            dispatch(expandTemperamentFilter());
        } else {
            dispatch(collapseTemperamentFilter());
        }
    }

    const handleCollapseWeightFilter = () => {
        if (filters.isWeightCollapsed) {
            dispatch(expandWeightFilter());
        } else {
            dispatch(collapseWeightFilter());
        }
    }

    const handleCollapseSourceFilter = () => {
        if (filters.isSourceCollapsed) {
            dispatch(expandSourceFilter());
        } else {
            dispatch(collapseSourceFilter());
        }
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
                <p className={styles.filterTitle} onClick={handleCollapseTemperamentFilter}>TEMPERAMENTS <span className={styles.collapse}>{filters.isTemperamentCollapsed ? '[+]' : '[-]'}</span></p>
                {!filters.isTemperamentCollapsed && <TemperamentFilter addTemperamentFilter={addTemperamentFilter} />}

                <p className={styles.filterTitle} onClick={handleCollapseWeightFilter}>WEIGHT <span className={styles.collapse}>{filters.isWeightCollapsed ? '[+]' : '[-]'}</span></p>
                {!filters.isWeightCollapsed && <WeightFilter />}

                {filters.source === '' && <p className={styles.filterTitle} onClick={handleCollapseSourceFilter}>SOURCE <span className={styles.collapse}>{filters.isSourceCollapsed ? '[+]' : '[-]'}</span></p>}
                {!filters.isSourceCollapsed && <SourceFilter />}
            </>
        }

    </>
}

export default Filters;