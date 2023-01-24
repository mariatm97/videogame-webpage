import axios from 'axios';

export const ALL_GAMES = 'ALL_GAMES';
export const GAME_DETAIL = 'GAME_DETAIL';
export const GAME_BY_NAME ='GAME_BY_NAME';


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

export const getName = (name)=>{
    return async function (dispatch){
        const response = await axios.get(`http://localhost:3001/videogames?name=${name}`);
        const gameByName = response.data;
        dispatch({type: GAME_BY_NAME, payload: gameByName});
    };
};

