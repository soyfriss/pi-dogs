import React from 'react';
import styles from './Logo.module.css';
import piLogo from '../images/pi-logo.png';
import { NavLink } from 'react-router-dom';

function Logo() {
    return <>
        <div className={styles.container}>
            <NavLink to="/home"><img src={piLogo} alt="logo" className={styles.img}></img></NavLink>
            <p className={styles.text}>PIchichos</p>
        </div>
    </>
}

export default Logo;