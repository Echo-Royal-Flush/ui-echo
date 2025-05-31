import React from 'react';
import './RetrospectiveCard.css'; // Importa o arquivo de estilos
import { Box } from '@mui/material';

const RetrospectiveCard = ({ streak, lettersSent, lettersReceived }) => {
  return (
    <div className="retrospective-card-container">
      <h2 className="retrospective-title">Sua Retrospectiva</h2>
      <div className="retrospective-card">
        <div className="card-item">
          <h3>{streak}</h3>
          <p>Dias de Streak 🔥</p>
        </div>
        <div className="card-item">
          <h3>{lettersSent}</h3>
          <p>Cartas Enviadas 🃏</p>
        </div>
        <div className="card-item">
          <h3>{lettersReceived}</h3>
          <p>Cartas Recebidas 🀄</p>
        </div>
        <Box>
          
        </Box>
      </div>
    </div>
  );
};

export default RetrospectiveCard;