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

module.exports = { getBreeds };