import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeWeightFilter, filterBreeds, changeCurrentPage } from '../redux/actions.js';
import styles from './WeightFilter.module.css';
import InputRange from './InputRange.jsx';

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
                canShowError={true}
                showButton={true}
                handleButtonClick={changeWeight} />
        </div>
    </>
}

export default WeightFilter;