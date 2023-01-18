require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios').default;
const { Genre } = require('../db');


const allGenres = async () => {

  const { data } = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
  const genres = data.results;

  // Para guardar los géneros en la base de datos
  genres.forEach(async (genre) => {
    // Busca si el género ya existe
    const existingGenre = await Genre.findOne({ where: { name: genre.name } });

    // Si el género no existe, crea uno nuevo
    if (!existingGenre) {
      await Genre.create({ name: genre.name });
    }
  })
  // retorna todos los generos encontrados
  return (await Genre.findAll());
};


module.exports = { allGenres };