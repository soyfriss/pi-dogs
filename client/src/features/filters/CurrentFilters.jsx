import React from 'react';
import styles from './CurrentFilters.module.css';
import CurrentFilter from './CurrentFilter.jsx';

function CurrentFilters({ filters, removeTemperamentFilter, removeWeight, removeSource, handleClearAll }) {
    // if (filters.temperaments.length === 0 &&
    //     filters.source === '' &&
    //     filters.weight.min === 0 &&
    //     filters.weight.max === 0
    // ) {
    //     return <></>;
    // }

    const isFiltersExist = () => {
        return (filters.temperaments.length !== 0 ||
            filters.source !== '' ||
            filters.weight.min !== 0 ||
            filters.weight.max !== 0
        );
    }

    if (!isFiltersExist()) {
        return <></>;
    }

    return <>
        <div className={styles.container}>
            {/* Temperaments filters */}
            {filters.temperaments.map(f =>
                <CurrentFilter
                    key={f}
                    filter={f}
                    removeFilter={removeTemperamentFilter}
                />)}

            {/* Weight filter */}
            {(filters.weight.min !== 0 || filters.weight.max !== 0) &&
                <CurrentFilter
                    filter={`WEIGHT: ${filters.weight.min} - ${filters.weight.max}`}
                    removeFilter={removeWeight}
                />}

            {/* Source filter */}
            {filters.source !== '' &&
                <CurrentFilter
                    filter={`SOURCE: ${filters.source}`}
                    removeFilter={removeSource}
                />}
        </div>
        {isFiltersExist() &&
            <div>
                <button type='button' className='btn-small' onClick={handleClearAll}>
                    CLEAR ALL
                </button>
            </div>
        }
    </>
}

export default CurrentFilters;