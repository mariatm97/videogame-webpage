const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const gamesRouter = require('./gamesRouter');
const genreRouter = require('./genreRouter');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', gamesRouter);
router.use('/genres', genreRouter);

module.exports = router;