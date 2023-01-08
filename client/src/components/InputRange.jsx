import React, { useState } from 'react';
import styles from './InputRange.module.css';
import * as constants from '../constants/inputRange.js';

function InputRange({ name, label, isRequired, validRange = [0, 0], min, max, onChange, showButton = false, handleButtonClick }) {
    console.log('InputRange, min max: ', min, max);
    const [input, setInput] = useState({
        min,
        max,
        error: isRequired ? constants.FIELD_REQUIRED : ''
    });
    const [showError, setShowError] = useState(false);

    const handleChangeMin = (event) => {
        const error = validate(event.target.value, input.max);
        
        setInput(oldInput => ({
            ...oldInput,
            min: event.target.value,
            error
        }));

        onChange(name, event.target.value, input.max, error);
    }

    const handleChangeMax = (event) => {
        const error = validate(input.min, event.target.value);
        
        setInput(oldInput => ({
            ...oldInput,
            max: event.target.value,
            error
        }));

        onChange(name, input.min, event.target.value, error);
    }

    const validate = (min, max) => {
        // Only one value entered?
        if (!min.length && max.length) {
            return constants.MIN_VALUE_MISSING;
        }
        if (min.length && !max.length) {
            return constants.MAX_VALUE_MISSING;
        }

        // Is required?            
        if (isRequired && (!min.length && !max.length)) {
            console.log('Field is required!');
            return constants.FIELD_REQUIRED;
        }

        // Valid numbers?
        // console.log('valid numbers? ', Number.isNaN(Number(min)), Number.isNaN(Number(max)));
        if (Number.isNaN(Number(min)) || Number.isNaN(Number(max))) {
            return constants.INVALID_DATA;
        }

        const minValue = Number(min);
        const maxValue = Number(max);

        if (minValue > maxValue) {
            return `${constants.INVALID_RANGE} (min > max)`;
        }
        if (isValidRangePresent() && (minValue < validRange[0] || maxValue > validRange[1])) {
            return `${constants.INVALID_RANGE} (valid range: ${validRange[0]} - ${validRange[1]})`;
        }

        return '';
    }

    const isValidRangePresent = () => {
        // console.log('isValidRangePresent: ', (validRange[0] && validRange[1]));
        return !!(validRange[0] || validRange[1]);
    }

    return <>
        {console.log('Rendering InputRange, value:', input.min, input.max)}
        <div className={styles.container}>
            {label &&
                <label className="largeLabel">
                    {label} {isValidRangePresent() && `(${validRange[0]} - ${validRange[1]})`} {isRequired && <span className="required">*</span>}
                </label>
            }
            <div className={styles.rangeContainer}>
                <input
                    type="text"
                    name="min"
                    className={styles.minInput}
                    placeholder="Min"
                    value={input.min}
                    onChange={handleChangeMin}
                    onFocus={() => setShowError(false)}
                    onBlur={() => setShowError(true)}
                />
                <p className={styles.separator}>-</p>
                <input
                    type="text"
                    name="max"
                    className={styles.maxInput}
                    placeholder="Max"
                    value={input.max}
                    onChange={handleChangeMax}
                    onFocus={() => setShowError(false)}
                    onBlur={() => setShowError(true)}
                />
                {showButton &&
                    <button
                        className={`${styles.btn} ${(input.error || (input.min === '' && input.max === '')) && styles.btnDisabled}`}
                        disabled={(input.error || (input.min === '' && input.max === ''))}
                        onClick={() => {
                            handleButtonClick();
                            setInput(input => ({
                                ...input,
                                min: '',
                                max: '',
                                error: isRequired ? constants.FIELD_REQUIRED : ''
                            }))
                        }}
                    >
                        &#62;
                    </button>
                }
            </div>
            {showError && input.error &&
                <p className="error">{input.error}</p>
            }
        </div>
    </>
}

export default InputRange;
