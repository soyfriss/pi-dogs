import React from 'react';
import styles from './Error.module.css';

function Error({ title, message }) {
    return <>
        <div className={styles.container}>
            <p className={styles.title}>{title}</p>
            <p className={styles.message}>{message}</p>
        </div>
    </>
}

export default Error;