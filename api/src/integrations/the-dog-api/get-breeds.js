const { getAllBreeds } = require('./get-all-breeds.js');
const { formatWeight } = require('./format-weight.js');

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

module.exports = { getBreeds };
