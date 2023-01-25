import React from 'react'
import { Link } from 'react-router-dom';
import style from './Landing.module.css'

export const Landing = () => {
  return (
    <div className={style.LandingContainer}>
      <link href='https://fonts.googleapis.com/css?family=Press+Start+2P' rel='stylesheet' />
      <h1>WELCOME TO OUR GAMING PAGE</h1>
      <h2>In this application you can search for existing video games or add the video game you want!</h2>

      <Link to='home'>
        <button>Play</button>
      </Link>

    </div>
  )
}
export default Landing;