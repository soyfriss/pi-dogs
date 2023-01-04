import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { applyBreedSourceFilter, filterBreeds, changeCurrentPage } from '../redux/actions';
import styles from './SourceFilter.module.css';

function SourceFilter() {
    const dispatch = useDispatch();
    const breeds = useSelector(state => state.breeds.items);
    const activeFilter = useSelector(state => state.filters.source);

    const countBreeds = (source) => {
        return breeds.reduce((total, breed) => breed.source === source ? total + 1 : total, 0);
    }

    const applyFilter = (source) => {
        dispatch(applyBreedSourceFilter(source));
        dispatch(filterBreeds());
        dispatch(changeCurrentPage(1));
    }

    if (activeFilter === '') {
        // console.log('Counting breeds in SourceFilter');
        const countLocal = countBreeds('local');
        const countExternal = countBreeds('external');

        // Only local source
        if (countExternal === 0) {
            return <p>All breeds are from local source</p>;
        }

        // Only external source
        if (countLocal === 0) {
            return <p>All breeds are from external source</p>;
        }

        // Local & External sources
        return <>
            <p className={styles.item} onClick={() => applyFilter('external')}>
                External ({countExternal})
            </p>
            <p className={styles.item} onClick={() => applyFilter('local')}>
                Local ({countLocal})
            </p>
        </>;
    }
    return <></>;
}

export default SourceFilter;