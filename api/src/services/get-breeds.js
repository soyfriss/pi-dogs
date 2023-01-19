// const {setTimeout} = require('timers/promises');
const db = require('../integrations/db/get-breeds.js');
const theDogApi = require('../integrations/the-dog-api/get-breeds.js');

const AppError = require('../utils/app-error.js');
const httpStatusCodes = require('../utils/http-status-codes.js');

const getBreeds = async (name, exactSearch = false) => {

    let breeds;

    // Get breeds from DB
    const breedsFromDB = await db.getBreeds(name, exactSearch);

    // Get breeds from thedogapi
    const breedsFromApi = await theDogApi.getBreeds(name, exactSearch);

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
        breed = await db.getBreed(id);
    }

    // Get breed from external API
    if (source === 'external') {
        breed = await theDogApi.getBreed(id);
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

module.exports = { getBreeds, getBreed };