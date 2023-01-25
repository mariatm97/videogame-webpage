import React from 'react';
import style from './Pagination.module.css';

export default function Pagination({ gamesPerPage, allGames, actualPage }) {
    const pageNumbers = [];
    //para obtener el num de paginas divido el total de juegos entre el num de juegos por page
    const numPages = Math.ceil(allGames / gamesPerPage);

    for (let i = 1; i <= numPages; i++) { 
        pageNumbers.push(i)//lo pusheo en pageNumbers
    }
    return (
        <div className={style.pagContainer}>
            { pageNumbers?.map(number => (
                <a key={number} href onClick={() => actualPage(number)}> {number} </a>
            ))}
            
        </div>
    )
}