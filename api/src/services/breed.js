const { getBreeds: getBreedsFromDB, getBreed: getBreedFromDB, createBreed: createBreedFromDB } = require('../integrations/breed.js');
const { getBreeds: getBreedsFromApi, getBreed: getBreedFromApi } = require('../integrations/theDogApi.js');
const { findOrCreateTemperaments } = require('./temperament.js');
const AppError = require('../utils/AppError.js');
const httpStatusCodes = require('../utils/httpStatusCodes.js');
const breedValidations = require('../utils/constants.js');

const getBreeds = async (name) => {

    let breeds;

    // Get breeds from DB
    const breedsFromDB = await getBreedsFromDB(name);

    // Get breeds from thedogapi
    const breedsFromApi = await getBreedsFromApi(name);

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

    return breed;
}

const createBreed = async (name, height, weight, lifeSpan, temperaments, image) => {
    // Validations
    if (!name || typeof name !== 'string' || !height || !weight) {
        throw new AppError('Missing data', httpStatusCodes.BAD_REQUEST);
    }
    // name
    if (name.length > breedValidations.MAX_LENGTH_NAME) {
        throw new AppError(`The maximum length of name field has been exceeded (max: ${breedValidations.MAX_LENGTH_NAME})`, httpStatusCodes.BAD_REQUEST);
    }

    // TODO: Complete validations <-----------------------------------
    // height
    let [min, max] = height.split(' - ');

 
    // Create new temperaments
    const temperamentsList = await findOrCreateTemperaments(temperaments);
    // console.log('newTemperaments', temperamentsList);

    // Create breed
    const newBreed = await createBreedFromDB(
        name,
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
