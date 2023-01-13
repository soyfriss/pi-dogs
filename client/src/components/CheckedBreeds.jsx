import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { uncheckBreed, uncheckAllBreeds } from '../redux/actions';
import styles from './CheckedBreeds.module.css';
import Item from './Item.jsx';
import * as constants from '../constants/cards.js'

function CheckedBreeds() {
    const dispatch = useDispatch();
    const breeds = useSelector(state => state.checkedBreeds);

    const handleRemove = (id) => {
        dispatch(uncheckBreed(id));
    }

    const handleClearAll = () => {
        dispatch(uncheckAllBreeds());
    }

    if (!breeds.length) {
        return <></>;
    }

    return <>
        <p className={styles.filterTitle}>COMPARE BREEDS ({`${breeds.length} / ${constants.MAX_BREEDS_TO_COMPARE}`})</p>
        <div className={styles.container}>
            {breeds.map(breed =>
                <Item
                    key={breed.name}
                    id={breed.id}
                    name={breed.name}
                    remove={() => handleRemove(breed.id)}
                />)}
        </div>
        {breeds.length >= 2 &&
            <div className={styles.buttonsContainer}>
                <NavLink to="/breeds/compare" className='btn-small'>
                    COMPARE
                </NavLink>
                <button type='button' className='btn-small' onClick={handleClearAll}>
                    CLEAR ALL
                </button>
            </div>
        }
    </>
}

export default CheckedBreeds;