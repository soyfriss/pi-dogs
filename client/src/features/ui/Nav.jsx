import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Nav.module.css';
import github from '../../images/github-mark.png';
import linkedin from '../../images/linkedin.png';
import Logo from './Logo.jsx';

function Nav() {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    const showCompareLink = useSelector(state => state.compareBreeds.items.length >= 2);

    return <>
        <nav className={styles.navigation}>
            <Logo />
            <button
                type="button"
                className={styles.hamburger}
                onClick={() => {
                    setIsNavExpanded(!isNavExpanded);
                }}
            >
                {/* icon from heroicons.com */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="#151922"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <div className={isNavExpanded ? `${styles.navigationMenu} ${styles.expanded}` : `${styles.navigationMenu}`}>
                <ul>
                    <li><NavLink to="/home" className={styles.link} activeClassName={styles.activeLink}>HOME.</NavLink></li>
                    <li><NavLink to="/breed/create" className={styles.link} activeClassName={styles.activeLink}>NEW BREED.</NavLink></li>
                    {showCompareLink &&
                        <li><NavLink to="/breeds/compare" className={styles.link} activeClassName={styles.activeLink}>COMPARE.</NavLink></li>
                    }
                    <li><a href="https://www.linkedin.com/in/soyfriss/" target="_blank" rel="noreferrer"><img className={styles.img} src={linkedin} alt='linkedin' /></a></li>
                    <li><a href="https://github.com/soyfriss" target="_blank" rel="noreferrer"><img className={styles.img} src={github} alt='github' /></a></li>
                </ul>
            </div>
        </nav>
    </>;
}

export default Nav;