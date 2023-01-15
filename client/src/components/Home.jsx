import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Home.module.css';
import SearchInput from './SearchInput.jsx';
import Filters from './Filters.jsx';
import Cards from './Cards.jsx';
import Sort from './Sort.jsx';
import Pagination from './Pagination.jsx';
import Loader from './Loader.jsx';
import Error from './Error.jsx';
import Header from './Header.jsx';
import CheckedBreeds from './CheckedBreeds.jsx';
import { fetchBreeds, fetchTemperaments, changeCurrentPage } from '../redux/actions.js';
import * as constants from '../constants/home.js';

function Home() {
    const dispatch = useDispatch();
    const breeds = useSelector(state => state.breeds.items);
    const fetchBreedsStatus = useSelector(state => state.breeds.status);
    const fetchBreedsError = useSelector(state => state.breeds.error);
    const fetchTemperamentsStatus = useSelector(state => state.temperaments.status);
    const fetchTemperamentsError = useSelector(state => state.temperaments.error);
    const currentPage = useSelector(state => state.pagination.currentPage);

    useEffect(() => {
        console.log('Home useEffect()');
        if (fetchBreedsStatus === 'idle') {
            dispatch(fetchBreeds());
        }
        if (fetchTemperamentsStatus === 'idle') {
            dispatch(fetchTemperaments());
        }
    }, [fetchBreedsStatus, fetchTemperamentsStatus, dispatch]);

    console.log('Rendering Home');
    const breedsPerPage = constants.BREEDS_PER_PAGE;
    const totalBreeds = breeds.length;

    const indexOfLastBreed = currentPage * breedsPerPage;
    const indexOfFirstBreed = indexOfLastBreed - breedsPerPage;
    const filterBreeds = breeds.slice(indexOfFirstBreed, indexOfLastBreed);
    // console.log(indexOfFirstBreed, indexOfLastBreed);

    const setCurrentPage = (value) => {
        dispatch(changeCurrentPage(value));
    }

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
                    {breeds.length > 1 &&
                        <div className={styles.sort}>
                            <Sort />
                        </div>
                    }
                    <Cards breeds={filterBreeds} />
                </div>
                <div className={styles.pagination}>
                    {totalBreeds > breedsPerPage && (
                        <Pagination
                            totalItems={totalBreeds}
                            itemsPerPage={breedsPerPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    )}
                </div>
            </div>
        </main>
    </>;
}

export default Home;