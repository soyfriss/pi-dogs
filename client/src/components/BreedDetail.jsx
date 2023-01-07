import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import styles from './BreedDetail.module.css';
import Loader from './Loader.jsx';
import Header from './Header.jsx';
import Error from './Error.jsx';
import noImage from '../images/no-image.png';
import { getBreed } from '../redux/api.js';
import * as constants from '../constants/breedDetail.js';

function BreedDetail() {
    const { id } = useParams();
    const { search, state } = useLocation();
    const [status, setStatus] = useState('loading');
    const [breed, setBreed] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('BreedDetail useEffect() to fetch breed');
        async function fetchBreed(id, source) {
            try {
                const response = await getBreed(id, source);
                setStatus('succeeded');
                setBreed(response.data);
            } catch (error) {
                setStatus('failed');
                setError({
                    message: error.response.data,
                    status: error.response.status
                });
            }
        }
        fetchBreed(id, search);
    }, [id, search]);

    if (status === 'loading') {
        return <>
            <Header />
            <main>
                <Loader />;
            </main>
        </>;
    }

    if (status === 'failed') {
        return <>
            <Header />
            <main>
                <Error title='Oops!' message={error.message} />;
            </main>
        </>;
    }

    return <>
        <Header />
        <main>
            <div className={styles.section}>
                <p className={styles.title}>{(state && state.title) ? state.title : 'Breed detail'}</p>

                <div className={styles.body}>
                    <div className={styles.text}>
                        <p className={styles.breedName}>{breed.name}</p>
                        <p>Weight: <span className={styles.subtitle}>{`${breed.weight} Kg`}</span></p>
                        <p>Height: <span className={styles.subtitle}>{`${breed.height} cm`}</span></p>
                        <p>Life span: <span className={styles.subtitle}>{breed.lifeSpan}</span></p>
                        <p>Temperaments: <span className={styles.subtitle}>{breed.temperament ? breed.temperament : constants.NO_TEMPERAMENTS}</span></p>
                        <NavLink to="/home" className={styles.navLink}>
                            Back
                        </NavLink>
                    </div>
                    <img className={styles.img} src={breed.image ? breed.image : noImage} alt="breed" />
                </div>
            </div>
        </main>
    </>;
}

export default BreedDetail;