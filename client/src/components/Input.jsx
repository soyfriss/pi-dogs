import React, { useState } from 'react';
import styles from './Input.module.css';
import * as constants from '../constants/input.js';

function Input({ name, value, label, isRequired, maxLength = 524288, onChange }) {
    // console.log('InputRange');
    const [showError, setShowError] = useState(false);

    const validate = (value) => {
        if (isRequired && !value) {
            return constants.FIELD_REQUIRED;
        }
        if (maxLength && value.length > maxLength) {
            return `${constants.MAX_LENGTH_EXCEEDED} (max: ${maxLength})`;
        }

        return '';
    }

    const error = validate(value);

    return <>
        <div className={styles.container}>
            <label className="largeLabel">{label || 'label'} {isRequired && <span className="required">*</span>}</label>
            <input
                type="text"
                name={name}
                placeholder={label}
                value={value}
                maxLength={maxLength}
                onChange={(e) => onChange(name, e.target.value, validate(e.target.value))}
                onFocus={() => setShowError(false)}
                onBlur={() => setShowError(true)}
            />
            {showError && error &&
                <p className="error">{error}</p>
            }
        </div>
    </>
}

export default Input;
