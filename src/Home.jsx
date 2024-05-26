import React from 'react'
import './Home.css'
import weather from './components/assests/Screenshot 2024-05-24 214745.png'

const Home = () => {
  return (
    <div id='intro'>
      <div>
      <span style={{color:"black",fontSize:"40px"}}>Know the</span>
      <h2  style={{color:"rgb(248, 245, 51)",fontSize:"80px"}}>Weather</h2>
      </div>
      <img src={weather} alt="" />
    </div>
  )
}

export default Home