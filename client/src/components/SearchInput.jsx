import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import icon from '../images/search-icon.png';
import styles from './SearchInput.module.css';
import { useDispatch } from 'react-redux';
import { fetchBreeds, changeSearchText, changeCurrentPage } from '../redux/actions.js';

function SearchInput() {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const oldSearchText = useSelector(state => state.searchText);

    useEffect(() => {
        setSearchText(oldSearchText);
    }, [oldSearchText]);

    const handleFetchBreeds = () => {
        dispatch(changeSearchText(searchText));
        dispatch(fetchBreeds());
        dispatch(changeCurrentPage(1));
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
            />
            <button
                type="submit"
                className={styles.submit}
                onClick={handleFetchBreeds}
            >
                <img src={icon} className={styles.icon} alt="search" />
            </button>
        </div>
    </>;
}

export default SearchInput;
