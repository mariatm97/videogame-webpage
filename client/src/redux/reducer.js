import { ALL_GAMES, GAME_DETAIL, GAME_BY_NAME, 
  // ORDER_BY_NAME, FILTER_ORIGIN, FILTER_RATING, FILTER_GENRE 
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
    // case ORDER_BY_NAME:
    //   return{};
    // case FILTER_ORIGIN:
    //   const filterCreated = action.payload === 'Created' ?
    //     state.games.filter(el => el.createdInDb)
    //     : state.allGames.filter(el => !el.createdInDb) 
    //   return {};
    // case FILTER_RATING:
    //   return {};
    // case FILTER_GENRE:
    //   return {};
    default:
      return { ...state };
  }
}

export default rootReducer;