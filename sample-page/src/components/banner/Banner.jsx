import React from 'react'
import sampleImage from '../../assets/sample-banner.jpg'
import './Banner.css'


const Banner = () => {
  return (
    <section className="hero-section">
      <div className='banner-img'>
        <img src={sampleImage} alt="Sample Banner" height="800px"/>
      </div>
      <div className="banner-content">
        <h1>Make your interior more minimalistic & modern</h1>
        <p>Turn your room with panto into a lot more minimalist and modern with ease and speed</p>
        <div className="input-search">
          <input type="text" placeholder='Search furniture'/>
        </div>
      </div>
    </section>
  )
}

export default Banner

