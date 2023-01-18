const { getAllBreeds } = require('./get-all-breeds.js');
const { formatWeight } = require('./format-weight.js');

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

module.exports = { getBreed };
