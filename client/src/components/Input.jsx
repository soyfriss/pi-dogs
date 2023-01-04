import React, { useState } from 'react';
import styles from './Input.module.css';

function Input({ name, value, label, isRequired, maxLength = 524288, onChange }) {
    // console.log('InputRange');
    const [showError, setShowError] = useState(false);

    const validate = (value) => {
        if (isRequired && !value) {
            return 'This field is required';
        }
        if (maxLength && value.length > maxLength) {
            return `The maximum length (${maxLength}) of this field has been exceeded`;
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
