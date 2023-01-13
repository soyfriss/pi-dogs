// const {setTimeout} = require('timers/promises');
const {
    getBreeds: getBreedsFromDB,
    getBreed: getBreedFromDB,
    createBreed: createBreedFromDB,
    breedExists: breedExistsInDB
} = require('../integrations/breed.js');
const {
    getBreeds: getBreedsFromApi,
    getBreed: getBreedFromApi,
    breedExists: breedExistsInAPI
} = require('../integrations/theDogApi.js');
const { findOrCreateTemperaments, getTemperament } = require('./temperament.js');
const AppError = require('../utils/AppError.js');
const httpStatusCodes = require('../utils/httpStatusCodes.js');
const constants = require('../utils/constants.js');


const getBreeds = async (name, exactSearch = false) => {

    let breeds;

    // Get breeds from DB
    const breedsFromDB = await getBreedsFromDB(name, exactSearch);

    // Get breeds from thedogapi
    const breedsFromApi = await getBreedsFromApi(name, exactSearch);

    breeds = [...breedsFromDB, ...breedsFromApi];
    // console.log('breeds from services: ', breeds);

    if (name && breeds.length === 0) {
        throw new AppError(`${name} breed not found`, httpStatusCodes.NOT_FOUND);
    }

    return breeds;
}

const getBreed = async (id, source) => {
    // 'source' validation
    if (source !== 'local' && source !== 'external') {
        throw new AppError('Source value is invalid', httpStatusCodes.BAD_REQUEST);
    }

    let breed;

    // Get breed from DB
    if (source === 'local') {
        breed = await getBreedFromDB(id);
    }

    // Get breed from external API
    if (source === 'external') {
        breed = await getBreedFromApi(id);
    }

    if (!breed) {
        throw new AppError(`Breed with id ${id} not found`, httpStatusCodes.NOT_FOUND);
    }

    // // Test: add delay
    // console.log('Before delay');
    // await setTimeout(20000);
    // console.log('After delay');
    
    return breed;       
}

const createBreed = async (name, height, weight, lifeSpan, temperaments, image) => {
    // Validations
    const hasValidationRange = (range) => {
        return !!(range[0] || range[1]);
    }

    const validateRange = (value, isRequired, validationRange) => {
        // Is required?
        if (isRequired && !value.trim()) {
            return `${constants.FIELD_REQUIRED}`;
        }

        // Is not required?
        if (!isRequired && !value.trim()) {
            return '';
        }

        let [min, max] = value.trim().split(' - ');
        // console.log('Validating range: ', min, max);

        if (isRequired && (!min.length && !max.length)) {
            return `${constants.FIELD_REQUIRED}`;
        }

        // Valid numbers?
        // console.log('valid numbers? ', Number.isNaN(Number(min)), Number.isNaN(Number(max)));
        if (Number.isNaN(Number(min)) || Number.isNaN(Number(max))) {
            return `${constants.INVALID_DATA}`;
        }

        const minValue = Number(min);
        const maxValue = Number(max);

        if (minValue > maxValue) {
            return `${constants.INVALID_RANGE} (min > max)`;
        }
        if (hasValidationRange(validationRange) && (minValue < validationRange[0] || maxValue > validationRange[1])) {
            return `${constants.INVALID_RANGE} (valid range: ${validationRange[0]} - ${validationRange[1]})`;
        }

        return '';
    }

    // name
    if (!name) {
        throw new AppError(`name: ${constants.FIELD_REQUIRED}`, httpStatusCodes.BAD_REQUEST);
    }
    if (name.length > constants.MAX_LENGTH_NAME) {
        throw new AppError(`name: ${constants.MAX_LENGTH_EXCEEDED} (max: ${constants.MAX_LENGTH_NAME})`, httpStatusCodes.BAD_REQUEST);
    }

    // Ranges
    let error = '';

    // height
    error = validateRange(height, true, constants.VALID_RANGE_HEIGHT);
    if (error) {
        throw new AppError(`height: ${error}`, httpStatusCodes.BAD_REQUEST);
    }

    // weight
    error = validateRange(weight, true, constants.VALID_RANGE_WEIGHT);
    if (error) {
        throw new AppError(`weight: ${error}`, httpStatusCodes.BAD_REQUEST);
    }

    // lifeSpan
    error = validateRange(lifeSpan, false, constants.NO_RANGE);
    if (error) {
        throw new AppError(`lifeSpan: ${error}`, httpStatusCodes.BAD_REQUEST);
    }

    // temperaments
    if (Array.isArray(temperaments)) {
        for (let temperament of temperaments) {
            // temperament type
            if (typeof temperament !== 'string') {
                throw new AppError(`${temperament}: ${constants.INCORRECT_TYPE}`, httpStatusCodes.BAD_REQUEST);
            }
            // Empty temperament
            if (!temperament) {
                throw new AppError(`temperaments: ${constants.EMPTY_ITEM_IN_LIST}`, httpStatusCodes.BAD_REQUEST);
            }
            // Verify if temperament exists
            const temperamentInDB = await getTemperament(temperament.trim());
            console.log('temperamentInDB: ', temperamentInDB);

            if (!temperamentInDB) {
                throw new AppError(`${temperament}: ${constants.TEMPERAMENT_NOT_IN_LIST}`, httpStatusCodes.BAD_REQUEST);
            }
        }
    } else {
        if (temperaments) {
            throw new AppError(`temperaments: ${constants.INCORRECT_TYPE}`, httpStatusCodes.BAD_REQUEST);
        }
    }

    // image
    if (image && !(/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(image.toLowerCase()))) {
        throw new AppError(`image: ${constants.INVALID_DATA}`, httpStatusCodes.BAD_REQUEST);
    }

    // End validations

    // Create new temperaments
    const temperamentsList = await findOrCreateTemperaments(temperaments);
    // console.log('newTemperaments', temperamentsList);

    // Create breed
    const newBreed = await createBreedFromDB(
        name.toUpperCase(),
        height,
        weight,
        lifeSpan,
        temperamentsList,
        image
    );

    return await getBreedFromDB(newBreed.dataValues.id);
}

module.exports = {
    getBreeds,
    getBreed,
    createBreed,
}
