const { Router } = require('express');
const { getTemperaments } = require('../services/temperament.js');

const router = Router();

// GET /temperaments
router.get(
    '/',
    async (req, res, next) => {
        try {
            const temperaments = await getTemperaments();

            res.status(200).json(temperaments);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
