import React from 'react';
import styles from './LandingPage.module.css';
import Logo from './Logo.jsx';
import landing from '../images/man-walking-dog.png';
import { NavLink } from 'react-router-dom';

function LandingPage() {

    const myBgStyle = {
        backgroundImage: `url(${landing})`,
        width: '100%',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    };

    return <>
        <main>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <div className={styles.ctaTop}>
                    <NavLink to="/home">
                        <button type='button' className={styles.cta}>Try it free</button>
                    </NavLink>
                </div>
                <div className={styles.breedExplorer}>
                    <h3>#1 breed explorer</h3>
                    <h1>Find the Best Dog Breed <span className={styles.highlight}>for You</span>!</h1>
                    <p>Search, filter and discover breeds you didn't know.</p>
                </div>
                <div className={styles.ctaBig}>
                    <NavLink to="/home">
                        <button type='button' className={`${styles.cta} ${styles.big}`}>Try it free</button>
                    </NavLink>
                    <p className={styles.small}>No registration required</p>
                </div>
                <div className={styles.img}></div>
            </div>
        </main>
    </>;
}

export default LandingPage;