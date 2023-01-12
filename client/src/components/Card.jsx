import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkBreed, uncheckBreed } from '../redux/actions.js';
import styles from './Card.module.css';
import noImage from '../images/no-image.png';
import { NavLink } from 'react-router-dom';

function Card({ breed, showCompareBreedCheckbox }) {
    const dispatch = useDispatch();

    const [isImgLoading, setIsImgLoading] = useState(true);
    const breedChecked = useSelector(state => state.breedsChecked.find(b => b.id === breed.id));
    const [isBreedChecked, setIsBreedChecked] = useState(breedChecked !== undefined);

    useEffect(() => {
        console.log('Card useEffect()');
    }, []);

    const handleBreedCheck = () => {
        setIsBreedChecked(!isBreedChecked);
        if (isBreedChecked) {
            dispatch(uncheckBreed(breed.id));
        } else {
            dispatch(checkBreed({ id: breed.id, name: breed.name }));
        }
    }

    console.log('Rendering Card');
    console.log('breedChecked: ', breedChecked);
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
            {showCompareBreedCheckbox &&
                <label>
                    <div className={styles.breedCheckedContainer}>
                        <input type='checkbox' className={styles.breedChecked} onChange={handleBreedCheck} checked={isBreedChecked} />
                        <p className={styles.breedCheckedLabel}>COMPARE BREED</p>
                    </div>
                </label>
            }
        </div>
    </>
}

export default Card;