import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import style from './FilterBar.module.css'

export const FilterBar = ({ filterGenres, filterOrigin, orderName, orderRating, reload }) => {
  const allGenres = useSelector(state => state.genres);
  const [selectedOrder, setSelectedOrder] = useState('Order');
  const [selectedRating, setSelectedRating] = useState('Rating');
  const [selectedOrigin, setSelectedOrigin] = useState('Origin');
  const [selectedGenre, setSelectedGenre] = useState('Genre');

  const reset = () => {
    setSelectedOrder('Order');
    setSelectedRating('Rating');
    setSelectedOrigin('Origin');
    setSelectedGenre('Genre');
  };
  return (
    <div className={style.FilterContainer}>

      <select value={selectedOrder} onChange={(event) => { setSelectedOrder(event.target.value); orderName(event); }}>
        <option disabled>Order</option>
        <option value='asc'>A-Z</option>
        <option value='desc'>Z-A</option>
      </select>

      <select value={selectedRating} onChange={(event) => { setSelectedRating(event.target.value); orderRating(event); }}>
        <option disabled>Rating</option>
        <option value='top'>Rating Top</option>
        <option value='low'>Rating Low</option>
      </select>

      <select value={selectedOrigin} onChange={(event) => { setSelectedOrigin(event.target.value); filterOrigin(event); }}>
        <option disabled>Origin</option>
        <option value='all'>All Origins</option>
        <option value='created'>Created</option>
        <option value='existing'>Existing</option>
      </select>

      <select value={selectedGenre} onChange={(event) => { setSelectedGenre(event.target.value); filterGenres(event); }}>
        <option disabled>Genre</option>
        <option value='all'>All Genres</option>
        {allGenres?.map((g) => (<option value={g.name} key={g.id}> {g.name}</option>))}
      </select>

      <button onClick={() => { reload(); reset(); }}>Clear</button>
    </div>
  )
}
export default FilterBar;