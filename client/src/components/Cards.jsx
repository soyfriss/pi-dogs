import React from 'react';
import styles from './Cards.module.css';
import Card from './Card.jsx';
import useMediaQuery from '../hooks/useMediaQuery.js';

function Cards({ breeds }) {
    const isTwoColumns = useMediaQuery('(max-width: 1024px)');

    let orderedBreeds = masonryOrder(breeds, isTwoColumns ? 2 : 4);

    return <>
        {console.log('Cards isTwoColumns: ', isTwoColumns)}
        <div className={styles.container}>
            {orderedBreeds.map(breed => (
                <Card key={`${breed.id}-${breed.name}`} breed={breed} />
            ))}
        </div>
    </>
}

function masonryOrder(breeds, columns) {
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
    console.log('breeds before masonry order: ', breedsFilled);



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

    console.log('masonryOrder: ', result);

    return result;
}

export default Cards;