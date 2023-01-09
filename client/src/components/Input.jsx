import React, { useState } from 'react';
import styles from './Input.module.css';
import * as constants from '../constants/input.js';

function Input({ name, label, isRequired, maxLength = 524288, value, onChange, parentError }) {
    // console.log('InputRange');
    const validateInput = (value) => {
        if (isRequired && !value) {
            return constants.FIELD_REQUIRED;
        }
        if (maxLength && value.length > maxLength) {
            return `${constants.MAX_LENGTH_EXCEEDED} (max: ${maxLength})`;
        }

        return '';
    }

    const [input, setInput] = useState({
        value: value,
        error: parentError !== '' ? parentError : validateInput(value)
    })
    const [showError, setShowError] = useState( parentError !== '' ? true : false);


    const handleChange = (event) => {
        const error = validateInput(event.target.value);

        setInput({
            value: event.target.value,
            error
        });

        onChange(name, event.target.value, error);
    }

    return <>
        <div className={styles.container}>
            <label className="largeLabel">{label || 'label'} {isRequired && <span className="required">*</span>}</label>
            <input
                type="text"
                name={name}
                placeholder={label}
                value={input.value}
                maxLength={maxLength}
                onChange={handleChange}
                onFocus={() => setShowError(false)}
                onBlur={() => setShowError(true)}
            />
            { showError && input.error &&
                <p className="error">{input.error}</p>
            }
        </div>
    </>
}

export default Input;
