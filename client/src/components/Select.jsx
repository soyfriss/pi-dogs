import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTemperaments } from '../redux/actions';
import styles from './Select.module.css';
import Item from './Item.jsx';

function Select({ name, label, items , minItemsSelected = 0, maxItemsSelected = 0, onChange}) {
    const dispatch = useDispatch();
    const [showError, setShowError] = useState(false);
    // const [selectedTemperaments, setSelectedTemperaments] = useState([]);
    const temperaments = useSelector(state => state.temperaments);
    const selectRef = useRef();

    // Enable after the next version of fetchTemperaments() !!!!!!!!!!!!!!!!!
    // useEffect(() => {
    //     dispatch(fetchTemperaments());
    // }, [dispatch]);

    // useEffect(() => {
    //     onChange(name, selectedTemperaments);
    // }, selectedTemperaments);

    const addTemperament = () => {
        console.log('selectRef: ', selectRef.current.value);
        const id = Number(selectRef.current.value);
        // // const temperament = temperaments.find(t => t.id === id);
        // // setSelectedTemperaments(old => [...old, temperament]);
        onChange(id, 'add');
    }

    const removeTemperament = (id) => {
        // setSelectedTemperaments(selectedTemperaments.filter(t => t.id !== id));
        onChange(id, 'remove');
    }

    return <>
        <div className={styles.container}>
            <label className="largeLabel">{label || 'label'} {minItemsSelected > 0 && <span className="required">*</span>}</label>
            <div className={styles.selectContainer}>
                <select name="temperaments" defaultValue="default" ref={selectRef}>
                    <option value="default" hidden>
                        Choose...
                    </option>
                    {temperaments?.filter(t => !items.some(st => st.id === t.id)).map((temperament) => (
                        <option value={temperament.id} key={temperament.id}>
                            {temperament.name}
                        </option>
                    ))}
                </select>
                <button className="btn-primary" onClick={addTemperament}>ADD</button>
            </div>
            <div className={styles.selectedTemperaments}>
                {items.map(t => <Item id={t.id} key={t.id} name={t.name} remove={removeTemperament} />)}
            </div>
        </div>
    </>;
}

export default Select;