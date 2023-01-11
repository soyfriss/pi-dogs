import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Select.module.css';
import Item from './Item.jsx';

function Select({ label, minItemsSelected = 0, maxItemsSelected = 0, value = [], onChange }) {
    const [selectedTemperaments, setSelectedTemperaments] = useState(value);
    const [showError, setShowError] = useState(false);
    const [input, setInput] = useState({
        value: 'default',
        isAddDisabled: true
    })
    const temperaments = useSelector(state => state.temperaments.items);
    const selectRef = useRef();

    const onChangeSelect = (id, action) => {
        // console.log('onChangeSelect', id, action);
        let newSelectedTemperaments = [];

        if (action === 'add') {
            const temperament = temperaments.find(t => t.id === id);
            newSelectedTemperaments = [...selectedTemperaments, temperament];
            setSelectedTemperaments(newSelectedTemperaments);
        } else if (action === 'remove') {
            newSelectedTemperaments = selectedTemperaments.filter(t => t.id !== id);
            setSelectedTemperaments(newSelectedTemperaments);
        }
        onChange(newSelectedTemperaments, validate(newSelectedTemperaments));
    }

    const addTemperament = () => {
        // console.log('selectRef: ', selectRef.current.value);
        const id = Number(input.value);
        // // const temperament = temperaments.find(t => t.id === id);
        // // setSelectedTemperaments(old => [...old, temperament]);
        onChangeSelect(id, 'add');
        setInput(oldInput => ({
            ...oldInput,
            value: 'default',
            isAddDisabled: true
        }))
    }

    const removeTemperament = (id) => {
        // setSelectedTemperaments(selectedTemperaments.filter(t => t.id !== id));
        onChangeSelect(id, 'remove');
    }

    const validate = (temperaments) => {
        if (minItemsSelected && temperaments.length < minItemsSelected) {
            return `Select at least ${minItemsSelected} ${minItemsSelected === 1 ? 'item' : 'items'}`;
        }

        return '';
    }

    const createLabel = () => {
        const max = maxItemsSelected === 0 ? 'unlimited' : maxItemsSelected;

        return `${label || 'label'} (${selectedTemperaments.length} / ${max})`;
    }

    const handleChange = (event) => {
        return setInput({
            value: event.target.value,
            isAddDisabled: (event.target.value === 'default' || (maxItemsSelected && maxItemsSelected === selectedTemperaments.length))
        });
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
                    ref={selectRef}
                    onFocus={() => setShowError(false)}
                    onBlur={() => setShowError(true)}
                    value={input.value}
                    onChange={handleChange}
                >
                    <option value="default" hidden>
                        Choose...
                    </option>
                    {temperaments?.filter(t => !selectedTemperaments.some(st => st.id === t.id)).map((temperament) => (
                        <option value={temperament.id} key={temperament.id}>
                            {temperament.name}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    className={`btn-small ${input.isAddDisabled && 'btn-disabled'}`}
                    onClick={addTemperament}
                    disabled={input.isAddDisabled}
                    onFocus={() => setShowError(false)}
                    onBlur={() => setShowError(true)}
                >
                    ADD
                </button>
            </div>
            {showError && validate(selectedTemperaments) &&
                <p className="error">{validate(selectedTemperaments)}</p>
            }
            <div className={styles.selectedTemperaments}>
                {selectedTemperaments.map(t => <Item id={t.id} key={t.id} name={t.name} remove={removeTemperament} />)}
            </div>
        </div>
    </>;
}

export default Select;