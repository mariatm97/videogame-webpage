import React from 'react'
import CardsContainer from '../../components/CardsContainer/CardsContainer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getGames } from '../../redux/actions';
import FilterBar from '../../components/FilterBar/FilterBar';


export const Home = () => {

  const dispatch = useDispatch();

  //Cuando se monte mi Home, que se monten todos mis Videogames
  useEffect(() => {
    dispatch(getGames());
  }, [dispatch])


  return (
    <>
      <FilterBar />

      < CardsContainer />

    </>
  )
}

export default Home;