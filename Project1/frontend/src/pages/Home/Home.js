import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav2 from '../../components/Nav2';
import Form from '../../components/BanquetForm'; 
import './Home.css';

export default function Home() {
  const [data, setData] = useState([]); 
  const location = useLocation(); 
  const email = location.state?.email;
  const admin = location.state?.admin;  
  const navigate = useNavigate();

  const loaddata = async () => 
  {
    try {
      const response = await fetch("http://localhost:5000/api/userdata", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      setData(result); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect( () => {
   loaddata(); 
  },[]);

  // Function to navigate to the banquet page with data
  const Banquet_page = (i) => {
    setData('');
    loaddata();
    navigate('/banquet', { state:  i  });
  };

  return (
    <div>
      <Nav2 />
      <div className='com'>
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src="https://www.miragebanquet.ca/images/header/1.jpg" alt="First slide" />
              <div className="carousel-caption d-none d-md-block">
                <h5>MIRAGE</h5>
                <p>BANQUET & CONVENTION</p>
              </div>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="https://www.miragebanquet.ca/images/header/5.jpg" alt="Second slide" />
              <div className="carousel-caption d-none d-md-block">
                <h5>JAIBAGH PALACE</h5>
                <p>BANQUET & CONVENTION</p>
              </div>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="https://www.miragebanquet.ca/images/header/3.jpg" alt="Third slide" />
              <div className="carousel-caption d-none d-md-block">
                <h5>MARIGOLD</h5>
                <p>BANQUET & HOTEL</p>
              </div>
            </div>
          </div>

          {/* Carousel controls */}
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="sr-only">Next</span>
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </a>
        </div>
        <strong className='ven'><h2>Venues in your city</h2></strong>
        <div className='banquit'>
          {
            admin?
              <div role="button" className="bt btn-primary" data-toggle="modal" data-target="#exampleModal">
                <div className="circle">
                  <h1>+</h1>
                </div>
              </div>:""
          }
          {/* Render banquet data */}
          {
            data.length > 0 
              ? data.map((item, index) => (
                  <div key={index}>
                    {item.map((i, innerIndex) => (
                      <div key={innerIndex} className="map" role="button" onClick={() => Banquet_page(i)}>
                        <div className='image'>
                          <img src={i.imagePreviewUrl} alt="Preview" style={{ width: '100%', height: 'auto' }} />
                        </div>
                        <div className='banqu'>{i.Banquet}</div>
                        <div className='price'>{i.Price} Lakhs</div>
                      </div>
                    ))}
                  </div>
                ))
              : <div>No Data Available</div>
          }
        </div>

        {/* Passing email to Form component */}
        <Form email={email} loaddata={loaddata}/>
      </div>
    </div>
  );
}
