import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import styles from './BreedDetail.module.css';
import Loader from './Loader.jsx';
import Header from './Header.jsx';
import Error from './Error.jsx';
import noImage from '../images/no-image.png';
import { getBreed } from '../redux/api.js';
import * as constants from '../constants/breedDetail.js';
import * as errors from '../constants/errors.js';

function BreedDetail() {
    const { id } = useParams();
    const { search, state } = useLocation();

    const [breed, setBreed] = useState({
        item: {},
        status: 'loading',
        error: null
    });

    useEffect(() => {
        console.log('BreedDetail useEffect() to fetch breed');
        async function fetchBreed(id, source) {
            try {
                const response = await getBreed(id, source);

                if (response.ok) {
                    setBreed(breed => ({
                        ...breed,
                        status: 'succeeded',
                        item: response.data
                    }));
                } else {
                    console.log('response: ', response);
                    setBreed(breed => ({
                        ...breed,
                        status: 'failed',
                        item: {},
                        error: response.error
                    }));
                }
            } catch (error) {
                setBreed(breed => ({
                    ...breed,
                    status: 'failed',
                    item: {},
                    error: {
                        message: errors.DEFAULT_ERROR_MESSAGE,
                        status: errors.DEFAULT_ERROR_STATUS
                    }
                }));
            }
        }
        fetchBreed(id, search);
    }, [id, search]);

    if (breed.status === 'loading') {
        return <>
            <Header />
            <main>
                <Loader />;
            </main>
        </>;
    }

    if (breed.status === 'failed') {
        return <>
            <Header />
            <main>
                <Error title='Oops!' message={breed.error.message} />;
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
                        <p className={styles.breedName}>{breed.item.name}</p>
                        <p>Weight: <span className={styles.subtitle}>{`${breed.item.weight} Kg`}</span></p>
                        <p>Height: <span className={styles.subtitle}>{`${breed.item.height} cm`}</span></p>
                        <p>Life span: <span className={styles.subtitle}>{breed.item.lifeSpan}</span></p>
                        <p>Temperaments: <span className={styles.subtitle}>{breed.item.temperament ? breed.item.temperament : constants.NO_TEMPERAMENTS}</span></p>
                        <NavLink to="/home" className={styles.navLink}>
                            Back
                        </NavLink>
                    </div>
                    <img className={styles.img} src={breed.item.image ? breed.item.image : noImage} alt="breed" />
                </div>
            </div>
        </main>
    </>;
}

export default BreedDetail;