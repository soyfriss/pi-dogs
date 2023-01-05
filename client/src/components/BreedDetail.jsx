import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import styles from './BreedDetail.module.css';
import { fetchBreed, clearCreateBreedStatus } from '../redux/actions';
import Loader from './Loader.jsx';
import noImage from '../images/no-image.png';

function BreedDetail() {
    const { id } = useParams();
    const { search, state } = useLocation();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loadingBreedDetail);
    const breed = useSelector(state => state.breedDetail);

    useEffect(() => {
        console.log('BreedDetail useEffect() to clear create breed status');
        if (state && state.clearCreateBreedStatus) {
            dispatch(clearCreateBreedStatus());
        }
    }, [dispatch, state]);

    useEffect(() => {
        console.log('BreedDetail useEffect() to fetch breed');
        dispatch(fetchBreed(id, search));
    }, [dispatch, id, search]);

    if (loading) {
        return <Loader />;
    }

    return <>
        <div className={styles.section}>
            <p className={styles.title}>{ (state && state.title) ? state.title : 'Breed detail' }</p>

            <div className={styles.body}>
                <div className={styles.text}>
                    <p className={styles.breedName}>{breed.name}</p>
                    <p>Weight: <span className={styles.subtitle}>{`${breed.weight} Kg`}</span></p>
                    <p>Height: <span className={styles.subtitle}>{`${breed.height} cm`}</span></p>
                    <p>Life span: <span className={styles.subtitle}>{breed.lifeSpan}</span></p>
                    <p>Temperaments: <span className={styles.subtitle}>{breed.temperament}</span></p>
                    <NavLink to="/home" className={styles.navLink}>
                        Back
                    </NavLink>
                </div>
                <img className={styles.img} src={breed.image ? breed.image : noImage} alt="breed" />
            </div>
        </div>
    </>;
}

export default BreedDetail;