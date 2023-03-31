import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getName } from '../../redux/actions';
import style from './SearchBar.module.css';
import Swal from 'sweetalert2'

export default function SearchBar({ handleInputSubmit }) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');


  const handleInputChange = (event) => {
    setName(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name) new Swal("Sorry!", "You must enter a name", "error")
    else {
      dispatch(getName(name));
      setName('');
      handleInputSubmit()
    }
  }
  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className={style.searchBar}>
        <input type='text' id='search' value={name} placeholder="Search videogame..." autoComplete='off' onChange={(event) => handleInputChange(event)} />
        <button type='submit' >Search</button>

      </div>
    </form>
  )
}
