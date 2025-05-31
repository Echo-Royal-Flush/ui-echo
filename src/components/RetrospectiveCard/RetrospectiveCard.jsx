import React, { useState } from 'react';
import './RetrospectiveCard.css';
import { Box, Select, MenuItem, InputLabel, FormControl, Chip, OutlinedInput } from '@mui/material';

const options = ['2023', '2024', '2025', 'Todas'];

const RetrospectiveCard = ({ streak, lettersSent, lettersReceived }) => {
  const [selectedYears, setSelectedYears] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedYears(typeof value === 'string' ? value.split(',') : value);
  };

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
        <Box sx={{ width: '100%', marginTop: '20px' }}>
        </Box>
      </div>
    </div>
  );
};

export default RetrospectiveCard;
