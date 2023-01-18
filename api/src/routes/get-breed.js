const { Router } = require('express');
const { getBreed } = require('../services/get-breed.js');

const httpStatusCodes = require('../utils/http-status-codes.js');

const router = Router();

// GET /dogs/{idRaza}?source=local|external
router.get(
    '/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const { source } = req.query;

            const breed = await getBreed(id, source);

            res.status(httpStatusCodes.OK).json(breed);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
