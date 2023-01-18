const { allGenres } = require('../controllers/genresControl')

const getAllGenreHandler = async (req, res) => {

    try {
        const getAllGenres = await allGenres()
        res.status(200).json(getAllGenres);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getAllGenreHandler };

// res.send("NIY: debe mostrar toodos los genres");