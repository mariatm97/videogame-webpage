import axios from 'axios';

export const ALL_GAMES = 'ALL_GAMES';
export const GAME_DETAIL = 'GAME_DETAIL';
export const GAME_BY_NAME = 'GAME_BY_NAME';
export const ALL_GENRES = 'ALL_GENRES';
export const FILTER_ORIGIN = 'FILTER_ORIGIN';
export const FILTER_GENRE = 'FILTER_GENRE';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_RATING = 'ORDER_RATING';



export const getGames = () => {
  return async function (dispatch) {
    const response = await axios.get('http://localhost:3001/videogames');
    const games = response.data;
    dispatch({ type: ALL_GAMES, payload: games });
  };
};

export const getDetail = (id) => {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/videogames/${id}`);
    const gameById = response.data;
    dispatch({ type: GAME_DETAIL, payload: gameById });
  };
};

export const getName = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/videogames?name=${name}`);
      const gameByName = response.data;
      dispatch({ type: GAME_BY_NAME, payload: gameByName });
    } catch (error) {
      alert(`${name} does not exist!`)
    }

  };
};

export const getGenres = () => {
  return async function (dispatch) {
    const response = await axios.get('http://localhost:3001/genres');
    const allgenres = response.data;
    dispatch({ type: ALL_GENRES, payload: allgenres })
  };
};

export const filterOrigin = (payload) => {
  return { type: FILTER_ORIGIN, payload }
}

export const filterGenre = (payload) => {
  return { type: FILTER_GENRE, payload }
}
export const orderName = (payload) => {
  return { type: ORDER_BY_NAME, payload }
}
export const orderRating = (payload) => {
  return { type: ORDER_RATING, payload }
}