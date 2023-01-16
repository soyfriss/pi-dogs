import React from 'react';
// import styles from './Loader.module.css';
import paw from '../../images/paw-solid.svg';

function Loader() {
    return (
        <div className="loader">
            <div><img src={paw} className="animated-paw" alt="animated paw" /></div>
            <div><img src={paw} className="animated-paw" alt="animated paw" /></div>
            <div><img src={paw} className="animated-paw" alt="animated paw" /></div>
        </div>
    );
};

export default Loader;
