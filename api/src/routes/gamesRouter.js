const { Router } = require("express");
const {
    getAllGamesHandler,
    getGameHandler,
    postCreateGamesHandler,
} = require('../handlers/gamesHandler');
const gamesRouter = Router()
const validate = (req, res, next) => {
    const { name, description, platforms } = req.body;
    if (!name) return res.status(400).json({ error: "Missing name" });
    if (!description) return res.status(400).json({ error: "Missing description" });
    if (!platforms) return res.status(400).json({ error: "Missing platforms" });

    next();
};
gamesRouter.get('/', getAllGamesHandler);
gamesRouter.get('/:id', getGameHandler);
gamesRouter.post('/', validate, postCreateGamesHandler);

module.exports = gamesRouter;