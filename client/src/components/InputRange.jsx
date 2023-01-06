import React, { useState } from 'react';
import styles from './InputRange.module.css';
import * as constants from '../constants/inputRange.js';

function InputRange({ name, minValue, maxValue, label, isRequired, validRange = [0, 0], onChange, showButton = false, handleButtonClick }) {
    // console.log('InputRange');
    const [showError, setShowError] = useState(false);

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
            return constants.FIELD_REQUIRED;
        }

        // Valid numbers?
        console.log('valid numbers? ', Number.isNaN(Number(min)), Number.isNaN(Number(max)));
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

    const error = validate(minValue, maxValue);

    return <>
        {/* {console.log('Rendering InputRange')} */}
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
                    value={minValue}
                    onChange={(e) => onChange(name, e.target.value, maxValue, validate(e.target.value, maxValue))}
                    onFocus={() => setShowError(false)}
                    onBlur={() => setShowError(true)}
                />
                <p className={styles.separator}>-</p>
                <input
                    type="text"
                    name="max"
                    className={styles.maxInput}
                    placeholder="Max"
                    value={maxValue}
                    onChange={(e) => onChange(name, minValue, e.target.value, validate(minValue, e.target.value))}
                    onFocus={() => setShowError(false)}
                    onBlur={() => setShowError(true)}
                />
                {showButton &&
                    <button
                        className={`${styles.btn} ${error && styles.btnDisabled}`}
                        disabled={error}
                        onClick={handleButtonClick}
                    >
                        &#62;
                    </button>
                }
            </div>
            {showError && error &&
                <p className="error">{error}</p>
            }
        </div>
    </>
}

export default InputRange;
