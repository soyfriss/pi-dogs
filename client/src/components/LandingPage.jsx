import React from 'react';
import styles from './LandingPage.module.css';
import Logo from './Logo.jsx';
import landing from '../images/man-walking-dog.png';
import { NavLink } from 'react-router-dom';

function LandingPage() {
    return <>
        <main>
            <div className={styles.container}>
                <div className={styles.div1}>
                    <Logo />
                </div>
                <div className={styles.div2}>
                    <NavLink to="/home">
                        <button type='button' className={styles.cta}>Try it free</button>
                    </NavLink>
                </div>
                <div className={styles.div3}>
                    <h3>#1 breed explorer</h3>
                    <h1>Find the Best Dog Breed <span className={styles.highlight}>for You</span>!</h1>
                    <p>Search, filter and discover breeds you didn't know.</p>
                    <div className={styles.ctaBigContainer}>
                        <NavLink to="/home">
                            <button type='button' className={`${styles.cta} ${styles.big}`}>Try it free</button>
                        </NavLink>
                        <p className={styles.small}>No registration required</p>
                    </div>
                </div>
                <div className={styles.div4}>
                    <img className={styles.landingImg} src={landing} alt="Woman walking a dog wearing a green collar" />
                </div>
            </div>
        </main>
    </>;
}

export default LandingPage;