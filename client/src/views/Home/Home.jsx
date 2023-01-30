import React, { useState } from 'react'
import CardsContainer from '../../components/CardsContainer/CardsContainer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getGames, getGenres, filterOrigin, filterGenre, orderName } from '../../redux/actions';
import FilterBar from '../../components/FilterBar/FilterBar';


const Home = (props) => {

  const dispatch = useDispatch();

  //Cuando se monte mi Home, que se monten todos mis Videogames
  useEffect(() => {
    dispatch(getGames());
    dispatch(getGenres())
  }, [dispatch])
  const [order, setOrder] = useState('');
  const handleFilterGenre = (event) => {
    dispatch(filterGenre(event.target.value))
  }
  const handleFilterOrigin = (event) => {
    dispatch(filterOrigin(event.target.value))
  }
  const handleOrderName = (event) => {
    dispatch(orderName(event.targert.value))
    setCurrentPage(1); // esto debo llamarlo de cardsContainer
    setOrder(`ordered from ${event.target.value}`)
  }
  return (
    <>
      <FilterBar
        filterGenres={handleFilterGenre}
        filterOrigin={handleFilterOrigin}
        OrderName={handleOrderName}
      />
      < CardsContainer />
    </>
  )
}

export default Home;