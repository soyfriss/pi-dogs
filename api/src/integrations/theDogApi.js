const axios = require('axios');
require('dotenv').config();

axios.defaults.headers.common['x-api-key'] = process.env.API_KEY;

const url = 'https://api.thedogapi.com/v1';

const getBreedsFromApi = async () => {
    let endPoint = `${url}/breeds`;
    // if (name) {
    //     endPoint = `${url}/breeds/search?q=${name}`;
    // }
    // console.log('endPoint: ', endPoint);

    let breeds = await axios.get(endPoint);
    // console.log('breeds: ', breeds.data);

    return breeds.data;
};

const getBreeds = async (name) => {

    let breeds = await getBreedsFromApi(name);
    // console.log('breeds from API: ', breeds);

    if (name) {
        breeds = breeds.filter(breed => breed.name.toLowerCase().includes(name.toLowerCase()));
    }

    breeds = breeds.map(breed => ({
        id: breed.id,
        name: breed.name,
        weight: breed.weight.metric,
        image: breed.image?.url,
        temperament: breed.temperament,
        source: 'external'
    }));

    return breeds;
};

const getBreed = async (id) => {
    let breeds = await getBreedsFromApi();
    // console.log('breeds: ', breeds.data);

    let breed = breeds.find(breed => breed.id === Number(id));

    if (breed) {
        breed = {
            id: breed.id,
            name: breed.name,
            weight: breed.weight.metric,
            height: breed.height.metric,
            lifeSpan: breed.life_span,
            image: breed.image.url,
            temperament: breed.temperament,
            source: 'external'
        }
    }

    return breed;
};

const getTemperaments = async () => {
    const breeds = await axios.get(`${url}/breeds`)
    let temperaments = new Set();

    // Remove duplicate temperaments
    for (const breed of breeds.data) {
        // console.log('breed: ', breed);
        if (breed.temperament) {
            let temperamentsArr = breed.temperament.split(', ');
            for (const temperament of temperamentsArr) {
                temperaments.add(temperament)
            }
        }
    }

    return temperaments;
};

module.exports = {
    getBreeds,
    getBreed,
    getTemperaments
}


