import React from 'react'
import CardsContainer from '../../components/CardsContainer/CardsContainer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getGames, getGenres } from '../../redux/actions';
// import { NavBar } from '../../components/NavBar/NavBar';


const Home = () => {
  const dispatch = useDispatch();

  //Cuando se monte mi Home, que se monten todos mis Videogames
  useEffect(() => {
    dispatch(getGames());
    dispatch(getGenres())
  }, [dispatch])


  return (
    <>
      < CardsContainer />
    </>

  )
}

export default Home;