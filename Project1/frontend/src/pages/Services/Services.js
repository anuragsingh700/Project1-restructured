import React from 'react'
import Nav2 from '../../components/Nav2'

export default function Services() {
  return (
    <div>
      <Nav2/>
      <h1>Services</h1>
      <div className="containe">
        <div className="cards">
          <div className="image-sectio img-one"></div>
          <div className="conten">
            <h2>Wedding Ceremony</h2>
            <p>A Wedding is a once in a lifetime event, and we want yours to be one of the grandest & memorable.</p>
            <a href="#" className="button">Enquire Now</a>
          </div>    
        </div>
        <div className="cards">
          <div className="image-sectio img-two"></div>
          <div className="conten">
            <h2>Birthday Party</h2>
            <p>Our venue is an ideal place for organizing all types of birthday parties for your loved ones.</p>
            <a href="#" className="button">Enquire Now</a>
          </div>   
        </div>
        <div className="cards">
          <div className="image-sectio img-three"></div>
          <div className="conten">
            <h2>Corporate Events</h2>
            <p>We serve your corporate guests with the best luxurious hospitality and graceful services.</p>
            <a href="#" className="button">Enquire Now</a>
          </div>
        </div>
      </div>
    </div>
  )
}
