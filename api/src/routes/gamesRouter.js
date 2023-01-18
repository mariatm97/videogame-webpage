const { Router } = require("express");
const {
    getAllGamesHandler,
    getGameHandler,
    postCreateGamesHandler
} = require('../handlers/gamesHandler');
const gamesRouter = Router()

gamesRouter.get('/', getAllGamesHandler);
gamesRouter.get('/:id', getGameHandler);
gamesRouter.post('/', postCreateGamesHandler);

module.exports = gamesRouter;