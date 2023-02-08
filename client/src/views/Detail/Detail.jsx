import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getDetail, resetDetail } from '../../redux/actions';
import style from './Detail.module.css';


export const Detail = () => {
  const dispatch = useDispatch()
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [dispatch, id]);

  const detail = useSelector(state => state.gameDetail)

  function handleReset() {
    dispatch(getDetail());
    dispatch(resetDetail());
  }
  return (
    <div className={style.Detailcontainer}>
      <div >
        <h3>{detail.name}</h3>
        <img src={detail.image} alt='imageGame' />
        <p>⚜️Generos: {detail.genres?.join(',  ')}</p>
        <p>📝Description: <p dangerouslySetInnerHTML={{ __html: detail.description }} /></p>
        <p> ⭐Rating: {detail.rating}</p>
        <p> 🎮Platforms: {detail.id?.length > 7
          ? detail.platforms
          : detail.platforms?.join(', ')}</p>
        <p> 📆Released: {detail.released ? detail.released : 'No information'}</p>
        <Link to={'/home'} onClick={handleReset}><button>◀ Return</button></Link>
      </div>

    </div >
  )
}

export default Detail;