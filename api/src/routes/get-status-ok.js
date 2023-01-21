const { Router } = require('express');

const httpStatusCodes = require('../utils/http-status-codes.js');

const router = Router();

// GET /health-check
router.get(
    '/',
    (_, res) => {
        res.sendStatus(httpStatusCodes.OK);
    }
);

module.exports = router;
