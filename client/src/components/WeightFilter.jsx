import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { applyBreedWeightFilter, filterBreeds, changeCurrentPage } from '../redux/actions.js';
import styles from './WeightFilter.module.css';

function WeightFilter() {
    const dispatch = useDispatch();
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    // const weight = useSelector(state => state.filters.weight);

    useEffect(() => {
        if (min === 0 && max === 0) {
            console.log('WeightFilter 0');
            return setIsSubmitDisabled(true);
        }
        if (min > max) {
            console.log('WeightFilter min > max: ', min, max);
            return setIsSubmitDisabled(true);
        }
        setIsSubmitDisabled(false);
    }, [min, max])

    const changeWeight = (_) => {
        dispatch(applyBreedWeightFilter({ min: Number(min), max: Number(max) }))
        dispatch(filterBreeds());
        dispatch(changeCurrentPage(1));
        setMin(0);
        setMax(0);
    }

    return <>
        <input
            type="number"
            placeholder="MIN"
            className={styles.inputMin}
            min="0"
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
        />
        <span className={styles.separator}> - </span>
        <input
            type="number"
            placeholder="MAX"
            className={styles.inputMax}
            min="0"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && min <= Number(e.target.value)) {
                    setMax(Number(e.target.value));
                    changeWeight();
                }
            }}
        />
        <button
            className={`${styles.btn} ${isSubmitDisabled && styles.btnDisabled}`}
            disabled={isSubmitDisabled}
            onClick={changeWeight}
        >
            &#62;
        </button>
    </>
}

export default WeightFilter;