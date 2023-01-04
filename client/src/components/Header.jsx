import React from 'react';
import styles from './Header.module.css';
import Logo from './Logo.jsx';
import Nav from './Nav.jsx';

function Header() {
    return <>
        <header className={styles.header}>
            <Logo />
            <Nav />
        </header>
    </>
}

export default Header;