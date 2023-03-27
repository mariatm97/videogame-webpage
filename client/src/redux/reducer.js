import {
  ALL_GAMES,
  GAME_DETAIL,
  GAME_BY_NAME,
  ALL_GENRES,
  FILTER_ORIGIN,
  FILTER_GENRE,
  ORDER_BY_NAME,
  ORDER_RATING,
  RESET_DETAIL
} from './actions';

const initialstate = {
  games: [],
  allGames: [],
  gameDetail: [],
  genres: [],
  genreFilter: '',
  originFilter: '',
}

const rootReducer = (state = initialstate, action) => {
  switch (action.type) {
    case ALL_GAMES:
      return { ...state, games: action.payload, allGames: action.payload };

    case GAME_DETAIL:
      return { ...state, gameDetail: action.payload };

    case RESET_DETAIL:
      return { ...state, gameDetail: {} }

    case GAME_BY_NAME:
      return { ...state, games: action.payload };

    case ALL_GENRES:
      return { ...state, genres: action.payload };

    case FILTER_ORIGIN:
      const originFilter = action.payload;
      const allGames = state.allGames;
      let genreFilterOrigin = state.genreFilter;

      let filteredByOrigin = originFilter === 'all' ? allGames : allGames.filter(game => game.created === (originFilter === 'created'));

      if (genreFilterOrigin !== '' && genreFilterOrigin !== 'all') {
        filteredByOrigin = filteredByOrigin.filter(game => game.genres.includes(genreFilterOrigin));
      }

      return { ...state, originFilter: originFilter, games: filteredByOrigin };
    // let filterCreated = action.payload === 'created' ?
    //   state.allGames.filter(el => el.created === true) : state.allGames.filter(el => el.created === false)

    // return { ...state, games: action.payload === 'all' ? state.allGames : filterCreated, originFilter: filterCreated };

    case FILTER_GENRE:
      const genreFilter = action.payload;
      const allGamesData = state.allGames;
      let originFilterGenre = state.originFilter;

      let filteredByGenre = genreFilter === 'all' ? allGamesData : allGamesData.filter(game => game.genres.includes(genreFilter));

      if (originFilterGenre !== '' && originFilterGenre !== 'all') {
        filteredByGenre = filteredByGenre.filter(game => game.created === (originFilterGenre === 'created'));
      }

      return { ...state, genreFilter: genreFilter, games: filteredByGenre };

    // const allGamesData = state.allGames;
    // const filterGenres = action.payload === 'all' ? allGamesData : allGamesData.filter((game) =>
    //   game.genres.find(el => el === action.payload)
    // );
    // return { ...state, games: filterGenres, originFilter:filterGenres };
    case ORDER_BY_NAME:
      let nameSorted = action.payload === 'asc' ? state.games.sort(function (a, b) {
        if (a.name > b.name) { return 1; };
        if (b.name > a.name) { return -1; };
        return 0;
      }) : state.games.sort(function (a, b) {
        if (a.name > b.name) { return -1; };
        if (b.name > a.name) { return 1; };
        return 0;
      })
      return { ...state, games: nameSorted };
    case ORDER_RATING:
      let ratingSorted = action.payload === 'low' ? state.games.sort(function (a, b) {
        if (a.rating > b.rating) { return 1; };
        if (b.rating > a.rating) { return -1; };
        return 0;
      }) : state.games.sort(function (a, b) {
        if (a.rating > b.rating) { return -1; };
        if (b.rating > a.rating) { return 1; };
        return 0;
      })
      return { ...state, games: ratingSorted };
    default:
      return { ...state };
  }
}

export default rootReducer;