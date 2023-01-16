import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Logo.module.css';

function Logo() {
    return <>
        <NavLink to="/home" className={styles.logoLink}>
            <div className={styles.container}>
                <button className={styles.logo}>BX</button>
                <p className={styles.text}>BREED EXPLORER</p>
            </div>
        </NavLink>
    </>
}

export default Logo;