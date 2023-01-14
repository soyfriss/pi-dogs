import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './BreedsCompare.module.css';
import Loader from './Loader.jsx';
import Header from './Header.jsx';
import Error from './Error.jsx';
import BreedsComparisonTable from './BreedsComparisonTable.jsx';
import { getBreed } from '../integrations/api.js';
import * as errors from '../constants/errors.js';
import * as constants from '../constants/breedsCompare.js';

function BreedsCompare() {
    const checkedBreeds = useSelector(state => state.checkedBreeds);

    const [breeds, setBreeds] = useState({
        items: {},
        status: 'loading',
        error: null
    });

    useEffect(() => {
        console.log('BreedsCompare useEffect() to fetch breeds');
        async function fetchBreed(id, source) {
            try {
                const response = await getBreed(id, `?source=${source}`);

                if (response.ok) {
                    return {
                        item: response.data,
                        status: 'succeeded',
                        error: null
                    };
                } else {
                    console.log('response: ', response);
                    return {
                        item: {},
                        status: 'failed',
                        error: response.error
                    };
                }
            } catch (error) {
                return {
                    item: {},
                    status: 'failed',
                    error: {
                        message: errors.DEFAULT_ERROR_MESSAGE,
                        status: errors.DEFAULT_ERROR_STATUS
                    }
                };
            }
        }

        async function fetchBreeds() {
            const detailedBreeds = [];
            let detailedBreed = {};
            let status = 'succeeded';
            let error = null;
            for (const breed of checkedBreeds) {
                detailedBreed = await fetchBreed(breed.id, breed.source);

                if (detailedBreed.status === 'failed') {
                    status = detailedBreed.status;
                    error = detailedBreed.error;
                    break;
                }

                detailedBreeds.push(detailedBreed.item);


            }

            if (status === 'succeeded') {
                setBreeds({
                    items: detailedBreeds,
                    status: 'succeeded',
                    error: null
                });
            } else {
                setBreeds({
                    items: [],
                    status,
                    error
                })
            }
        }

        fetchBreeds();

    }, [checkedBreeds]);

    if (breeds.status === 'loading') {
        return <>
            <Header />
            <main>
                <Loader />;
            </main>
        </>;
    }

    if (breeds.status === 'failed') {
        return <>
            <Header />
            <main>
                <Error title='Oops!' message={breeds.error.message} />;
            </main>
        </>;
    }

    if (breeds.status === 'succeeded' && breeds.items.length === 0) {
        return <>
            <Header />
            <main>
                <Error title='Oops!' message={constants.NO_CHECKED_BREEDS} />;
            </main>
        </>;
    }

    return <>
        <Header />
        <main className={styles.main}>
            <div className={styles.container}>
                <BreedsComparisonTable breeds={breeds.items} />
                <div className={styles.footer}>
                    <NavLink to="/home" className={styles.navLink}>
                        Explore more breeds
                    </NavLink>
                </div>
            </div>
        </main>
    </>;
}

export default BreedsCompare;