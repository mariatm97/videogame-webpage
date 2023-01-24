import React from 'react';
import Card from '../Card/Card';
import style from './CardsContainer.module.css';
import { useSelector } from 'react-redux';

export const CardsContainer = () => {
  const allGames = useSelector(state => state.games);

  return (
    <div className={style.container}>
      <div>
        {/* tomara un array de VideoGames, para renderizar una Card por cada videogame */}
        {allGames.map((game) => {
          return <Card
            name={game.name}
            id={game.id}
            image={game.image}
            genres={game.genres.map((gen) => <p>{gen}</p>)} />
        })}
      </div>

    </div>
  )
}

export default CardsContainer;