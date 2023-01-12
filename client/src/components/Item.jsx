import React from 'react';
import styles from './Item.module.css';

function Item({ id, name, remove }) {
    return <>
        <div className={styles.container}>
            <p className={styles.name}>{name}</p>
            <button className={styles.remove} onClick={() => remove(id)}>X</button>
        </div>
    </>
}

export default Item;