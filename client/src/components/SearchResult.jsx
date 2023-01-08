import React from 'react';
import { useSelector } from 'react-redux';
import styles from './SearchResult.module.css';

function SearchResult({ totalBreeds }) {
    const searchedText = useSelector(state => state.searchText);

    let searchedTextToShow = searchedText ? searchedText : 'All breeds';
    if (searchedText.length === 1) {
        searchedTextToShow = `Breeds with letter ${searchedText.toUpperCase()}`;
    }

    let searchResult;
    if (totalBreeds === 0) {
        searchResult = 'No breeds found';
    } else if (totalBreeds === 1) {
        searchResult = '1 breed found';
    } else {
        searchResult = `${totalBreeds} breeds found`;
    }

    return <>
        <div className={styles.container}>
            <p className={styles.searchedText}>{searchedTextToShow}</p>
            <p className={styles.searchResult}>{searchResult}</p>
        </div>
    </>
}

export default SearchResult;
