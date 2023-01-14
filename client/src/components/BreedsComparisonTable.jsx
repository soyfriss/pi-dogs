import React from 'react';
import styles from './BreedsComparisonTable.module.css';
import noImage from '../images/no-image.png';
import PlaceholderImg from './PlaceholderImg.jsx';

function BreedsComparisonTable({ breeds }) {
    console.log('BreedsComparisonTable breeds: ', breeds);
    return <>
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {breeds.map(breed => {
                            return <th scope='col' key={breed.name}>
                                <PlaceholderImg
                                    placeholderSrc={noImage}
                                    src={breed.image}
                                    className={styles.img}
                                    alt={`${breed.name} breed`}
                                />
                                <p>{breed.name}</p>
                                {breed.message ? <p className={styles.message}>({breed.message})</p> : ''}
                            </th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr className={styles.mobileColumnGroup}>
                        <th scope="colgroup" colSpan="5"><span>Weight (Kg)</span></th>
                    </tr>
                    <tr>
                        {breeds.map(breed => <td key={breed.name}>{breed.weight ? breed.weight : '-'}</td>)}
                    </tr>

                    <tr className={styles.mobileColumnGroup}>
                        <th scope="colgroup" colSpan="5"><span>Height (cm)</span></th>
                    </tr>
                    <tr>
                        {breeds.map(breed => <td key={breed.name}>{breed.height ? breed.height : '-'}</td>)}
                    </tr>

                    <tr className={styles.mobileColumnGroup}>
                        <th scope="colgroup" colSpan="5"><span>Life Span (years)</span></th>
                    </tr>
                    <tr>
                        {breeds.map(breed => <td key={breed.name}>{breed.lifeSpan ? breed.lifeSpan : '-'}</td>)}
                    </tr>

                    <tr className={styles.mobileColumnGroup}>
                        <th scope="colgroup" colSpan="5"><span>Temperaments</span></th>
                    </tr>
                    <tr>
                        {breeds.map(breed => {
                            return <td key={breed.name}>
                                <div className={styles.temperament}>
                                    {breed.temperament ? breed.temperament : '-'}
                                </div>
                            </td>
                        })}
                    </tr>
                </tbody>
            </table>
        </div>
    </>;
}

export default BreedsComparisonTable;