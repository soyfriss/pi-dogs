import React from 'react';
import styles from './Error404.module.css';
import Logo from './Logo.jsx';
import scaredDog from '../images/scared-dog.svg';
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
                    <div>
                        <h1>Oops!</h1>
                        <p>{errors.NOT_FOUND_MESSAGE}</p>
                        <NavLink to="/home">
                            <button type='button' className={`${styles.cta} ${styles.big}`}>Go home</button>
                        </NavLink>
                    </div>
                    <div>
                        <img src={scaredDog} alt="Scared dog"></img>
                    </div>
                </div>
                <p className={styles.errorCode}>Error 404</p>
            </div>
        </main>
    </>;
}

export default Error404;