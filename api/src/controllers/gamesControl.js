require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios').default;
const { Videogame, Genre, Op } = require('../db');


// **********Funcion que busca todos los videoGames********** //
const allGames = async () => {
  //Busca que todos los juegos dentro de la DB
  const gamesDB = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ['name'],
    }
  });
  //Hace el llamado a la api
  const apiGameRauw = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)).data;

  //Realiza el mapeo de los datos que devuelce el axios
  // const apiGames = findGames(apiGameRauw);
  const apiGames = apiGameRauw.results.map((game) => {
    return {
      id: game.id,
      name: game.name,
      description: game.description,
      rating: game.rating,
      image: game.background_image,
      genres: game.genres?.map(el => el.name),
      created: false
    }
  });
  // une y retorna los datos encontrados en la DB y en la API 
  return [...gamesDB, ...apiGames]
};

const searchGamesByName = async (name) => {
  const GameByNameDB = await Videogame.findAll({ where: { name: name } });
  const apiGameRauw = (await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)).data;
  const apiGames = apiGameRauw.results.map((game) => {
    return {
      id: game.id,
      name: game.name,
      description: game.description,
      rating: game.rating,
      image: game.background_image,
      genres: game.genres?.map(el => el.name),
      created: false
    }
  });
  const results = [...GameByNameDB, ...apiGames];
  return results.slice(0, 15);
};

const gameById = async (id, source) => {
  const game = source === 'api'
    ? (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data
    : await Videogame.findByPk(id, { include: { model: Genre } });
  return game;
};

const createGames = async (name, description, relesed, rating, platforms, image, created, genres) => {
  const genresDb = await Genre.findAll({
    where: {
      name: genres
    }
  });
  const newGame = await Videogame.create({
    name,
    description,
    relesed,
    rating: rating || 0,
    platforms,
    image: image || 'https://static.vecteezy.com/system/resources/previews/002/293/504/non_2x/video-games-neon-sign-vector.jpg',
    created,
    genres
  });
  return newGame.addGenre(genresDb)
};

module.exports = {
  allGames,
  searchGamesByName,
  gameById,
  createGames
}