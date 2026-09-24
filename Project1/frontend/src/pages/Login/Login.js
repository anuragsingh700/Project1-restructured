import './Login.css';
import Nav from '../../components/Nav';
import { useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const navigate = useNavigate();  // useNavigate hook to navigate programmatically

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email));
  };

  const handleLogin =async (event) => {
    event.preventDefault();
    let isValid = true;
    setValidationMessage('');  // Clear previous validation messages

    // Email validation
    if (!validateEmail(email)) {
      setValidationMessage('Invalid email address.');
      isValid = false;
    }

    // Password validation
    if (password.length < 6) {
      setValidationMessage((prevMessage) => prevMessage + ' Password must be at least 6 characters long.');
      isValid = false;
    }

    if (isValid) {
      const formData = {
        email,
        password,
      };
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

        const json = await response.json();  
        setValidationMessage((prevMessage) => prevMessage + json.message);
      
        if(json.success) {
          localStorage.setItem("authToken",json.authToken)
          navigate('/home', { state: { email, admin: json.admin } });
        }
      } catch (error) {
        console.error('Error:', error);
        setValidationMessage('An error occurred while submitting the form.');
      }
    }
  };

  return (
    <div className='photo'>
      <Nav />
      <div className="wrapper">
        <div className="form-box">
          <div className="login-container" id="login">
            <div className="top">
              <span>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </span>
              <header>Login</header>
            </div>
            <div className="input-box">
              <input
                type="text"
                className="input-field"
                placeholder="Username or Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="bx bx-user"></i>
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
              <input
                type="submit"
                className="submit"
                value="Login"
                onClick={handleLogin}
              />
            </div>
            <div className="two-col">
              <div className="one">
                <input type="checkbox" id="login-check" />
                <label htmlFor="login-check">Remember Me</label>
              </div>
              <div className="two">
                <label><Link to="/">Forget password?</Link></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
