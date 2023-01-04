import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';
import github from '../images/github-mark.png';
import linkedin from '../images/linkedin.png';

function Nav() {
    return <>
        <nav>
            <ul>
                <li><NavLink to="/home" className={styles.link} activeClassName={styles.activeLink}>HOME.</NavLink></li>
                <li><NavLink to="/breed/create" className={styles.link} activeClassName={styles.activeLink}>NEW BREED.</NavLink></li>
                <li><NavLink to="/about" className={styles.link} activeClassName={styles.activeLink}>ABOUT.</NavLink></li>
                <li><a href="https://www.linkedin.com/in/soyfriss/" target="_blank" rel="noreferrer"><img className={styles.img} src={linkedin} alt='linkedin' /></a></li>
                <li><a href="https://github.com/soyfriss" target="_blank" rel="noreferrer"><img className={styles.img} src={github} alt='github' /></a></li>
            </ul>
        </nav>
    </>;
}

export default Nav;