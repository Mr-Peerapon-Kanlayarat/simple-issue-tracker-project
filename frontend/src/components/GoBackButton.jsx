import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GoBackButton.css";

function GoBackButton() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <button className="go-back-btn" onClick={handleGoBack} type="button">
      <span>Go Back</span>
    </button>
  );
}

export default GoBackButton;
