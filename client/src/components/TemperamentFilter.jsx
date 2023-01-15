import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './TemperamentFilter.module.css';
import Pagination from './Pagination.jsx';
import { changeCurrentFilterPage } from '../redux/actions.js';
import * as constants from '../constants/temperamentFilter.js';

function TemperamentFilter({ addTemperamentFilter }) {
    const dispatch = useDispatch();

    const temperaments = useSelector(state => state.temperaments.items);
    const breeds = useSelector(state => state.breeds.items);
    const activeFilters = useSelector(state => state.filters.temperaments);

    const [filters, setFilters] = useState([]);

    // Pagination variables
    const currentPage = useSelector(state => state.currentFilterPage);
    const filtersPerPage = constants.FILTERS_PER_PAGE;
    const totalFilters = filters.length;

    const indexOfLastFilter = currentPage * filtersPerPage;
    const indexOfFirstFilter = indexOfLastFilter - filtersPerPage;
    const filterSlice = filters.slice(indexOfFirstFilter, indexOfLastFilter);

    const setCurrentPage = (value) => {
        dispatch(changeCurrentFilterPage(value));
    }

    useEffect(() => {
        // console.log('useEffect in TemperamentFilter, breeds: ', breeds);
        setFilters(createFilters(breeds, temperaments, activeFilters));
    }, [breeds, temperaments, activeFilters]);

    const handleFilterClicked = (_, filter) => {
        console.log('filter clicked: ', filter);
        // Set filter as active
        addTemperamentFilter(filter.name);

        setFilters(oldFilters => {
            const newFilters = [...oldFilters];
            const index = newFilters.findIndex(f => f.id === filter.id);
            newFilters[index] = { ...filter, isActive: true };
            return newFilters;
        })

        dispatch(changeCurrentFilterPage(1));
    }

    return <>
        {console.log('render TemperamentFilter')}
        {filterSlice.map(filter =>
            <button
                type='button'
                key={filter.id}
                className={styles.item}
                onClick={event => handleFilterClicked(event, filter)}
            >
                {`${filter.name} (${filter.count})`}
            </button>
        )}

        {totalFilters > filtersPerPage && (
            <div className={styles.paginationContainer}>
                <Pagination
                    totalItems={totalFilters}
                    itemsPerPage={filtersPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    enableScrollToTop={false}
                />
            </div>
        )}
    </>
}

function createFilters(breeds, temperaments, activeFilters) {
    // console.log('breeds in createFilters: ', breeds);

    let filters = [...temperaments];

    // Remove active filters
    if (activeFilters && activeFilters.length > 0) {
        filters = filters.filter(f => activeFilters.indexOf(f.name) === -1);
    }

    // Count breeds per temperament
    filters.forEach(f => {
        f.count = 0;
        f.isActive = false;

        if (breeds && breeds.length > 0) {
            f.count = breeds.reduce((total, breed) => {

                if (!breed.temperament || breed.temperament.indexOf(f.name) === -1) {
                    return total;
                }

                return total + 1;
            }, 0);
        }
    });
    // console.log('temperaments with breed count: ', filters);

    // Sort by count desc
    filters.sort((a, b) => {
        let result = b.count - a.count;
        if (result === 0) {
            result = a.name < b.name ? -1 : a.name > b.name ? 1 : 0
        }

        return result;
    });

    // console.log('filters returned by createFilters: ', filters);
    return filters.filter(f => f.count > 0);
}

export default TemperamentFilter;