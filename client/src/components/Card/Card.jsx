import React from 'react';
import style from './Card.module.css';
import { Link } from 'react-router-dom';

export const Card = (props) => {
  return (
    <div className={style.container}>
      {/* mostrará la info de cada videogame mapeado y adema un link que me llevara al detalle del videogame en cuestion */}
      <Link to={`/videogames/${props.id}`}><h3>{props.name}</h3></Link>
      <img src={props.image} alt='imageGame' />
      <p>{props.genres}</p>
    </div>
  )
}

export default Card;