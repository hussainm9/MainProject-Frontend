import React from 'react'
import RestaurantDisplay from '../restaurant/registration/RestaurantDisplay'
import './home.css'
export default function Home() {
  return (
    <div >
      <div className="scrolling-text">
      
      <span>Welcome to resofy</span>
    </div>
        <RestaurantDisplay/>

    </div>
  )
}
