import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Cards.module.css';
import Card from './Card.jsx';
import Sort from './Sort.jsx';
import Pagination from '../ui/Pagination.jsx';
import Error from '../ui/Error.jsx';
import useMediaQuery from '../../common/hooks/useMediaQuery.js';
import { changeCurrentPage } from './breedsActions.js';
import * as constants from '../../common/constants/cards.js';

function Cards() {
    const dispatch = useDispatch();
    const showCompareBreedCheckbox = useSelector(
        state =>
            state.compareBreeds.items.length < constants.MAX_BREEDS_TO_COMPARE
    );
    const breeds = useSelector(state => state.breeds.items);
    const currentPage = useSelector(state => state.breeds.currentPage);

    const breedsPerPage = constants.BREEDS_PER_PAGE;
    const totalBreeds = breeds.length;
    const indexOfLastBreed = currentPage * breedsPerPage;
    const indexOfFirstBreed = indexOfLastBreed - breedsPerPage;
    const breedsSlice = breeds.slice(indexOfFirstBreed, indexOfLastBreed);

    const setCurrentPage = (value) => {
        dispatch(changeCurrentPage(value));
    }

    let nbColumns = 1;
    if (useMediaQuery('(min-width: 769px)')) {
        nbColumns = 2;
    }
    if (useMediaQuery('(min-width: 1201px)')) {
        nbColumns = 4;
    }

    if (breedsSlice.length === 0) {
        return <Error title='Oops!' message={constants.BREEDS_NOT_FOUND} />;
    }

    return <>
        {breedsSlice.length > 1 &&
            <div className={styles.sort}>
                <Sort />
            </div>
        }

        {nbColumns === 1 &&
            <div className={styles.container}>
                <div className={styles.column}>
                    {breedsSlice.map(breed => {
                        return <Card
                            key={breed.name}
                            breed={breed}
                            showCompareBreedCheckbox={showCompareBreedCheckbox}
                        />
                    })}
                </div>
            </div>
        }

        {nbColumns === 2 &&
            <div className={styles.container}>
                <div className={styles.column}>
                    {breedsSlice.length >= 1 &&
                        <Card
                            key={breedsSlice[0].name}
                            breed={breedsSlice[0]}
                            showCompareBreedCheckbox={showCompareBreedCheckbox}
                        />
                    }
                    {breedsSlice.length >= 3 &&
                        <Card
                            key={breedsSlice[2].name}
                            breed={breedsSlice[2]}
                            showCompareBreedCheckbox={showCompareBreedCheckbox}
                        />
                    }
                    {breedsSlice.length >= 5 &&
                        <Card
                            key={breedsSlice[4].name}
                            breed={breedsSlice[4]}
                            showCompareBreedCheckbox={showCompareBreedCheckbox}
                        />
                    }
                    {breedsSlice.length >= 7 &&
                        <Card
                            key={breedsSlice[6].name}
                            breed={breedsSlice[6]}
                            showCompareBreedCheckbox={showCompareBreedCheckbox}
                        />
                    }
                </div>
                <div className={styles.column}>
                    {breedsSlice.length >= 2 &&
                        <Card
                            key={breedsSlice[1].name}
                            breed={breedsSlice[1]}
                            showCompareBreedCheckbox={showCompareBreedCheckbox}
                        />
                    }
                    {breedsSlice.length >= 4 &&
                        <Card
                            key={breedsSlice[3].name}
                            breed={breedsSlice[3]}
                            showCompareBreedCheckbox={showCompareBreedCheckbox}
                        />
                    }
                    {breedsSlice.length >= 6 &&
                        <Card
                            key={breedsSlice[5].name}
                            breed={breedsSlice[5]}
                            showCompareBreedCheckbox={showCompareBreedCheckbox}
                        />
                    }
                    {breedsSlice.length >= 8 &&
                        <Card
                            key={breedsSlice[7].name}
                            breed={breedsSlice[7]}
                            showCompareBreedCheckbox={showCompareBreedCheckbox}
                        />
                    }
                </div>
            </div>
        }

        {nbColumns === 4 &&
            <div className={styles.container}>
                <div className={styles.column}>
                    {breedsSlice.length >= 0 &&
                        <Card
                            key={breedsSlice[0].name}
                            breed={breedsSlice[0]}
                            showCompareBreedCheckbox={showCompareBreedCheckbox}
                        />
                    }
                    {breedsSlice.length >= 5 &&
                        <Card
                            key={breedsSlice[4].name}
                            breed={breedsSlice[4]}
                            showCompareBreedCheckbox={showCompareBreedCheckbox}
                        />
                    }
                </div>
                <div className={styles.column}>
                    {breedsSlice.length >= 2 &&
                        <Card
                            key={breedsSlice[1].name}
                            breed={breedsSlice[1]}
                            showCompareBreedCheckbox={showCompareBreedCheckbox}
                        />
                    }
                    {breedsSlice.length >= 6 &&
                        <Card
                            key={breedsSlice[5].name}
                            breed={breedsSlice[5]}
                            showCompareBreedCheckbox={showCompareBreedCheckbox}
                        />
                    }
                </div>
                <div className={styles.column}>
                    {breedsSlice.length >= 3 &&
                        <Card
                            key={breedsSlice[2].name}
                            breed={breedsSlice[2]}
                            showCompareBreedCheckbox={showCompareBreedCheckbox}
                        />
                    }
                    {breedsSlice.length >= 7 &&
                        <Card
                            key={breedsSlice[6].name}
                            breed={breedsSlice[6]}
                            showCompareBreedCheckbox={showCompareBreedCheckbox}
                        />
                    }
                </div>
                <div className={styles.column}>
                    {breedsSlice.length >= 4 &&
                        <Card
                            key={breedsSlice[3].name}
                            breed={breedsSlice[3]}
                            showCompareBreedCheckbox={showCompareBreedCheckbox}
                        />
                    }
                    {breedsSlice.length >= 8 &&
                        <Card
                            key={breedsSlice[7].name}
                            breed={breedsSlice[7]}
                            showCompareBreedCheckbox={showCompareBreedCheckbox}
                        />
                    }
                </div>
            </div>
        }

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

    </>
}

// function sortMasonryLayout(breeds, columns) {
//     if (columns === 1) {
//         return [...breeds];
//     }

//     // Case when breeds < breeds per page
//     // Fill with empty cards up to breedsPerPage, so the cards are ordered correctly
//     // const breedsPerPage = 8;
//     const breedsFilled = [...breeds];
//     if (breedsFilled.length < constants.BREEDS_PER_PAGE) {
//         for (let i = breeds.length; i < constants.BREEDS_PER_PAGE; i++) {
//             const breed = {}
//             breed.id = 0;
//             breed.name = `${breeds[breeds.length - 1].name} #${i}`;
//             breed.weight = ''
//             breed.notVisible = true;
//             breedsFilled.push(breed);
//         }
//     }

//     // Algorithm to reorder cards 
//     const result = [];
//     let index;
//     for (let c = 0; c < columns; c++) {
//         for (let i = 0; i < breedsFilled.length; i++) {
//             index = (columns * i) + c;
//             // console.log('index: ', index);
//             if (index < breedsFilled.length) {
//                 result.push(breedsFilled[index])
//             } else {
//                 break;
//             }
//         }
//     }
//     // console.log('masonryOrder: ', result);

//     return result;
// }

export default Cards;