const axios = require('axios');
const constants = require('../../utils/constants.js');

require('dotenv').config();
axios.defaults.headers.common['x-api-key'] = process.env.API_KEY;

const getAllBreeds = async () => {
    let endPoint = `${constants.THE_DOG_API_BASE_URL}/breeds`;

    let breeds = await axios.get(endPoint);

    return breeds.data;
};

module.exports = { getAllBreeds };