import React from 'react';
import styles from './Error.module.css';
import cutePuppy from '../images/cute-puppy.jpg';

function Error({ title, message }) {
    return <>
        <div className={styles.container}>
            <div className={styles.messageContainer}>
                <p className={styles.title}>{title}</p>
                <p className={styles.message}>{message}</p>
            </div>
            <img src={cutePuppy} className={styles.img} alt="Cute puppy" />
        </div>
    </>
}

export default Error;