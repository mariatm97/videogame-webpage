import {
  ALL_GAMES, GAME_DETAIL, GAME_BY_NAME, ALL_GENRES, FILTER_ORIGIN, FILTER_GENRE, ORDER_BY_NAME,
  //  ORDER_RATING, 
} from './actions';

const initialstate = {
  games: [],
  allGames: [],
  gameDetail: [],
  genres: []
}

const rootReducer = (state = initialstate, action) => {
  switch (action.type) {
    case ALL_GAMES:
      return { ...state, games: action.payload, allGames: action.payload };

    case GAME_DETAIL:
      return { ...state, gameDetail: action.payload };

    case GAME_BY_NAME:
      return { ...state, games: action.payload };

    case ALL_GENRES:
      return { ...state, genres: action.payload };

    case FILTER_ORIGIN:
      const filterCreated = action.payload === 'created' ?
        state.allGames.filter(el => el.created === true)
        : state.allGames.filter(el => el.created === false)
      return { ...state, games: action.payload === 'all' ? state.allGames : filterCreated };

    case FILTER_GENRE:
      const allGames = state.allGames;
      const filterGenres = action.payload === 'all' ? allGames : allGames.filter((game) =>
        game.genres.find(el => el === action.payload)
      );
      return { ...state, games: filterGenres };

    case ORDER_BY_NAME:
      let nameSorted = action.payload === 'asc' ? state.games.sort(function (a, b) {
        if (a.name > b.name) { return 1 };
        if (b.name > a.name) { return -1 };
        return 0;
      }) : state.games.sort(function (a, b) {
        if (a.name > b.name) { return -1 };
        if (b.name > a.name) { return 1 };
        return 0;
      })
      return { ...state, game: nameSorted };
    // case FILTER_RATING:
    //   return {};
    default:
      return { ...state };
  }
}

export default rootReducer;