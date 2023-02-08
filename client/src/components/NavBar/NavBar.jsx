import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../Search/SearchBar';
import style from './NavBar.module.css'

export const NavBar = ({ handleInputSubmit }) => {

  return (
    <div className={style.NavContainer}>
      <Link to='/create'><button>Add game</button></Link>
      <SearchBar
        handleInputSubmit={handleInputSubmit}
      />
    </div>
  )
}

export default NavBar;