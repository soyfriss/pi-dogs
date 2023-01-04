import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './TemperamentFilter.module.css';
// import viewMore from '../images/view-more-512.png';

function TemperamentFilter({ addTemperamentFilter }) {
    const [showAllFilters, setShowAllFilters] = useState(false);
    const temperaments = useSelector(state => state.temperaments);
    const breeds = useSelector(state => state.breeds.items);
    const activeFilters = useSelector(state => state.filters.temperaments);

    // const [filters, setFilters] = useState(() => createFilters(breeds, temperaments));
    const [filters, setFilters] = useState([]);

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
    }

    const mapFilter = filter => (<p
        key={filter.id}
        className={styles.item}
        onClick={event => handleFilterClicked(event, filter)}
    >
        {`${filter.name} (${filter.count})`}
    </p>);

    return <>
        {console.log('render TemperamentFilter')}
        {showAllFilters ?
            filters.filter(f => !f.isActive).map(mapFilter)
            :
            filters.filter(f => !f.isActive).slice(0, 10).map(mapFilter)
        }

        {/* <p className={`${styles.temperamentItem} ${styles.filterItemShowMore}`}>Show more</p> */}
        <p
            className={`${styles.showFilters} ${showAllFilters && styles.hidden}`}
            onClick={() => setShowAllFilters(true)}
        >SHOW ALL</p>
        <p
            className={`${styles.showFilters} ${!showAllFilters && styles.hidden}`}
            onClick={() => setShowAllFilters(false)}
        >SHOW LESS</p>
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