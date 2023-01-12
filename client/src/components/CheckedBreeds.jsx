import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uncheckBreed } from '../redux/actions';
import styles from './CheckedBreeds.module.css';
import Item from './Item.jsx';
import * as constants from '../constants/cards.js'

function CheckedBreeds() {
    const dispatch = useDispatch();
    const breeds = useSelector(state => state.breedsChecked);

    const handleRemove = (id) => {
        dispatch(uncheckBreed(id));
    }

    if (!breeds.length) {
        return <></>;
    }

    return <>
        <p className={styles.filterTitle}>COMPARE BREEDS ({`${breeds.length} / ${constants.MAX_BREEDS_TO_COMPARE}`})</p>
        <div className={styles.container}>
            {breeds.map(breed =>
                <Item
                    key={breed.id}
                    id={breed.id}
                    name={breed.name}
                    remove={() => handleRemove(breed.id)}
                />)}
        </div>
    </>
}

export default CheckedBreeds;