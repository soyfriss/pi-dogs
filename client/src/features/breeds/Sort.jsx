import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Sort.module.css';
import orderBy from '../../images/order-by.svg';
import { sortBreeds } from '../../common/redux/actions.js';

function Sort() {
    const dispatch = useDispatch();
    const sort = useSelector(state => state.breeds.sort);

    const handleChange = (event) => {
        dispatch(sortBreeds(event.target.value));
    }

    return <>
        <div className={styles.container}>
            <img src={orderBy} className={styles.orderByIcon} alt="order by"></img>
            <select
                name="select"
                className={styles.select}
                defaultValue={sort}
                onChange={handleChange}
            >
                <option value="nameAsc">Breed name A-Z</option>
                <option value="nameDesc">Breed name Z-A</option>
                <option value="minWeight">Min Weight</option>
                <option value="maxWeight">Max Weight</option>
            </select>
        </div>
    </>
}

export default Sort;