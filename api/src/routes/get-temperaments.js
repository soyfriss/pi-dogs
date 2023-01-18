const { Router } = require('express');
const { getTemperaments } = require('../services/get-temperaments.js');

const httpStatusCodes = require('../utils/http-status-codes.js');

const router = Router();

// GET /temperaments
router.get(
    '/',
    async (req, res, next) => {
        try {
            const temperaments = await getTemperaments();

            res.status(httpStatusCodes.OK).json(temperaments);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
