import React from 'react';
import Card from '../Card/Card';
import style from './CardsContainer.module.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Pagination from '../Pagination/Pagination';

const CardsContainer = () => {
  const allGames = useSelector(state => state.games);
  //Estados para el paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, /*setGamesPerPage*/] = useState(15);

  const lastIndexGame = currentPage * gamesPerPage;
  const firstIndexGame = lastIndexGame - gamesPerPage;
  const currentGames = allGames.slice(firstIndexGame, lastIndexGame); //videogames de la page actual

  const handleNext = () => {
    if (currentPage < (Math.ceil(allGames.length / gamesPerPage))) {
      setCurrentPage(currentPage + 1);
    }
  }
  const handlePrev = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handlePage = (pageNumbers) => {
    setCurrentPage(pageNumbers)
  }

  return (
    <div>
      <div className={style.Cardscontainer}>
        {currentGames?.map((game) => {
          return <Card
            key={game.id}
            name={game.name}
            id={game.id}
            image={game.image}
            genres={game.genres.map((gen) => <p>{gen}</p>)} />
        })}
      </div>
      <div>
        <Pagination
          gamesPerPage={gamesPerPage}
          allGames={allGames.length}
          page={handlePage}
          currentPage={currentPage}
          prev={handlePrev}
          next={handleNext}
        />

      </div>

    </div>
  )
}

export default CardsContainer;