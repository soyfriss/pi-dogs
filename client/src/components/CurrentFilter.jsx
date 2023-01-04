import React from 'react';
import styles from './CurrentFilter.module.css';

function CurrentFilter({ filter, removeFilter }) {
    return <>
        <div className={styles.container}>
            <p className={styles.filter}>{filter}</p>
            <button className={styles.remove} onClick={() => removeFilter(filter)}>X</button>
        </div>
    </>
}

export default CurrentFilter;

