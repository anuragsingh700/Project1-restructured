import React from 'react';
import { useLocation } from 'react-router-dom';
import Nav2 from '../../components/Nav2';
import './BanquetDetails.css';
import BookingForm from '../../components/BookingForm';

export default function BanquetDetails() {
  const location = useLocation(); // To access the passed state
  const i = location.state; // Access the entire object

  return (
    <div>
      <Nav2 />
      <div className="ban_cun">
        <div className="ban_image">
            <img src={i.imagePreviewUrl} alt="Preview" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="ban_details">
            <h2>{i.Details}</h2>
            
            <p className="ban_address">
                <h4><strong>Address:</strong> {i.Address}</h4>
            </p>
            <h5> <strong>City:</strong> {i.City} , {i.State}</h5>
            <div className="ban_price"><h2><strong>Price: </strong><p>{i.Price} Lakhs</p></h2></div>
        </div>
      </div>
        <div className='div_inp'>
            <div className="ban_name">
                <h1><strong>{i.Banquet}</strong></h1>
            </div>
            <div className='div_mes'>
             <button className="bt btn-primary" data-toggle="modal" data-target="#exampleModal" >BOOKING</button>
            </div>
            <BookingForm email={i.email}/>
        </div>
    </div>
  );
}
