const { allGames, searchGamesByName, gameById, createGames } = require('../controllers/gamesControl');

const getAllGamesHandler = async (req, res) => {
  const { name } = req.query;

  try {
    const results = name ? await searchGamesByName(name) : await allGames();
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getGameHandler = async (req, res) => {
  const { id } = req.params;
  // si isNaN el id, source sera de bdd, sino sera de api
  const source = isNaN(id) ? 'bdd' : 'api';
  try {
    const game = await gameById(id, source);
    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postCreateGamesHandler = async (req, res) => {
  const { name, description, relesed, rating, platforms, image, created, genres } = req.body;

  try {
    await createGames(name, description, relesed, rating, platforms, image, created, genres);
    res.status(201).json("Video game created successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllGamesHandler, getGameHandler, postCreateGamesHandler }