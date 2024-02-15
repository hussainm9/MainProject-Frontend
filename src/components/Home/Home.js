import React from 'react'
import RestaurantDisplay from '../restaurantHome/RestaurantDisplay'
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
