import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Cards.module.css';
import Card from './Card.jsx';
import useMediaQuery from '../../common/hooks/useMediaQuery.js';
import * as constants from '../../common/constants/cards.js';

function Cards({ breeds }) {
    const showCompareBreedCheckbox = useSelector(state => state.compareBreeds.items.length < constants.MAX_BREEDS_TO_COMPARE);

    let nbColumns = 1;
    if (useMediaQuery('(min-width: 769px)')) {
        nbColumns = 2;
    }
    if (useMediaQuery('(min-width: 1201px)')) {
        nbColumns = 4;
    }

    let orderedBreeds = sortMasonryLayout(breeds, nbColumns);

    return <>
        {/* {console.log('Cards number of columns: ', nbColumns)} */}
        <div className={styles.container}>
            {orderedBreeds.map(breed => (
                <Card
                    key={breed.name}
                    breed={breed}
                    showCompareBreedCheckbox={showCompareBreedCheckbox} />
            ))}
        </div>
    </>
}

function sortMasonryLayout(breeds, columns) {
    if (columns === 1) {
        return [...breeds];
    }

    // Case when breeds < breeds per page
    // Fill with empty cards up to breedsPerPage, so the cards are ordered correctly
    // const breedsPerPage = 8;
    const breedsFilled = [...breeds];
    if (breedsFilled.length < constants.BREEDS_PER_PAGE) {
        for (let i = breeds.length; i < constants.BREEDS_PER_PAGE; i++) {
            const breed = {}
            breed.id = 0;
            breed.name = `${breeds[breeds.length - 1].name} #${i}`;
            breed.weight = ''
            breed.notVisible = true;
            breedsFilled.push(breed);
        }
    }

    // Algorithm to reorder cards 
    const result = [];
    let index;
    for (let c = 0; c < columns; c++) {
        for (let i = 0; i < breedsFilled.length; i++) {
            index = (columns * i) + c;
            // console.log('index: ', index);
            if (index < breedsFilled.length) {
                result.push(breedsFilled[index])
            } else {
                break;
            }
        }
    }
    // console.log('masonryOrder: ', result);

    return result;
}

export default Cards;