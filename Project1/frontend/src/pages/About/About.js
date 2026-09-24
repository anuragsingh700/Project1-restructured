import React from 'react';
import Nav2 from '../../components/Nav2';

export default function About() {
  return (
    <div>
      <Nav2 />
      <div className="wrappe">
        <div className="row">
          <div className="image-section">
          <img src="https://www.theweddingmission.com/wp-content/uploads/2023/06/TorieKev-410-scaled.jpg" alt="Wed+ Banquet and Halls" />
          </div>
          <div className="content">
            <h1><i>About Us</i></h1>
            <h2><i>Our Banquet</i></h2>
            <p>
              <b><i>We, Wed+ Banquet and Halls located in Malad West, Mumbai, Maharashtra have various spaces that are ideal for all your events like marriages, birthdays, etc. We arrange different types of services like live orchestra & ghazal for your events. Our main motto is customer satisfaction at the highest level. Our friendly staff extend their hospitality towards your guests and ensure their comfort at all times.</i></b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
