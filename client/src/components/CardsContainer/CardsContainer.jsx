import React from 'react';
import Card from '../Card/Card';
import style from './CardsContainer.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Pagination from '../Pagination/Pagination';
import { getGames, filterOrigin, filterGenre, orderName, orderRating } from '../../redux/actions';
import FilterBar from '../FilterBar/FilterBar';

const CardsContainer = () => {
  const dispatch = useDispatch();
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

  //PARA EL FILTRADO
  const [/*order*/, setOrder] = useState('');
  const handleFilterGenre = (event) => {
    dispatch(filterGenre(event.target.value))
  }
  const handleFilterOrigin = (event) => {
    dispatch(filterOrigin(event.target.value))
  }

  const handleOrderName = (event) => {
    dispatch(orderName(event.target.value))
    setCurrentPage(1);
    setOrder(event.target.value)
  }

  const handleOrderRating = (event) => {
    event.preventDefault()
    dispatch(orderRating(event.target.value))
    setCurrentPage(1);
    setOrder(event.target.value)
  }

  const handleClick = () => {
    dispatch(getGames())
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
            genres={game.genres.map((gen) => <p>{gen}</p>)}
          />
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
        <FilterBar
          filterGenres={handleFilterGenre}
          filterOrigin={handleFilterOrigin}
          orderName={handleOrderName}
          orderRating={handleOrderRating}
          reload={handleClick}
        />
      </div>

    </div>
  )
}

export default CardsContainer;