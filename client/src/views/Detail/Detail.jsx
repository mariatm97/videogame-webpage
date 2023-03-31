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
        <div className={style.abouText}>
          {/* <p>📝Description: </p> */}
          <span dangerouslySetInnerHTML={{ __html: detail.description }} />
        </div>
        <div className={style.aboutinf}>
          <div className={style.aboutcontext}><h4 className={style.h3Ab}>⚜️Generos:</h4><p className={style.pAb}>{detail.genres?.join(',  ')}</p></div>
          <div className={style.aboutcontext}><h4 className={style.h3Ab}>⭐Rating:</h4><p className={style.pAb}>{detail.rating}</p></div>
          <div className={style.aboutcontext}><h4 className={style.h3Ab}>🎮Platforms:</h4><p className={style.pAb}>{detail.id?.length > 7
            ? detail.platforms
            : detail.platforms?.join(', ')}</p></div>
          <div className={style.aboutcontext}><h4 className={style.h3Ab}>📆Released:</h4><p className={style.pAb}>{detail.released ? detail.released : 'No information'}</p></div>
        </div>

        <Link to='/home' onClick={handleReset}><button>◀ Return</button></Link>
      </div>

    </div >
  )
}

export default Detail;