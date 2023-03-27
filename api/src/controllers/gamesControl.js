require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios').default;
const { Videogame, Genre } = require('../db');
const { Op } = require("sequelize")


// **********Funcion que busca todos los videoGames********** //
const allGames = async () => {
  //Busca que todos los juegos dentro de la DB
  const gamesDaB = await Videogame.findAll({
    include: [{
      model: Genre, attributes: ['name'], through: {
        attributes: [],
      },
    }]
  });
  const gamesDB = gamesDaB.map((game) => {
    return {
      id: game.id,
      name: game.name,
      image: game.image,
      rating: game.rating?.toFixed(1),
      platforms: game.platforms,
      genres: game.genres?.map(el => el.name),
      created: true
    }
  })

  let results = [...gamesDB]
  //para traer los resultados desde la api
  const urls = [1, 2, 3, 4, 5].map(page => axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`));

  const [url1, url2, url3, url4, url5] = await Promise.all(urls);

  const apiGameRauw = [
    ...url1.data.results,
    ...url2.data.results,
    ...url3.data.results,
    ...url4.data.results,
    ...url5.data.results
  ];

  const apiGames = apiGameRauw?.map((game) => {
    return {
      id: game.id,
      name: game.name,
      image: game.background_image,
      rating: game.rating?.toFixed(1),
      platforms: game.parent_platforms?.map(
        (e) => e.platform.name),
      genres: game.genres?.map(el => el.name),
      created: false,
    }
  });

  // une y retorna los datos encontrados en la DB y en la API 
  return [...results, ...apiGames];
};
/******************************FUNCION QUE BUSCA POR NOMBRE*******************************/
const searchGamesByName = async (name) => {
  const GameByName = await Videogame.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
    include: [{ model: Genre, attributes: ['name'], through: { attributes: [], } }]
  });
  const GameByNameDB = GameByName.map((game) => {
    return {
      id: game.id,
      name: game.name,
      image: game.image,
      rating: game.rating?.toFixed(1),
      genres: game.genres?.map(el => el.name),
      created: true
    }
  })


  const apiGameRauw = (await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)).data;
  const apiGames = apiGameRauw.results.map((game) => {
    return {
      id: game.id,
      name: game.name,
      image: game.background_image,
      rating: game.rating?.toFixed(1),
      genres: game.genres?.map(el => el.name),
      created: false,
    }
  });
  const results = [...GameByNameDB, ...apiGames];

  if (results.length) { return results.slice(0, 15) }
  else throw Error(`${name} does not exist`)

};

/******************************FUNCION PARA BUSCAR POR ID******************************+*/
const gameById = async (id, source) => {

  if (source === 'api') {
    const apiGamesRaw = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data;
    return {
      id: apiGamesRaw.id,
      name: apiGamesRaw.name,
      image: apiGamesRaw.background_image,
      description: apiGamesRaw.description,
      genres: apiGamesRaw.genres?.map((e) => e.name),
      released: apiGamesRaw.released,
      rating: apiGamesRaw.rating?.toFixed(1),
      platforms: apiGamesRaw.parent_platforms?.map(
        (e) => e.platform.name
      ),
      created: false
    };
  } else {
    const dataDB = (await Videogame.findByPk(id, {
      include: [{ model: Genre, attributes: ['name'], through: { attributes: [] } }]
    }));
    return {
      id: dataDB.id,
      name: dataDB.name,
      image: dataDB.image,
      description: dataDB.description,
      released: dataDB.released,
      rating: dataDB.rating?.toFixed(1),
      platforms: dataDB.platforms,
      genres: dataDB.genres?.map(el => el.name),
    }
  }
};

/********************************FUNCION PARA CREAR VIDEOGAME*******************************+*/
const createGames = async (name, description, released, rating, platforms, image, created, genres) => {
  const genresDb = await Genre.findAll({
    where: {
      name: genres
    }
  });
  const newGame = await Videogame.create({
    name,
    description,
    released,
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