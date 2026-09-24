import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth logic

  const showAlert = () => {
    if (!isLoggedIn) {
      alert("You haven't logged in yet!");
    }
  };

  return (
    <div>
      <nav className="nav">
        <div className="nav-logo">
        </div>
        <div className="nav-menu">
          <ul>
            <li><Link to="/" className="link" onClick={showAlert}>Home</Link></li>
            <li><Link to="/" className="link" onClick={showAlert}>Blog</Link></li>
            <li><Link to="/" className="link" onClick={showAlert}>Services</Link></li>
            <li><Link to="/" className="link" onClick={showAlert}>About</Link></li>
          </ul>
        </div>
        <div className="nav-button">
          {!isLoggedIn ? (
            <>
              <Link to="/"><button className="btn white-btn" id="loginBtn">Sign In</button></Link>
              <Link to="/signup"><button className="btn white-btn" id="registerBtn">Sign Up</button></Link>
            </>
          ) : (
            <button className="btn white-btn" id="logoutBtn">Logout</button>
          )}
        </div>
        <div className="nav-menu-btn">
          <i className="bx bx-menu"></i> {/* Add functionality for mobile toggle */}
        </div>
      </nav>
    </div>
  );
}
