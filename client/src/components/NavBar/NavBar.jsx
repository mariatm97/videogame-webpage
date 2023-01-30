import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../Search/SearchBar';
import style from './NavBar.module.css'

export const NavBar = (props) => {
 
  return (
    <div className={style.NavContainer}>
      <Link to='/home'><button>Home</button></Link>
      <Link to='/create'><button>Add game</button></Link>
      <SearchBar onSearch={props.onSearch} />
    </div>
  )
}

export default NavBar;