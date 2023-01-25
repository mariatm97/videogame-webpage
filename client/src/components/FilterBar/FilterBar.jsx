import React from 'react';
// import { useSelector } from 'react-redux';
import style from './FilterBar.module.css'

export const FilterBar = () => {
  // const allGenres = useSelector(state => state.genres);

  return (
    <div className={style.FilterContainer}>
      <select>
        <option value='order'>Order</option>
        <option value='asc'>A-Z</option>
        <option value='desc'>Z-A</option>
      </select>

      <select>
        <option value='origin'>Origin</option>
        <option value='all'>All</option>
        <option value='created'>Created</option>
        <option value='existing'>Existing</option>
      </select>

      <select>
        <option value='rating'>Rating</option>
        <option value='top'>Rating Top</option>
        <option value='low'>Rating Low</option>
      </select>

      <select>
        <option value='genre'>Genre</option>
        <option value='all'>All</option>
        {/* {allGenres.map((genre) => (
          <option key={genre.name} value={genre.name}>
            {genre.name}
          </option>
        ))} */}
      </select>
    </div>
  )
}
export default FilterBar;