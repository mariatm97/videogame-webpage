import React from 'react';
import style from './Card.module.css';
import { Link } from 'react-router-dom';

const Card = (props) => {
  return (
    <div className={style.Cardcontainer}>
      <Link to={`/videogames/${props.id}`}><h3>{props.name}</h3></Link>
      <img src={props.image} alt='imageGame' />
      <p> {props.genres}</p>
    </div>
  )
}

export default Card;