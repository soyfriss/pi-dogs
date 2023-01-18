const { Temperament } = require('../../db.js');

const flat = (temperaments) => {
    const result = temperaments.map(temperament => ({
        id: temperament.dataValues.id,
        name: temperament.dataValues.name
    }));

    return result;
}

const getTemperaments = async () => {
    let temperaments = [];

    temperaments = await Temperament.findAll();

    return flat(temperaments);
}

module.exports = { getTemperaments };