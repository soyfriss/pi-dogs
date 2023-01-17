import React, { useState } from 'react';
import styles from './Input.module.css';
import * as constants from '../../common/constants/input.js';

function Input({ name, label, isRequired, maxLength = 524288, value, onChange, parentError }) {
    const validateInput = (value) => {
        if (isRequired && !value) {
            return constants.FIELD_REQUIRED;
        }
        if (maxLength && value && value.length > maxLength) {
            return `${constants.MAX_LENGTH_EXCEEDED} (max: ${maxLength})`;
        }

        return '';
    }

    const [input, setInput] = useState({
        value: value,
        error: validateInput(value)
    })
    const [showError, setShowError] = useState(parentError !== '');


    const handleChange = (event) => {
        const error = validateInput(event.target.value);

        setInput({
            value: event.target.value,
            error
        });

        if (typeof onChange === 'function') {
            onChange(name, event.target.value, error);
        }
    }

    return <>
        <div className={styles.container}>
            <label htmlFor={name}
                className="largeLabel">{label || 'label'} {isRequired && <span className="required">*</span>}
            </label>
            <input
                data-testid="input"
                type="text"
                id={name}
                name={name}
                placeholder={label}
                value={input.value}
                maxLength={maxLength}
                onChange={handleChange}
                onFocus={() => setShowError(false)}
                onBlur={() => setShowError(true)}
            />
            {showError && (input.error || parentError ) &&
                <p data-testid="error" className="error">{input.error || parentError}</p>
            }
        </div>
    </>
}

export default Input;
