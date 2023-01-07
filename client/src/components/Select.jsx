import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Select.module.css';
import Item from './Item.jsx';

function Select({ name, label, items, minItemsSelected = 0, maxItemsSelected = 0, onChange }) {
    const [showError, setShowError] = useState(false);
    const [isAddDisabled, setIsAddDisabled] = useState(true);
    const temperaments = useSelector(state => state.temperaments.items);
    const selectRef = useRef();

    const enableAddTemperament = () => {
        console.log('enableAddTemperament: ', selectRef.current?.value);
        if (!selectRef.current?.value) {
            return setIsAddDisabled(true);
        }
        if (selectRef.current.value === 'default') {
            return setIsAddDisabled(true);
        }

        if (maxItemsSelected && maxItemsSelected === items.length) {
            return setIsAddDisabled(true);
        }

        setIsAddDisabled(false);
    }
    // useEffect(() => {
    //     console.log('Select useEffect()');
    //     enableAddTemperament();
    // }, []);

    const addTemperament = () => {
        // console.log('selectRef: ', selectRef.current.value);
        const id = Number(selectRef.current.value);
        // // const temperament = temperaments.find(t => t.id === id);
        // // setSelectedTemperaments(old => [...old, temperament]);
        onChange(id, 'add');
    }

    const removeTemperament = (id) => {
        // setSelectedTemperaments(selectedTemperaments.filter(t => t.id !== id));
        onChange(id, 'remove');
    }

    const validate = () => {
        if (minItemsSelected && items.length < minItemsSelected) {
            return `Select at least ${minItemsSelected} ${minItemsSelected === 1 ? 'item' : 'items'}`;
        }

        return '';
    }

    const createLabel = () => {
        const max = maxItemsSelected === 0 ? 'unlimited' : maxItemsSelected;

        return `${label || 'label'} (${items.length} / ${max})`;
    }

    return <>
        <div className={styles.container}>
            <label
                className="largeLabel"
            >
                {createLabel()} {minItemsSelected > 0 && <span className="required">*</span>}
            </label>
            <div className={styles.selectContainer}>
                <select
                    name="temperaments"
                    defaultValue="default"
                    ref={selectRef}
                    onFocus={() => setShowError(false)}
                    onBlur={() => setShowError(true)}
                    onChange={(e) => enableAddTemperament()}
                >
                    <option value="default" hidden>
                        Choose...
                    </option>
                    {temperaments?.filter(t => !items.some(st => st.id === t.id)).map((temperament) => (
                        <option value={temperament.id} key={temperament.id}>
                            {temperament.name}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    className={`btn-primary ${isAddDisabled && 'btn-disabled'}`}
                    onClick={addTemperament}
                    disabled={isAddDisabled}
                >
                    ADD
                </button>
            </div>
            {showError && validate() &&
                <p className="error">{validate()}</p>
            }
            <div className={styles.selectedTemperaments}>
                {items.map(t => <Item id={t.id} key={t.id} name={t.name} remove={removeTemperament} />)}
            </div>
        </div>
    </>;
}

export default Select;