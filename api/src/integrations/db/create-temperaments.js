const { Temperament } = require('../../db.js');

const createTemperaments = async (temperaments) => {
    const result = [];
    for (const name of temperaments) {
        const temperament = await Temperament.findOrCreate({
            where: { name: name }
        });
        result.push(temperament[0]);
    }

    // console.log('result: ', result);

    return result;
}

module.exports = { createTemperaments };
