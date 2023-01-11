import React from 'react';
import styles from './Error404.module.css';
import Logo from './Logo.jsx';
import { NavLink } from 'react-router-dom';
import * as errors from '../constants/errors.js';

function Error404() {
    return <>
        <main>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <div className={styles.errorMessage}>
                    <h1>Oops!</h1>
                    <p>{errors.NOT_FOUND_MESSAGE}</p>
                    <NavLink to="/home">
                        <button type='button' className={`${styles.cta} ${styles.big}`}>Go to home</button>
                    </NavLink>
                </div>
                <p className={styles.errorCode}>Error 404</p>
                <div className={styles.img}></div>
            </div>
        </main>
    </>;
}

export default Error404;