const { Temperament } = require('../../db.js');

const getTemperament = async (name) => {
    const temperament = await Temperament.findOne({
        where: { name: name }
    });

    return temperament;
}

module.exports = { getTemperament };