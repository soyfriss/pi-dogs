import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './CreateBreed.module.css';
import InputRange from './InputRange.jsx';
import Input from './Input.jsx';
import { createBreed, clearCreateBreedStatus } from '../redux/actions.js';
import Item from './Item.jsx';
import Loader from './Loader.jsx';
import Error from './Error.jsx';

function CreateBreed() {
    const dispatch = useDispatch();
    const history = useHistory();

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
    const [canShowError, setCanShowError] = useState(true);
    const [canShowNameError, setCanShowNameError] = useState(false);
    const [selectedTemperaments, setSelectedTemperaments] = useState([]);
    const temperaments = useSelector(state => state.temperaments);
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

    const validate = () => {
        if (breed.nameError || breed.heightError || breed.weightError || breed.lifeSpanError) {
            return setIsSubmitDisabled(true);
        }

        setIsSubmitDisabled(false);
    }

    const handleSubmit = (event) => {
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
        dispatch(clearCreateBreedStatus());
    }, [dispatch]);

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

    const handleChangeTemperaments = (event) => {
        console.log(event.target.value);
        const id = Number(event.target.value);
        const temperament = temperaments.find(t => t.id === id);
        setSelectedTemperaments(old => [...old, temperament]);
    }

    const removeSelectedTemperament = (id) => {
        setSelectedTemperaments(selectedTemperaments.filter(t => t.id !== id));
    }

    const getSelectedTemperaments = () => {
        const temperaments = [];
        for (const temperament of selectedTemperaments) {
            temperaments.push(temperament.name);
        }

        return temperaments;
    }

    if (status === 'creating') {
        return <Loader />;
    }

    if (status === 'failed') {
        return <Error title='Oops!' message={error.message} />;
    }

    if (status === 'succeeded') {
        history.push(`/breed/${createdBreed.id}?source=${createdBreed.source}`);
    }

    return <>
        {console.log('Rendering CreateBreed')}
        <div className={styles.section}>
            <p className={styles.title}>New breed</p>
            <div className={styles.body}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div>
                        <Input
                            name="name"
                            value={breed.name}
                            label="Name"
                            isRequired={true}
                            onChange={handleNameChange}
                            canShowError={canShowNameError}
                        />
                    </div>
                    <div>
                        <InputRange
                            name="lifeSpan"
                            label="Life span"
                            isRequired={false}
                            minValue={breed.lifeSpanMin}
                            maxValue={breed.lifeSpanMax}
                            onChange={handleRangeChange}
                            canShowError={canShowError} />
                    </div>
                    <div>
                        <InputRange
                            name="height"
                            label="Height"
                            isRequired={true}
                            minValue={breed.heightMin}
                            maxValue={breed.heightMax}
                            validRange={[5, 200]}
                            onChange={handleRangeChange}
                            canShowError={canShowError} />
                    </div>
                    <div>
                        <InputRange
                            name="weight"
                            label="Weight"
                            isRequired={true}
                            minValue={breed.weightMin}
                            maxValue={breed.weightMax}
                            validRange={[0.5, 150]}
                            onChange={handleRangeChange}
                            canShowError={canShowError} />
                    </div>
                    <div className={styles.fullWidth}>
                        <label className={styles.largeLabel}>Temperaments</label>
                        <select name="temperaments" className={styles.fieldSelect} defaultValue="default" onChange={handleChangeTemperaments}>
                            <option value="default" hidden>
                                Choose temperaments...
                            </option>
                            {temperaments?.filter(t => !selectedTemperaments.some(st => st.id === t.id)).map((temperament) => (
                                <option value={temperament.id} key={temperament.id}>
                                    {temperament.name}
                                </option>
                            ))}
                        </select>
                        <div className={styles.selectedTemperaments}>
                            {selectedTemperaments.map(t => <Item id={t.id} key={t.id} name={t.name} remove={removeSelectedTemperament} />)}
                        </div>
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
    </>;
}

export default CreateBreed;