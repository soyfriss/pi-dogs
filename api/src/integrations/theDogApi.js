const axios = require('axios');
require('dotenv').config();

axios.defaults.headers.common['x-api-key'] = process.env.API_KEY;

const url = 'https://api.thedogapi.com/v1';

const getBreedsFromApi = async () => {
    let endPoint = `${url}/breeds`;

    let breeds = await axios.get(endPoint);

    return breeds.data;
};

const getBreeds = async (name, exactSearch) => {
    // console.log('exactSearch: ', exactSearch);
    let breeds = await getBreedsFromApi();
    
    if (name) {
        breeds = breeds.filter(breed => {
            if (exactSearch) {
                return breed.name === name;
            }
            if(name.length === 1) {
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
    let breeds = await getBreedsFromApi();
    // console.log('breeds: ', breeds.data);

    let breed = breeds.find(breed => breed.id === Number(id));
    console.log('weight: ', breed.weight.metric)
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
    getTemperaments,
}


