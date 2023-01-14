import React from 'react';
import styles from './Logo.module.css';
// import piLogo from '../images/pi-logo.png';
import { NavLink } from 'react-router-dom';

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