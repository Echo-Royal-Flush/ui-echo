import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ViewCard = () => {
  const [hovered, setHovered] = useState(false);

  const navigate = useNavigate();

  const cardStyle = {
    width: '300px',
    height: '600px',
    alignContent: 'center',
    padding: '24px',
    borderRadius: '20px',
    backgroundColor: '#c28d19', // lime-400
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    boxShadow: hovered
      ? '0 30px 30px rgba(0, 0, 0, 0.5)'
      : '0 4px 8px rgba(0, 0, 0, 0.1)',
    transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
    transition: 'all 0.3s ease-in-out',
    textAlign: 'center',
    margin: '40px auto',
  };

  const buttonStyle = {
    backgroundColor: '#ffffff',
    color: '#3F6212', // dark green
    border: 'none',
    padding: '10px 20px',
    borderRadius: '999px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '24px',
    transition: 'background-color 0.3s ease',
    marginTop: '24px',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#ecfccb',
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2 style={{ fontSize: '34px', marginBottom: '52px' }}>Veja suas Cartas!</h2>
      <p style={{ opacity: 0.9, fontSize: '20px', margin: '60px 0' }}>
        Visualize quais cartas seus colegas lhe enviaram.
      </p>
      <button
        style={hovered ? buttonHoverStyle : buttonStyle}
        onClick={() => navigate('/perfil')}
      >
        Veja agora!
      </button>
    </div>
  );
};