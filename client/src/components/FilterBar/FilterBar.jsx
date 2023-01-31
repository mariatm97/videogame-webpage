import React from 'react';
import { useSelector } from 'react-redux';
import style from './FilterBar.module.css'

export const FilterBar = ({ filterGenres, filterOrigin, orderName, orderRating, reload }) => {
  const allGenres = useSelector(state => state.genres);

  return (
    <div className={style.FilterContainer}>
      <select defaultValue="Order" onChange={(event) => orderName(event)}>
        <option disabled>Order</option>
        <option value='asc'>A-Z</option>
        <option value='desc'>Z-A</option>
      </select>

      <select defaultValue="Rating" onChange={(event) => orderRating(event)} >
        <option disabled>Rating</option>
        <option value='top'>Rating Top</option>
        <option value='low'>Rating Low</option>
      </select>

      <select defaultValue="Origin" onChange={(event) => filterOrigin(event)}>
        <option disabled>Origin</option>
        <option value='all'>All Origins</option>
        <option value='created'>Created</option>
        <option value='existing'>Existing</option>
      </select>

      <select defaultValue="Genre" onChange={(event) => filterGenres(event)}>
        <option disabled>Genre</option>
        <option value='all'>All Genres</option>
        {allGenres?.map((g) => (<option value={g.name} key={g.id}> {g.name}</option>))}
      </select>

      <button onClick={(event)=>reload(event)}>Reload Home</button>
    </div>
  )
}
export default FilterBar;