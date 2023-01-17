import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styles from './CreateBreed.module.css';
import InputRange from '../features/ui/InputRange.jsx';
import Input from '../features/ui/Input.jsx';
import Select from '../features/ui/Select.jsx';
import Loader from '../features/ui/Loader.jsx';
import Error from '../features/ui/Error.jsx';
import Header from '../features/ui/Header.jsx';
import { fetchTemperaments } from '../features/filters/temperamentsActions.js';
import { fetchBreeds } from '../features/breeds/breedsActions.js';
import * as constants from '../common/constants/createBreed.js';
import * as errors from '../common/constants/errors.js';
import { postBreed, getBreeds } from '../common/integrations/api.js';

function CreateBreed() {
    const dispatch = useDispatch();

    const [breed, setBreed] = useState({
        name: '',
        nameError: '',
        breedExistsError: '',
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
        temperamentsError: 'error',
        image: '',
        imageError: '',
        imageUrlError: ''
    });
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    // const [selectedTemperaments, setSelectedTemperaments] = useState([]);
    const [newBreed, setNewBreed] = useState({
        status: 'idle',
        error: null,
        errorCount: 0,
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
            breedExistsError: ''
        })
    }

    const handleImageChange = (name, value, error) => {
        setBreed({
            ...breed,
            [name]: value,
            [`${name}Error`]: error,
            imageUrlError: value ? (isImgUrlOK(value) ? '' : errors.INVALID_DATA) : ''
        })
    }

    const handleSelectChange = (temperaments, error) => {
        // console.log('handleSelectChange: ', temperaments, error);
        setBreed({
            ...breed,
            temperaments,
            temperamentsError: error
        })
    }

    const isBreedOK = async (value) => {
        try {
            const response = await getBreeds(value, true);

            // console.log('checkBreedName breed exists ?: ', response.data);

            if (response.ok && response.data) {
                return false;
            }

            return true;
        } catch (error) {
            return true;
        }
    };

    const isImgUrlOK = (url) => {
        console.log('isImgUrlOK: ', /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url.toLowerCase()));
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url.toLowerCase());
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // console.log('handle submit called');

        // Validate data
        if (breed.nameError !== '' ||
            breed.heightError !== '' ||
            breed.weightError !== '' ||
            breed.lifeSpanError !== '' ||
            breed.temperamentsError !== '' ||
            breed.imageUrlError !== '' ||
            breed.imageError !== ''
        ) {
            console.log('data with errors: ', breed);
            return;
        }

        setNewBreed(breed => ({
            ...breed,
            status: 'creating'
        }));

        // breed exists ?
        // console.log('handleSubmit breed exists?');
        if (!await isBreedOK(breed.name)) {
            // console.log('breed exists');
            setBreed(breed => ({
                ...breed,
                breedExistsError: constants.BREED_EXISTS_MESSAGE
            }));

            // console.log('setting new breed status to idle');
            setNewBreed(breed => ({
                ...breed,
                status: 'idle'
            }));

            return;
        }

        createBreed({
            name: breed.name,
            height: `${breed.heightMin} - ${breed.heightMax}`,
            weight: `${breed.weightMin} - ${breed.weightMax}`,
            lifeSpan: (breed.lifeSpanMin && breed.lifeSpanMax) ? `${breed.lifeSpanMin} - ${breed.lifeSpanMax}` : '',
            temperaments: breed.temperaments.map(t => t.name),
            image: breed.image
        });
    }

    const createBreed = async (breed) => {
        try {
            const response = await postBreed(breed);

            if (response.ok) {
                // console.log('New breed created: ', response.data);
                setNewBreed({
                    status: 'succeeded',
                    item: response.data,
                    error: null
                });
            } else {
                setNewBreed(breed => ({
                    status: 'failed',
                    item: {},
                    error: response.error,
                    errorCount: breed.errorCount + 1
                }));
            }
        } catch (error) {
            setNewBreed(breed => ({
                status: 'failed',
                item: {},
                error: {
                    message: errors.DEFAULT_ERROR_MESSAGE,
                    status: errors.DEFAULT_ERROR_STATUS
                },
                errorCount: breed.errorCount + 1
            }));
        }
    }

    useEffect(() => {
        // console.log('CreateBreed useEffect()');
        if (fetchTemperamentsStatus === 'idle') {
            dispatch(fetchTemperaments());
        }
    }, [fetchTemperamentsStatus, dispatch]);

    useEffect(() => {
        // console.log('CreateBreed useEffect() to validate form');
        if (breed.nameError === '' &&
            breed.heightError === '' &&
            breed.weightError === '' &&
            breed.lifeSpanError === '' &&
            breed.temperamentsError === '' &&
            breed.breedExistsError === '' &&
            breed.imageError === '' &&
            breed.imageUrlError === ''
        ) {
            return setIsSubmitDisabled(false);
        }

        setIsSubmitDisabled(true);
    }, [breed.nameError, breed.heightError, breed.weightError, breed.lifeSpanError, breed.temperamentsError, breed.breedExistsError, breed.imageError, breed.imageUrlError])

    useEffect(() => {
        // console.log('CreateBreed useEffect() to view status and newBreed values: ', newBreed.status, newBreed.item);
    }, [newBreed]);

    // const handleRestartAfterError = () => {
    //     setNewBreed(breed => ({
    //         ...breed,    
    //         status: 'idle',
    //         error: null,
    //         item: {}
    //     }));
    //     // console.log('input', breed);
    // }

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
                <Error title='Oops!' message={newBreed.error.message} />
                {newBreed.errorCount <= constants.MAX_ERROR_COUNT &&
                    <p
                        className={styles.goBackText}
                        onClick={() => {
                            setNewBreed(breed => ({
                                ...breed,
                                status: 'idle',
                                error: null,
                                item: {}
                            }));
                        }}
                    >
                        Go back to the form
                    </p>
                }
            </main>
        </>
    }

    if (newBreed.status === 'succeeded') {
        // console.log('newBreed after succeeded: ', newBreed.item);
        dispatch(fetchBreeds(true));

        return <Redirect
            to={{
                pathname: `/breed/${newBreed.item.id}`,
                search: `?source=${newBreed.item.source}`,
                state: { message: 'Your newly created breed' }
            }}
        />
    }

    return <>
        <Header />
        <main>
            <div className={styles.container}>
                {/* <p className={styles.title}>New breed</p> */}
                <div className={styles.body}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.name}>
                            <Input
                                name="name"
                                label="Name"
                                maxLength={constants.MAX_LENGTH_NAME}
                                isRequired={true}
                                value={breed.name}
                                onChange={handleNameChange}
                                parentError={breed.breedExistsError}
                            />
                        </div>
                        <div className={styles.lifeSpan}>
                            <InputRange
                                name="lifeSpan"
                                label="Life span (years)"
                                isRequired={false}
                                min={breed.lifeSpanMin}
                                max={breed.lifeSpanMax}
                                onChange={handleRangeChange}
                            />
                        </div>
                        <div className={styles.height}>
                            <InputRange
                                name="height"
                                label="Height (cm)"
                                isRequired={true}
                                validRange={constants.VALID_RANGE_HEIGHT}
                                min={breed.heightMin}
                                max={breed.heightMax}
                                onChange={handleRangeChange}
                            />
                        </div>
                        <div className={styles.weight}>
                            <InputRange
                                name="weight"
                                label="Weight (Kg)"
                                isRequired={true}
                                validRange={constants.VALID_RANGE_WEIGHT}
                                min={breed.weightMin}
                                max={breed.weightMax}
                                onChange={handleRangeChange}
                            />
                        </div>
                        <div className={styles.image}>
                            <Input
                                name="image"
                                label="Image URL"
                                isRequired={false}
                                value={breed.image}
                                onChange={handleImageChange}
                                parentError={breed.imageUrlError}
                            />
                        </div>
                        <div className={styles.temperaments}>
                            <Select
                                label="Temperaments"
                                minItemsSelected={constants.MIN_TEMPERAMENTS}
                                maxItemsSelected={constants.MAX_TEMPERAMENTS}
                                value={breed.temperaments}
                                onChange={handleSelectChange}
                            />
                        </div>
                        <div className={styles.submit}>
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
                <div className={styles.infoContainer}>
                    <p><span className="required">*</span> {constants.INFO_REQUIRED_FIELDS}</p>
                    <p>{constants.INFO_ALLOWED_IMAGES_FORMAT}</p>
                </div>
            </div >
        </main>
    </>;
}

export default CreateBreed;