import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkBreed, uncheckBreed } from '../redux/actions.js';
import styles from './Card.module.css';
import noImage from '../images/no-image.png';
import { NavLink } from 'react-router-dom';
import * as constants from '../constants/cards.js';

function Card({ breed, showCompareBreedCheckbox }) {
    const dispatch = useDispatch();
    const [isImgLoading, setIsImgLoading] = useState(true);
    const isBreedChecked = useSelector(state =>
        state.checkedBreeds.find(b => b.name === breed.name) !== undefined
    );

    useEffect(() => {
        console.log('Card useEffect()');
    }, []);

    const handleCheck = () => {
        if (isBreedChecked) {
            dispatch(uncheckBreed(breed.id));
        } else {
            dispatch(checkBreed({ id: breed.id, name: breed.name, source: breed.source }));
        }
    }

    return <>
        {/* {console.log('Rendering Card: ', breed.name)} */}
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
                        <input
                            type='checkbox'
                            className={styles.breedChecked}
                            onChange={handleCheck}
                            checked={isBreedChecked} />
                        <p className={styles.breedCheckedLabel}>{constants.COMPARE_BREED_LABEL}</p>
                    </div>
                </label>
            }
        </div>
    </>
}

export default Card;