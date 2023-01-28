require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios').default;
const { Videogame, Genre } = require('../db');


// **********Funcion que busca todos los videoGames********** //
const allGames = async () => {
  //Busca que todos los juegos dentro de la DB
  const gamesDaB = await Videogame.findAll({
    attributes: ['id', 'name', 'image', 'platforms', 'created'],
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
      platform: game.platform?.map(el => el.name),
      genres: game.genres?.map(el => el.name),
    }
  })
  //Hace el llamado a la api
  // const apiGameRauw = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)).data;
  let results = [...gamesDB]

  const url1 = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`)).data;
  const url2 = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)).data;
  const url3 = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`)).data;
  const url4 = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`)).data;
  const url5 = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)).data;

  apiGameRauw = [...url1.results, ...url2.results, ...url3.results, ...url4.results, ...url5.results]
  //Realiza el mapeo de los datos que devuelve el axios
  const apiGames = apiGameRauw?.map((game) => {
    return {
      id: game.id,
      name: game.name,
      image: game.background_image,
      platform: game.platform?.map(el=>el.name),
      genres: game.genres?.map(el => el.name),
      created: false,

    }
  });
  // une y retorna los datos encontrados en la DB y en la API 
  return [...results, ...apiGames];
};
/******************************FUNCION QUE BUSCA POR NOMBRE*******************************/
const searchGamesByName = async (name) => {
  const GameByNameDB = await Videogame.findAll({
    attributes: ['id', 'name', 'image', 'created'],
    include: [{ model: Genre, attributes: ['name'], through: { attributes: [], } }]
  });
  const apiGameRauw = (await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)).data;
  const apiGames = apiGameRauw.results.map((game) => {
    return {
      id: game.id,
      name: game.name,
      image: game.background_image,
      genres: game.genres?.map(el => el.name),
      created: false,
    }
  });
  if (apiGames.length) apiGames
  else throw Error(`${name} does not exist`)
  const results = [...GameByNameDB, ...apiGames];
  return results.slice(0, 15);
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
      rating: apiGamesRaw.rating,
      platforms: apiGamesRaw.parent_platforms?.map(
        (e) => e.platform.name
      ),
      created: false
    };
  } else {
    const dataDB = (await Videogame.findByPk(id, {
      attributes: ['id', 'name', 'image', 'description', 'released', 'rating', 'platforms'],
      include: [{ model: Genre, attributes: ['name'], through: { attributes: [] } }]
    }));
    return {
      id: dataDB.id,
      name: dataDB.name,
      image: dataDB.image,
      description: dataDB.description,
      released: dataDB.released,
      rating: dataDB.rating,
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