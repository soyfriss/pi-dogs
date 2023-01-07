import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styles from './CreateBreed.module.css';
import InputRange from './InputRange.jsx';
import Input from './Input.jsx';
import Select from './Select.jsx';
import { createBreed, fetchTemperaments } from '../redux/actions.js';
import Loader from './Loader.jsx';
import Error from './Error.jsx';
import Header from './Header.jsx';
import * as constants from '../constants/createBreed.js';

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
    });
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [selectedTemperaments, setSelectedTemperaments] = useState([]);
    const temperaments = useSelector(state => state.temperaments.items);
    const fetchTemperamentsStatus = useSelector(state => state.temperaments.status);
    const fetchTemperamentsError = useSelector(state => state.temperaments.error);
    const status = useSelector(state => state.newBreed.status);
    const error = useSelector(state => state.newBreed.error);
    const createdBreed = useSelector(state => state.newBreed.item);

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

    const handleSubmit = (event) => {
        console.log('handleSubmit()', event);
        event.preventDefault();
        // Create new breed
        if (breed.nameError === '' &&
            breed.heightError === '' &&
            breed.weightError === '' &&
            breed.lifeSpanError === ''
        ) {
            console.log('Creating new breed: ', breed);
            const newBreed = {
                name: breed.name,
                height: `${breed.heightMin} - ${breed.heightMax}`,
                weight: `${breed.weightMin} - ${breed.weightMax}`,
                life_span: (breed.lifeSpanMin && breed.lifeSpanMax) ? `${breed.lifeSpanMin} - ${breed.lifeSpanMax}` : '',
                temperaments: getSelectedTemperaments()
            }

            dispatch(createBreed(newBreed));
        }

    }

    useEffect(() => {
        console.log('CreateBreed useEffect() to fetch temperaments');
        if (fetchTemperamentsStatus === 'idle') {
            dispatch(fetchTemperaments());
        }
    }, [fetchTemperamentsStatus, dispatch]);

    useEffect(() => {
        console.log('CreateBreed useEffect()');
        if (breed.nameError === '' &&
            breed.heightError === '' &&
            breed.weightError === '' &&
            breed.lifeSpanError === ''
        ) {
            return setIsSubmitDisabled(false);
        }

        setIsSubmitDisabled(true);
    }, [breed.nameError, breed.heightError, breed.weightError, breed.lifeSpanError])

    const getSelectedTemperaments = () => {
        const temperaments = [];
        for (const temperament of selectedTemperaments) {
            temperaments.push(temperament.name);
        }

        return temperaments;
    }

    const onChangeSelect = (id, action) => {
        console.log('onChangeSelect', id, action);
        if (action === 'add') {
            const temperament = temperaments.find(t => t.id === id);
            setSelectedTemperaments(old => [...old, temperament]);
        } else if (action === 'remove') {
            setSelectedTemperaments(selectedTemperaments.filter(t => t.id !== id));
        }
    }

    if (fetchTemperamentsStatus === 'failed') {
        return <>
            <Header />
            <main>
                <Error title='Oops!' message={fetchTemperamentsError.message} />
            </main>
        </>;
    }

    if (status === 'creating' || fetchTemperamentsStatus === 'loading') {
        return <>
            <Header />
            <main>
                <Loader />;
            </main>
        </>;
    }

    if (status === 'failed') {
        return <>
            <Header />
            <main>
                <Error title='Oops!' message={error.message} />;
            </main>
        </>;
    }

    if (status === 'succeeded') {
        return <Redirect
            to={{
                pathname: `/breed/${createdBreed.id}`,
                search: `?source=${createdBreed.source}`,
                state: { clearCreateBreedStatus: true, title: 'Your newly created breed' }
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
                                value={breed.name}
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
                                minValue={breed.lifeSpanMin}
                                maxValue={breed.lifeSpanMax}
                                onChange={handleRangeChange}
                            />
                        </div>
                        <div>
                            <InputRange
                                name="height"
                                label="Height (cm)"
                                isRequired={true}
                                minValue={breed.heightMin}
                                maxValue={breed.heightMax}
                                validRange={constants.VALID_RANGE_HEIGHT}
                                onChange={handleRangeChange}
                            />
                        </div>
                        <div>
                            <InputRange
                                name="weight"
                                label="Weight (Kg)"
                                isRequired={true}
                                minValue={breed.weightMin}
                                maxValue={breed.weightMax}
                                validRange={constants.VALID_RANGE_WEIGHT}
                                onChange={handleRangeChange}
                            />
                        </div>
                        <div className={styles.fullWidth}>
                            <Select
                                label="Temperaments"
                                minItemsSelected={constants.MIN_TEMPERAMENTS}
                                maxItemsSelected={constants.MAX_TEMPERAMENTS}
                                items={selectedTemperaments}
                                onChange={onChangeSelect}
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