import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import style from './Form.module.css';
import { validate, } from './formValidate.js';
import { useDispatch } from 'react-redux';
import { getGames, getGenres } from '../../redux/actions';
import Swal from 'sweetalert2'


export const Form = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGames());
    dispatch(getGenres());
  }, [dispatch])

  const genres = useSelector((state) => state.genres);
  //Para traer un array de platforms
  let allGames = useSelector(state => state.games);
  const platformsList = new Set();
  allGames.forEach(game => game.platforms.forEach(platform => platformsList.add(platform)));
  const platforms = Array.from(platformsList);

  // estado para reiniciar los valores de genres y platforms
  const [selectedGenre, setSelectedGenre] = useState('Seleccionar');
  const [selectedPlatform, setSelectedPlatform] = useState('Seleccionar');
  const reset = () => {
    setSelectedGenre('Seleccionar');
    setSelectedPlatform('Seleccionar')
  };

  //estado del formulario
  const [form, setForm] = useState({
    name: '',
    description: '',
    released: '',
    rating: 0,
    image: '',
    platforms: [],
    genres: [],
  });
  //estado de errores
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    released: '',
    rating: '',
    image: '',
    platforms: '',
    genres: '',
  });

  const handleOnChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setErrors(validate({ ...form, [property]: value }))
    setForm({ ...form, [property]: value })
  };

  const handlerSubmit = (event) => {
    event.preventDefault()
    if (!Object.keys(errors).length) {

      axios.post('http://localhost:3001/videogames', form)
        .then(res => new Swal("Excellent!", res.data, "success"))
        .catch(err => new Swal("ERROR!", err, "error"))
      setForm({
        name: '',
        description: '',
        released: '',
        rating: 0,
        image: '',
        platforms: [],
        genres: [],
      })
      reset();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      new Swal("ERROR", 'there are unfilled fields😕', "error");
      // console.log(errors)
    }
  };

  const handleGenres = (event) => {
    setForm({ ...form, genres: [...form.genres, event.target.value] });
  };
  const handleDeleteGenre = (event) => {
    setForm({ ...form, genres: form.genres.filter((g) => g !== event) });
  };

  const handlePlatform = (event) => {
    setForm({ ...form, platforms: [...form.platforms, event.target.value] });
  };
  const handleDeletePlataform = (event) => {
    setForm({ ...form, platforms: form.platforms.filter((p) => p !== event) });
  };
  return (
    <div className={style.formcontainer}>
      <h1>✨Add your own videogame✨</h1>
      <form onSubmit={handlerSubmit}>
        <div>
          <label htmlFor='name'>🕹️Game name: *</label>
          <input type='text' value={form.name} onChange={handleOnChange} name='name' placeholder='Write the game name...' autoComplete='off' />
          {errors.name && <p className={style.errorText}>{errors.name}</p>}
        </div>

        <div>
          <label>📝Description: *</label>
          <p>
            <textarea type='text' value={form.description} onChange={handleOnChange} name='description' placeholder='Write a short game description...' />
          </p>
          {errors.description && <p className={style.errorText}>{errors.description}</p>}
        </div>

        <div>
          <label>📆Released date: </label>
          <input type='text' value={form.released} onChange={handleOnChange} name='released' placeholder='dd-mm-yyyy' autoComplete='off' />
          {errors.released && <p className={style.errorText}>{errors.released}</p>}
        </div>

        <div>
          <label>⭐Rating: </label>
          <input type='text' value={form.rating} onChange={handleOnChange} name='rating' placeholder='Rating from 1 to 5...' autoComplete='off' />
          {errors.rating && <p className={style.errorText}>{errors.rating}</p>}
        </div>
        <div>
          <label>🖼️Image: </label>
          <input type='text' value={form.image} onChange={handleOnChange} name='image' placeholder='type the URL of the videogame image...' autoComplete='off' />
          {errors.image && <p className={style.errorText}>{errors.image}</p>}
        </div>
        <div>
          <div>
            <label >⚜️Genres: * </label>
            <select value={selectedGenre} onChange={(event) => { setSelectedGenre(event.target.value); handleGenres(event) }}>
              <option disabled>Seleccionar</option>
              {genres?.map((g) => (<option value={g.name} key={g.id}> {g.name}</option>))}
            </select>
          </div>
          <div className={style.selection}>
            {form.genres?.map((g) => (
              <div className={style.sele} key={g}> {g + " "}
                <button className={style.delete} key={g.id} value={g.name} onClick={() => { handleDeleteGenre(g); reset(); }}>X</button>
              </div>))}
          </div>
          {/* {errors.genres && <p className={style.errorSelectText}>{errors.genres}</p>} */}
        </div>


        <div>
          <div>
            <label>🎮Platforms: * </label>
            <select value={selectedPlatform} name='platforms' onChange={(event) => { setSelectedPlatform(event.target.value); handlePlatform(event) }}>
              <option disabled>Seleccionar</option>
              {platforms?.map((p) => (<option value={p} key={p}>{p}</option>))}
            </select>

          </div>
          <div className={style.selection}>
            {form.platforms?.map((p) => (
              <div className={style.sele} key={p}> {p + " "}
                <button className={style.delete} onClick={() => { handleDeletePlataform(p); reset(); }}>X</button>
              </div>))}
          </div>
          {/* {errors.platforms && <p className={style.errorSelectText}>{errors.platforms}</p>} */}
        </div>


        <button className={style.btn} type='submit'>Create Game</button>
        <div>
          <Link to='/home'>
            <button className={style.btn}>◀ Return Home</button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Form;