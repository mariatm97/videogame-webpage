import React from 'react'

export default function Paginado({ videogamesPerPage, allVideogames, paginado }) {
    const pageNumbers = [] //declaro un arreglo vacio

    for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) { //todos los videojuegos dividido los videojuegos por pag que quiero
        pageNumbers.push(i)   //lo guardo en pageNumbers
    }
    return (
        <div className='pagination_container'>
            {pageNumbers && pageNumbers.map(number => (
                <a key={number} href onClick={() => paginado(number)}>{number}</a>
            ))}
        </div>
    )
}