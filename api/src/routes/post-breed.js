const { Router } = require('express');
const { createBreed } = require('../services/create-breed.js');

const httpStatusCodes = require('../utils/http-status-codes.js');

const router = Router();

// POST /dogs
router.post(
    '/',
    async (req, res, next) => {
        try {
            const {
                name,
                height,
                weight,
                lifeSpan,
                temperaments,
                image
            } = req.body;

            // console.log(name, height, weight, lifeSpan, temperaments, image);

            const breed = await
                createBreed(
                    name,
                    height,
                    weight,
                    lifeSpan,
                    temperaments,
                    image
                );

                res.status(httpStatusCodes.OK).json(breed);
        } catch (error) {
            next(error);
        }
    }
)

module.exports = router;