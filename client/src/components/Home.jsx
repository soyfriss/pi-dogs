import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Home.module.css';
import SearchInput from './SearchInput.jsx';
import Filters from './Filters.jsx';
import Cards from './Cards.jsx';
import Sort from './Sort.jsx';
import Pagination from './Pagination.jsx';
import Loader from './Loader.jsx';
import Error from './Error.jsx';
import { fetchBreeds, fetchTemperaments } from '../redux/actions.js';

function Home() {
    const dispatch = useDispatch();
    const breeds = useSelector(state => state.breeds.items);
    const fetchStatus = useSelector(state => state.breeds.status);
    const error = useSelector(state => state.breeds.error);
    const currentPage = useSelector(state => state.currentPage)

    useEffect(() => {
        console.log('Home useEffect()');
        if (fetchStatus === 'idle')
            dispatch(fetchBreeds());
        // dispatch(fetchTemperaments());
    }, [fetchStatus, dispatch]);

    console.log('Rendering Home');
    const breedsPerPage = 8;
    const totalBreeds = breeds.length;

    const indexOfLastBreed = currentPage * breedsPerPage;
    const indexOfFirstBreed = indexOfLastBreed - breedsPerPage;
    const filterBreeds = breeds.slice(indexOfFirstBreed, indexOfLastBreed);
    // console.log(indexOfFirstBreed, indexOfLastBreed);

    if (fetchStatus === 'loading') {
        return <Loader />;
    }

    if (fetchStatus === 'failed') {
        return <Error title='Oops!' message={error.message} />;
    }

    return <>
        <SearchInput />
        <div className={styles.content}>
            <div className={styles.filters}>
                <Filters />
            </div>
            <div className={styles.cards}>
                <Sort />
                <Cards breeds={filterBreeds} />
                {totalBreeds > breedsPerPage && (
                    <Pagination
                        totalBreeds={totalBreeds}
                        breedsPerPage={breedsPerPage}
                    />
                )}
            </div>
        </div>
    </>;
}

export default Home;