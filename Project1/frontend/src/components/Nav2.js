import React from 'react'
import { Link } from 'react-router-dom';
import '../pages/Home/Home.css'

export default function Nav2() {
  return (
    <div className='con'>
      <div className="nav-logo2">
      </div>
      <div className='nav2_pos'>
      <nav className="nav2">
            <Link to="/home" className="link">Home</Link>
            <Link to="/blog" className="link" >Venues</Link>
            <Link to="/services" className="link">Services</Link>
            <Link to="/about" className="link">About</Link>
      </nav>
      </div>
      <div className="nav-menu-btn">
          <i className="bx bx-menu"></i>
        </div>
    </div>
  )
}
