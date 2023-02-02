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
        <button className={style.botton}  onClick={prev}> Previous</button>
        {pageNumbers?.map(number => (
          <button className={currentPage === number ? style.pageNumberActive : style.pageNumber} key={number} href onClick={() => page(number)}> {number} </button>
        ))}
        <button className={style.botton} onClick={next}>Next</button>
      </ul>
      
    </div>
  )
}