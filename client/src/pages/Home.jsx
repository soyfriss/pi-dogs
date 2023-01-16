import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Home.module.css';
import Cards from '../features/breeds/Cards.jsx';
import CheckedBreeds from '../features/compare-breeds/CheckedBreeds.jsx';
import SearchInput from '../features/filters/SearchInput.jsx';
import Filters from '../features/filters/Filters.jsx';
// import Pagination from '../features/ui/Pagination.jsx';
// import Sort from '../features/breeds/Sort.jsx';
import Loader from '../features/ui/Loader.jsx';
import Error from '../features/ui/Error.jsx';
import Header from '../features/ui/Header.jsx';
import { fetchBreeds, fetchTemperaments, changeCurrentPage } from '../common/redux/actions.js';
import * as constants from '../common/constants/home.js';

function Home() {
    const dispatch = useDispatch();
    // const breeds = useSelector(state => state.breeds.items);
    const fetchBreedsStatus = useSelector(state => state.breeds.status);
    const fetchBreedsError = useSelector(state => state.breeds.error);
    const fetchTemperamentsStatus = useSelector(state => state.temperaments.status);
    const fetchTemperamentsError = useSelector(state => state.temperaments.error);

    useEffect(() => {
        // console.log('Home useEffect()');
        if (fetchBreedsStatus === 'idle') {
            dispatch(fetchBreeds());
        }
        if (fetchTemperamentsStatus === 'idle') {
            dispatch(fetchTemperaments());
        }
    }, [fetchBreedsStatus, fetchTemperamentsStatus, dispatch]);

    if (fetchBreedsStatus === 'loading' || fetchTemperamentsStatus === 'loading') {
        return <>
            <Header />
            <main>
                <Loader />;
            </main>
        </>;
    }

    if (fetchBreedsStatus === 'failed') {
        return <>
            <Header />
            <main>
                <div className={styles.searchInput}>
                    <SearchInput />
                </div>
                <Error title='Oops!' message={fetchBreedsError.message} />
            </main>
        </>;
    }

    if (fetchTemperamentsStatus === 'failed') {
        return <>
            <div className={styles.errorContainer}>
                <Header />
                <main>
                    <div className={styles.searchInput}>
                        <SearchInput />
                    </div>
                    <Error title='Oops!' message={fetchTemperamentsError.message} />
                </main>
            </div>
        </>;
    }

    return <>
        <Header />
        <main>
            <div className={styles.searchInput}>
                <SearchInput />
            </div>
            <div className={styles.content}>
                <div className={styles.filters}>
                    <Filters />
                    <CheckedBreeds />
                </div>
                <div className={styles.cards}>
                    <Cards />
                </div>
            </div>
        </main>
    </>;
}

export default Home;