import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './LandingPage.module.css';
import Logo from '../features/ui/Logo.jsx';
import landing from '../images/landing.png';

function LandingPage() {

    return <>
        <header className={styles.header}>
            <div className={styles.logo}>
                <Logo />
            </div>
            <div className={styles.ctaTop}>
                <NavLink to="/home">
                    <button type='button' className={styles.cta}>Try it free</button>
                </NavLink>
            </div>
        </header>
        <main>
            <div className={styles.container}>
                <div className={styles.breedExplorer}>
                    <h3>#1 breed explorer</h3>
                    <h1>Find the Best Dog Breed <span className={styles.highlight}>for You</span>!</h1>
                    <p>Search, filter and discover breeds you didn't know.</p>
                    <div className={styles.ctaLeft}>
                        <div>
                            <NavLink to="/home">
                                <button type='button' className={`${styles.cta} ${styles.big}`}>Try it free</button>
                            </NavLink>
                            <p className={styles.small}>No registration required</p>
                        </div>
                    </div>
                </div>
                <div className={styles.img}>
                    <img src={landing} alt="Dog breeds" />
                </div>
                <div className={styles.ctaBottom}>
                    <NavLink to="/home">
                        <button type='button' className={`${styles.cta} ${styles.big}`}>Try it free</button>
                    </NavLink>
                    <p className={styles.small}>No registration required</p>
                </div>
            </div>
        </main>
    </>;
}

export default LandingPage;