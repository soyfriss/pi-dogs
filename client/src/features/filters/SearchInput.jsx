import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styles from './SearchInput.module.css';
import icon from '../../images/search-icon.png';
import { fetchBreeds, changeCurrentPage } from '../breeds/breedsActions.js';
import { changeSearchText, changeCurrentFilterPage } from './filtersActions.js';
import * as constants from '../../common/constants/searchInput.js';

function SearchInput() {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const oldSearchText = useSelector(state => state.filters.searchText);

    useEffect(() => {
        setSearchText(oldSearchText);
    }, [oldSearchText]);

    const handleFetchBreeds = () => {
        dispatch(changeSearchText(searchText.trim()));
        dispatch(fetchBreeds());
        dispatch(changeCurrentPage(1));
        dispatch(changeCurrentFilterPage(1));
    }

    return <>
        <div className={styles.container}>
            <input
                type="text"
                className={styles.input}
                placeholder="Search breeds"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleFetchBreeds()
                }}
                maxLength={constants.SEARCH_INPUT_MAX_LENGTH}
            />
            <button
                type="button"
                className={styles.submit}
                onClick={handleFetchBreeds}
            >
                <img src={icon} className={styles.icon} alt="search" />
            </button>
        </div>
    </>;
}

export default SearchInput;
