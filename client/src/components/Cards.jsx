import React from 'react';
import styles from './Cards.module.css';
import Card from './Card.jsx';
import useMediaQuery from '../hooks/useMediaQuery.js';

function Cards({ breeds }) {
    let nbColumns = 1;
    if (useMediaQuery('(min-width: 769px)')) {
        nbColumns = 2;
    }
    if (useMediaQuery('(min-width: 1025px)')) {
        nbColumns = 4;
    }

    let orderedBreeds = masonryOrder(breeds, nbColumns);

    return <>
        {console.log('Cards number of columns: ', nbColumns)}
        <div className={styles.container}>
            {orderedBreeds.map(breed => (
                <Card key={`${breed.id}-${breed.name}`} breed={breed} />
            ))}
        </div>
    </>
}

function masonryOrder(breeds, columns) {
    if (columns === 1) {
        return [...breeds];
    }

    const breedsPerPage = 8;
    const breedsFilled = [...breeds];
    if (breedsFilled.length < breedsPerPage) {
        for (let i = breeds.length; i < breedsPerPage; i++) {
            const breed = {}
            breed.id = 100000 + i;
            breed.name = 'name';
            breed.weight = ''
            breed.notVisible = true;
            breedsFilled.push(breed);
        }
    }

    const result = [];
    
    let index;
    // console.log('breeds before masonry order: ', breedsFilled);



    for (let c = 0; c < columns; c++) {
        for (let i = 0; i < breedsFilled.length; i++) {
            index = (columns * i) + c;
            console.log('index: ', index);
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