import React from 'react';
import styles from './Item.module.css';

function Item({ id, source, name, remove }) {
    return <>
        <div className={styles.container}>
            <p className={styles.name}>{name}</p>
            <button type="button" className={styles.remove} onClick={() => remove(id, source)}>X</button>
        </div>
    </>
}

export default Item;