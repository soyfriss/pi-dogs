const axios = require('axios');
const constants = require('../../utils/constants.js');

require('dotenv').config();
axios.defaults.headers.common['x-api-key'] = process.env.API_KEY;
console.log('process.env.API_KEY: ', process.env.API_KEY);

const getAllBreeds = async () => {
    let endPoint = `${constants.THE_DOG_API_BASE_URL}/breeds`;

    let breeds = await axios.get(endPoint);

    return breeds.data;
};

const getBreeds = async (name, exactSearch) => {
    // console.log('exactSearch: ', exactSearch);
    let breeds = await getAllBreeds();

    if (name) {
        breeds = breeds.filter(breed => {
            if (exactSearch) {
                return breed.name.trim().toLowerCase() === name.trim().toLowerCase();
            }
            if (name.length === 1) {
                return breed.name.toLowerCase().startsWith(name.toLowerCase());
            } else {
                // return breed.name.toLowerCase().startsWith(name.toLowerCase());
                return breed.name.toLowerCase().includes(name.toLowerCase());
            }
        });
    }

    breeds = breeds.map(breed => ({
        id: breed.id,
        name: breed.name,
        weight: formatWeight(breed.weight),
        image: breed.image?.url,
        temperament: breed.temperament,
        source: 'external'
    }));

    return breeds;
};

const getBreed = async (id) => {
    let breeds = await getAllBreeds();
    // console.log('breeds: ', breeds.data);

    let breed = breeds.find(breed => breed.id === Number(id));

    if (breed) {
        breed = {
            id: breed.id,
            name: breed.name,
            weight: formatWeight(breed.weight),
            height: breed.height.metric,
            lifeSpan: breed.life_span,
            image: breed.image?.url,
            temperament: breed.temperament,
            source: 'external'
        }
    }

    return breed;
};

const formatWeight = (weight) => {
    return weight ? (weight.metric.includes('NaN') ? '' : weight.metric) : '';
}


module.exports = { getBreeds, getBreed };
