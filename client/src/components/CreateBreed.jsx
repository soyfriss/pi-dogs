import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styles from './CreateBreed.module.css';
import InputRange from './InputRange.jsx';
import Input from './Input.jsx';
import Select from './Select.jsx';
import { fetchTemperaments, fetchBreeds } from '../redux/actions.js';
import Loader from './Loader.jsx';
import Error from './Error.jsx';
import Header from './Header.jsx';
import * as constants from '../constants/createBreed.js';
import { postBreed } from '../redux/api.js';

function CreateBreed() {
    const dispatch = useDispatch();

    const [breed, setBreed] = useState({
        name: '',
        nameError: '',
        heightMin: '',
        heightMax: '',
        heightError: 'error',
        weightMin: '',
        weightMax: '',
        weightError: 'error',
        lifeSpanMin: '',
        lifeSpanMax: '',
        lifeSpanError: '',
        temperaments: [],
        temperamentsError: 'error'
    });
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    // const [selectedTemperaments, setSelectedTemperaments] = useState([]);
    const [newBreed, setNewBreed] = useState({
        status: 'idle',
        error: null,
        item: {}
    });
    // const temperaments = useSelector(state => state.temperaments.items);
    const fetchTemperamentsStatus = useSelector(state => state.temperaments.status);
    const fetchTemperamentsError = useSelector(state => state.temperaments.error);

    const handleRangeChange = (name, min, max, error) => {
        setBreed({
            ...breed,
            [`${name}Min`]: min,
            [`${name}Max`]: max,
            [`${name}Error`]: error,
        });
    }

    const handleNameChange = (name, value, error) => {
        setBreed({
            ...breed,
            [name]: value,
            [`${name}Error`]: error,
        })
    }

    const handleSelectChange = (temperaments, error) => {
        console.log('handleSelectChange: ', temperaments, error);
        setBreed({
            ...breed,
            temperaments,
            temperamentsError: error
        })
    }

    const handleSubmit = (event) => {
        // console.log('handleSubmit()', event);
        event.preventDefault();
        // Create new breed
        if (breed.nameError === '' &&
            breed.heightError === '' &&
            breed.weightError === '' &&
            breed.lifeSpanError === '' &&
            breed.temperamentsError === ''
        ) {
            const newBreed = {
                name: breed.name,
                height: `${breed.heightMin} - ${breed.heightMax}`,
                weight: `${breed.weightMin} - ${breed.weightMax}`,
                life_span: (breed.lifeSpanMin && breed.lifeSpanMax) ? `${breed.lifeSpanMin} - ${breed.lifeSpanMax}` : '',
                temperaments: breed.temperaments.map(t => t.name)
            }

            createBreed(newBreed);
        }
    }

    const createBreed = async (breed) => {
        try {
            const response = await postBreed(breed);
            console.log('New breed created: ', response.data);
            setNewBreed({
                status: 'succeeded',
                error: null,
                item: response.data
            });
        } catch (error) {
            setNewBreed({
                status: 'failed',
                error: {
                    message: error.response.data,
                    status: error.response.status
                }
            });
        }
    }

    useEffect(() => {
        console.log('CreateBreed useEffect() to fetch temperaments');
        if (fetchTemperamentsStatus === 'idle') {
            dispatch(fetchTemperaments());
        }
    }, [fetchTemperamentsStatus, dispatch]);

    useEffect(() => {
        console.log('CreateBreed useEffect() to validate form');
        if (breed.nameError === '' &&
            breed.heightError === '' &&
            breed.weightError === '' &&
            breed.lifeSpanError === '' &&
            breed.temperamentsError === ''
        ) {
            return setIsSubmitDisabled(false);
        }

        setIsSubmitDisabled(true);
    }, [breed.nameError, breed.heightError, breed.weightError, breed.lifeSpanError, breed.temperamentsError])

    useEffect(() => {
        console.log('CreateBreed useEffect() to view status and newBreed values: ', newBreed.status, newBreed.item);
    }, [newBreed]);

    if (fetchTemperamentsStatus === 'failed') {
        return <>
            <Header />
            <main>
                <Error title='Oops!' message={fetchTemperamentsError.message} />
            </main>
        </>;
    }

    if (newBreed.status === 'creating' || fetchTemperamentsStatus === 'loading') {
        return <>
            <Header />
            <main>
                <Loader />;
            </main>
        </>;
    }

    if (newBreed.status === 'failed') {
        return <>
            <Header />
            <main>
                <Error title='Oops!' message={newBreed.error.message} />;
            </main>
        </>;
    }

    if (newBreed.status === 'succeeded') {
        console.log('newBreed after succeeded: ', newBreed.item);
        dispatch(fetchBreeds(true));

        return <Redirect
            to={{
                pathname: `/breed/${newBreed.item.id}`,
                search: `?source=${newBreed.item.source}`,
                state: {title: 'Your newly created breed'}
            }}
        />
    }

    return <>
        {console.log('Rendering CreateBreed')}
        <Header />
        <main>
            <div className={styles.section}>
                <p className={styles.title}>New breed</p>
                <div className={styles.body}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div>
                            <Input
                                name="name"
                                label="Name"
                                maxLength={constants.MAX_LENGTH_NAME}
                                isRequired={true}
                                onChange={handleNameChange}
                            />
                        </div>
                        <div>
                            <InputRange
                                name="lifeSpan"
                                label="Life span (years)"
                                isRequired={false}
                                onChange={handleRangeChange}
                            />
                        </div>
                        <div>
                            <InputRange
                                name="height"
                                label="Height (cm)"
                                isRequired={true}
                                validRange={constants.VALID_RANGE_HEIGHT}
                                onChange={handleRangeChange}
                            />
                        </div>
                        <div>
                            <InputRange
                                name="weight"
                                label="Weight (Kg)"
                                isRequired={true}
                                validRange={constants.VALID_RANGE_WEIGHT}
                                onChange={handleRangeChange}
                            />
                        </div>
                        <div className={styles.fullWidth}>
                            <Select
                                label="Temperaments"
                                minItemsSelected={constants.MIN_TEMPERAMENTS}
                                maxItemsSelected={constants.MAX_TEMPERAMENTS}
                                onChange={handleSelectChange}
                            />
                        </div>
                        <div className={styles.fullWidth}>
                            <button
                                type="submit"
                                className={`${styles.btn} ${isSubmitDisabled && styles.btnDisabled}`}
                                disabled={isSubmitDisabled}
                            >
                                CREATE
                            </button>

                        </div>
                    </form>
                </div>
            </div >
        </main>
    </>;
}

export default CreateBreed;