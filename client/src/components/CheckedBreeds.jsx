import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
    uncheckBreed,
    uncheckAllBreeds,
    collapseCheckedBreeds,
    expandCheckedBreeds
} from '../redux/actions';
import styles from './CheckedBreeds.module.css';
import Item from './Item.jsx';
import * as constants from '../constants/cards.js'

function CheckedBreeds() {
    const dispatch = useDispatch();
    const breeds = useSelector(state => state.checkedBreeds);
    const isCollapsed = useSelector(state => state.isCheckedBreedsCollapsed)

    const handleRemove = (id, source) => {
        dispatch(uncheckBreed(id, source));
    }

    const handleClearAll = () => {
        dispatch(uncheckAllBreeds());
    }

    const handleCollapse = () => {
        if (isCollapsed) {
            dispatch(expandCheckedBreeds());
        } else {
            dispatch(collapseCheckedBreeds());
        }
    }

    if (!breeds.length) {
        return <></>;
    }

    return <>
        <p className={styles.filterTitle} onClick={handleCollapse}>COMPARE ({`${breeds.length} / ${constants.MAX_BREEDS_TO_COMPARE}`}) <span className={styles.collapse}>{isCollapsed ? '[+]' : '[-]'}</span></p>
        {!isCollapsed &&
            <>
                <div className={styles.container}>
                    {breeds.map(breed =>
                        <Item
                            key={breed.name}
                            id={breed.id}
                            source={breed.source}
                            name={breed.name}
                            remove={handleRemove}
                        />)}
                </div>
                {breeds.length >= 2 &&
                    <div className={styles.buttonsContainer}>
                        <NavLink to="/breeds/compare" className='btn-small'>
                            COMPARE
                        </NavLink>
                        <button type='button' className='btn-small' onClick={handleClearAll}>
                            CLEAR ALL
                        </button>
                    </div>
                }
            </>
        }
    </>
}

export default CheckedBreeds;