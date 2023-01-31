import React from 'react';
import style from './Pagination.module.css';

export default function Pagination({ gamesPerPage, allGames, page, currentPage, next, prev }) {
  const pageNumbers = [];
  //para obtener el num de paginas divido el total de juegos entre el num de juegos por page
  const numPages = Math.ceil(allGames / gamesPerPage);

  for (let i = 1; i <= numPages; i++) {
    pageNumbers.push(i)//lo pusheo en pageNumbers
  }


  return (
    <div>
      <ul className={style.pagContainer}>
        <button onClick={prev}> Previous</button>
        {pageNumbers?.map(number => (
          <a key={number} href onClick={() => page(number)}> {number} </a>
        ))}
        <button onClick={next}>Next</button>
      </ul>
      <div className={style.pagination}>
        <p>Page {currentPage} of {numPages}</p>
      </div>
    </div>
  )
}