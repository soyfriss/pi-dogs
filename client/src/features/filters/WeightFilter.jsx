import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './WeightFilter.module.css';
import {
    changeWeightFilter,
    filterBreeds,
    changeCurrentFilterPage
} from './filtersActions.js';
import { changeCurrentPage } from '../breeds/breedsActions.js';
import InputRange from '../ui/InputRange.jsx';

function WeightFilter() {
    const dispatch = useDispatch();
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');


    const handleRangeChange = (name, min, max, error) => {
        setMin(min);
        setMax(max);
    }

    const changeWeight = () => {
        dispatch(changeWeightFilter({ min: Number(min), max: Number(max) }))
        dispatch(filterBreeds());
        dispatch(changeCurrentPage(1));
        dispatch(changeCurrentFilterPage(1));
    }

    return <>
        <div className={styles.container}>
            <InputRange
                name="weight"
                label="(Kg)"
                isRequired={false}
                min={min}
                max={max}
                validRange={[0, 150]}
                onChange={handleRangeChange}
                showButton={true}
                handleButtonClick={changeWeight}
                style={{ maxWidth: "5rem" }} />
        </div>
    </>
}

export default WeightFilter;