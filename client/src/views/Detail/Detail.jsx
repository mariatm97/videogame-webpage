import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getDetail } from '../../redux/actions';
import style from './Detail.module.css';


export const Detail = () => {
  const dispatch = useDispatch()
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const detail = useSelector(state => state.gameDetail)

  function handleReset() {
    dispatch(getDetail());
  }
  console.log(Detail)
  return (
    <div className={style.Detailcontainer}>

      <h3>{detail.name}</h3>
      <img src={detail.image} alt='imageGame' />
      <p>⚜️Generos: {detail.genres?.join(',  ')}</p>
      <p>Description: <p dangerouslySetInnerHTML={{ __html: detail.description }} /></p>
      <p> 🎮Platforms:{detail.id?.length > 7
        ? detail.platforms
        : detail.platforms?.join(', ')}</p>
      <br />
      <p> ⭐Rating: {detail.rating}</p>
      <br />
      <p> 📆Released: {detail.released}</p>

      <br />
      <Link to={'/home'} onClick={handleReset}><button>Return</button></Link>
    </div>
  )

}

export default Detail;