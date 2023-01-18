const { Router } = require("express");
// importar los handlers
const { getAllGenreHandler } = require('../handlers/genreHandler');
const genreRouter = Router();

genreRouter.get('/', getAllGenreHandler);

module.exports = genreRouter;