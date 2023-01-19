const { getBreeds } = require('./get-breeds.js');

const getTemperaments = async () => {
    const breeds = await getBreeds();
    let temperaments = new Set();

    // Remove duplicate temperaments
    for (const breed of breeds) {
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

module.exports = { getTemperaments };