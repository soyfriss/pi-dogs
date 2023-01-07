import React from 'react';
import styles from './Error.module.css';
import scaredDog from '../images/scared-dog.svg';
//Image by <a href="https://pixabay.com/users/openclipart-vectors-30363/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1299573">OpenClipart-Vectors</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1299573">Pixabay</a>

function Error({ title, message }) {
    return <>
        <div className={styles.container}>
            <div className={styles.messageContainer}>
                <p className={styles.title}>{title}</p>
                <p className={styles.message}>{message}</p>
            </div>
            <img src={scaredDog} className={styles.img} alt="Cute puppy" />
        </div>
    </>
}

export default Error;