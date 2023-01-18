const { getTemperaments: getTemperamentsFromDB } = require('../integrations/db/get-temperaments.js');
const { createTemperaments } = require('../integrations/db/create-temperaments.js');
const theDogApi = require('../integrations/the-dog-api/get-temperaments.js');

const getTemperaments = async () => {
    let temperaments = await getTemperamentsFromDB();

    if (temperaments.length === 0) {
        temperaments = await theDogApi.getTemperaments();

        // Save temperaments to DB
        await createTemperaments(temperaments);

        temperaments = await getTemperaments();
    }

    return temperaments;
}

module.exports = { getTemperaments };