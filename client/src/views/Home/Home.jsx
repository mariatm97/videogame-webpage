import React from 'react'
import CardsContainer from '../../components/CardsContainer/CardsContainer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getGames } from '../../redux/actions';

export const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch])

  return (
    <>
      <CardsContainer />
      
    </>
  )
}

export default Home;