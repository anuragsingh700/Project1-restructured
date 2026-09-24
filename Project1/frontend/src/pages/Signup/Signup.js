import React, { useState } from 'react';
import '../Login/Login.css';
import Nav from '../../components/Nav';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  // State variables for form inputs and validation messages
  const [Firstname, setFirstname] = useState('');
  const [Lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Form submission handler
  const handleRegister =async (event) => {
    event.preventDefault();
    let isValid = true;
    setValidationMessage(''); // Clear any existing validation message

    // Validate email
    if (!validateEmail(email)) {
      setValidationMessage('Invalid email address.');
      isValid = false;
    }

    // Validate password length
    if (password.length < 6) {
      setValidationMessage((prevMessage) => prevMessage + ' Password must be at least 6 characters long.');
      isValid = false;
    }

    if (isValid) {
      const name = `${Firstname} ${Lastname}`; 
      const formData = {
        name,
        email,
        password,
        admin: false,
      };
      console.log(formData);
      try {
        const response = await fetch('http://localhost:5000/api/createuser_login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password:formData.password
          }),
        });

        var json = await response.json();   
        setValidationMessage((prevMessage) => prevMessage + json.message);
      } catch (error) {
        console.error('Error:', error);
        setValidationMessage('An error occurred while submitting the form.');
      }
      if(json.success){
        alert('account already existed')
        navigate('/', { state: { email } });
      }
      else{
      try {
        const response = await fetch('http://localhost:5000/api/createuser_signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name:formData.name,
            email: formData.email,
            password:formData.password,
            admin:false
          }),
        });

        const json = await response.json();
        console.log(json);    

        if (json.success) {
          setValidationMessage('Banquet successfully created!');
        } else {
          setValidationMessage(`Error: ${json.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        setValidationMessage('An error occurred while submitting the form.');
      }
      navigate('/home', { state: { email } });
    }}
  };

  return (
    <div className='photo'>
    <Nav/>
    <div className="wrapper">
      <div className="form-box">
        <div className="">
          <div className="top">
            <span>
              Have an account? <Link to="/login">Login</Link>
            </span>
            <header>Sign Up</header>
          </div>
          <div className="two-forms">
            <div className="input-box">
              <input 
                type="text" 
                className="input-field" 
                placeholder="Firstname" 
                value={Firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <i className="bx bx-user"></i>
            </div>
            <div className="input-box">
              <input 
                type="text" 
                className="input-field" 
                placeholder="Lastname" 
                value={Lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              <i className="bx bx-user"></i>
            </div>
          </div>
          <div className="input-box">
            <input
              type="text"
              className="input-field"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="bx bx-envelope"></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              className="input-field password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="bx bx-lock-alt"></i>
          </div>
          <div className="input-box">
            <p id="pass-validate-message">{validationMessage}</p>
            <input type="submit" className="submit" value="Register" onClick={handleRegister} />
          </div>
          <div className="two-col">
            <div className="one">
              <input type="checkbox" id="register-check" />
              <label htmlFor="register-check">Remember Me</label>
            </div>
            <div className="two">
              <label><Link to="/terms">Terms & Conditions</Link></label>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
