import React from 'react';
import styles from './Logo.module.css';
// import piLogo from '../images/pi-logo.png';
import { NavLink } from 'react-router-dom';

function Logo() {
    return <>
        <NavLink to="/" className={styles.logoLink}>
            <div className={styles.container}>
                <p className={styles.logo}>BX</p>
                <p className={styles.text}>BREED EXPLORER</p>
            </div>
        </NavLink>
    </>
}

export default Logo;