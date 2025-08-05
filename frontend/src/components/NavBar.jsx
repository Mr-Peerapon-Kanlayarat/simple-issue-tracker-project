import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleHomeClick = () => {
    navigate("/home");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={handleHomeClick}>
          <h2>Issue Tracker</h2>
        </div>
        
        <div className="navbar-menu">        
          <button 
            className="navbar-logout" 
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
