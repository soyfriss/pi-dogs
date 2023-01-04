import React, { useEffect, useState } from 'react';
import styles from './Card.module.css';
import noImage from '../images/no-image.png';
import { NavLink } from 'react-router-dom';

function Card({ breed }) {
    const [isImgLoading, setIsImgLoading] = useState(true);

    useEffect(() => {
        console.log('Card useEffect()');
    }, []);

    console.log('Rendering Card');
    return <>
        <div className={`${styles.card} ${breed.notVisible && styles.notVisible}`}>
            <NavLink to={`/breed/${breed.id}?source=${breed.source}`} className={styles.navLink}>
                <div className={styles.cardHeader}>
                    <img className={styles.img} src={isImgLoading ? noImage : breed.image ? breed.image : noImage} alt="breed" onLoad={() => setIsImgLoading(false)} />
                </div>
                <div className={styles.cardBody}>
                    <p className={styles.breedName}>{breed.name}</p>
                    <p>Weight: <span className={styles.weight}>{`${breed.weight} Kg`}</span></p>
                    <p className={styles.temperaments}>{breed.temperament}</p>
                </div>
            </NavLink>
        </div>
    </>
}

export default Card;