import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import styles from './BreedDetail.module.css';
import Loader from './Loader.jsx';
import Header from './Header.jsx';
import Error from './Error.jsx';
import BreedsComparisonTable from './BreedsComparisonTable.jsx';
import { getBreed } from '../integrations/api.js';
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
        async function fetchBreed(id, source, state) {
            try {
                const response = await getBreed(id, source);

                if (response.ok) {
                    setBreed(breed => ({
                        ...breed,
                        status: 'succeeded',
                        item: {
                            ...response.data,
                            message: state && state.message
                        }
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
        fetchBreed(id, search, state);
    }, [id, search, state]);

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
            <div className={styles.container}>
                <BreedsComparisonTable breeds={[breed.item]} />
                <div className={styles.footer}>
                    <NavLink to="/home" className={styles.navLink}>
                        Explore more breeds
                    </NavLink>
                </div>
            </div>
        </main>
    </>;
}

export default BreedDetail;