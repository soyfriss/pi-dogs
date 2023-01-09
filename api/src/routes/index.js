const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouter = require('./dogs.js');
const dogRouter = require('./dog.js');
const temperamentsRouter = require('./temperaments.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogsRouter);
router.use('/dog', dogRouter);
router.use('/temperaments', temperamentsRouter);

module.exports = router;
