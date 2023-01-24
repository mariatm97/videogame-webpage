import { ALL_GAMES, GAME_DETAIL, GAME_BY_NAME } from './actions';

const initialstate = {
  games: [],
  gameDetail: [],
}

const rootReducer = (state = initialstate, action) => {
  switch (action.type) {
    case ALL_GAMES:
      return { ...state, games: action.payload };
    case GAME_DETAIL:
      return { ...state, gameDetail: action.payload };
    case GAME_BY_NAME:
      return { ...state, games: action.payload };


    default:
      return { ...state };
  }
}

export default rootReducer;