import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './BreedDetail.module.css';
import { fetchBreed } from '../redux/actions';
import Loader from './Loader.jsx';
import noImage from '../images/no-image.png';

function BreedDetail({ match, location }) {

    // console.log('match: ', match);
    // console.log('location: ', location);
    // const history = useHistory();
    const id = match.params.id;
    const source = location.search;
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loadingBreedDetail);
    const breed = useSelector(state => state.breedDetail);

    useEffect(() => {
        console.log('BreedDetail useEffect()');
        dispatch(fetchBreed(id, source));
    }, [dispatch, id, source]);

    if (loading) {
        return <Loader />;
    }

    return <>
        <div className={styles.section}>
            <p className={styles.title}>Breed detail</p>

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