import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkBreed, uncheckBreed } from '../../common/redux/actions.js';
import styles from './Card.module.css';
import noImage from '../../images/no-image.png';
import PlaceholderImg from '../ui/PlaceholderImg.jsx';
import { NavLink } from 'react-router-dom';
import * as constants from '../../common/constants/cards.js';

function Card({ breed, showCompareBreedCheckbox }) {
    const dispatch = useDispatch();
    const isBreedChecked = useSelector(state =>
        state.compareBreeds.items.find(b => b.name === breed.name) !== undefined
    );

    useEffect(() => {
        // console.log('Card useEffect()');
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
                    <PlaceholderImg
                        placeholderSrc={noImage}
                        src={breed.image}
                        className={styles.img}
                        alt={`${breed.name} breed`}
                    />
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