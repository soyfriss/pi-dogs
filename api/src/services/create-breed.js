const db = require('../integrations/db/create-breed.js');
const { getBreed } = require('../integrations/db/get-breeds.js');
const { getBreeds } = require('./get-breeds.js');
const { getTemperament } = require('../integrations/db/get-temperaments.js');
const { createTemperaments } = require('../integrations/db/create-temperaments.js');

const AppError = require('../utils/app-error.js');
const httpStatusCodes = require('../utils/http-status-codes.js');
const constants = require('../utils/constants.js');

const createBreed = async (name, height, weight, lifeSpan, temperaments, image) => {

    // Validate data
    const error = await validateBreed(name, height, weight, lifeSpan, temperaments, image);
    if (error) {
        console.log('createBreed error: ', error);
        throw new AppError(error, httpStatusCodes.BAD_REQUEST);
    }

    // Create new temperaments
    const temperamentsList = await createTemperaments(temperaments);
    // console.log('newTemperaments', temperamentsList);

    // Create breed
    const newBreed = await db.createBreed(
        name.trim().toUpperCase(),
        height.trim(),
        weight.trim(),
        lifeSpan && lifeSpan.trim(),
        temperamentsList,
        image && image.trim()
    );

    return await getBreed(newBreed.dataValues.id);
}

async function validateBreed(name, height, weight, lifeSpan, temperaments, image) {
    try {
        // console.log('validateBreed()');

        // Test breed data
        const breed = {
            name: name && name.trim().toUpperCase(),
            height: height && height.trim(),
            weight: weight && weight.trim(),
            lifeSpan: lifeSpan && lifeSpan.trim(),
            image: image && image.trim()
        }

        // name
        if (!name) {
            return `name: ${constants.FIELD_REQUIRED}`;
        }
        if (typeof name !== 'string') {
            return `name: ${constants.INVALID_DATA}`
        }
        if (name.length > constants.MAX_LENGTH_NAME) {
            return `name: ${constants.MAX_LENGTH_EXCEEDED} (max: ${constants.MAX_LENGTH_NAME})`;
        }
        // duplicated name ?
        let isNameDuplicated = true;
        try {
            await getBreeds(name, true);
        } catch (error) {
            isNameDuplicated = false;
        }
        if (isNameDuplicated) {
            return `name: ${constants.DUPLICATED_NAME}`;
        }

        // Ranges
        let error = '';

        // height
        if (!height) {
            return `height: ${constants.FIELD_REQUIRED}`;
        }
        error = validateRange(height, true, constants.VALID_RANGE_HEIGHT);
        if (error) {
            return `height: ${error}`;
        }

        // weight
        if (!weight) {
            return `weight: ${constants.FIELD_REQUIRED}`;
        }
        error = validateRange(weight, true, constants.VALID_RANGE_WEIGHT);
        if (error) {
            return `weight: ${error}`;
        }

        // lifeSpan
        if (lifeSpan) {
            error = validateRange(lifeSpan, false, constants.NO_RANGE);
            if (error) {
                return `lifeSpan: ${error}`;
            }
        }

        // temperaments
        if (!temperaments) {
            return `temperaments: ${constants.FIELD_REQUIRED}`;
        }
        if (Array.isArray(temperaments)) {
            if (temperaments.length === 0) {
                return `temperaments: ${constants.FIELD_REQUIRED}`;
            }

            for (let temperament of temperaments) {
                // temperament type
                if (typeof temperament !== 'string') {
                    return `${temperament}: ${constants.INCORRECT_TYPE}`;
                }
                // Empty temperament
                if (!temperament) {
                    return `temperaments: ${constants.EMPTY_ITEM_IN_LIST}`;
                }
                // Verify if temperament exists
                const temperamentInDB = await getTemperament(temperament.trim());
                // console.log('temperamentInDB: ', temperamentInDB);

                if (!temperamentInDB) {
                    return `${temperament}: ${constants.TEMPERAMENT_NOT_IN_LIST}`;
                }
            }
        } else {
            if (temperaments) {
                return `temperaments: ${constants.INCORRECT_TYPE}`;
            }
        }

        // image
        if (image && !(/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(image.toLowerCase()))) {
            return `image: ${constants.INVALID_DATA}`;
        }
        if (image && image.length > constants.MAX_LENGTH_IMAGE) {
            return `image: ${constants.MAX_LENGTH_EXCEEDED} (max: ${constants.MAX_LENGTH_IMAGE})`;
        }

        return '';
    } catch (error) {
        console.log('Validation error: ', error);
        return constants.VALIDATION_ERRORS;
    }
}

function hasValidationRange(range) {
    return !!(range[0] || range[1]);
}

function validateRange(value, isRequired, validationRange) {
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

    // '0 - 0' case
    if (minValue === 0 && maxValue === 0) {
        return `${constants.INVALID_RANGE} (0 - 0)`;
    }

    if (minValue > maxValue) {
        return `${constants.INVALID_RANGE} (min > max)`;
    }
    if (hasValidationRange(validationRange) && (minValue < validationRange[0] || maxValue > validationRange[1])) {
        return `${constants.INVALID_RANGE} (valid range: ${validationRange[0]} - ${validationRange[1]})`;
    }

    return '';
}

module.exports = { createBreed };