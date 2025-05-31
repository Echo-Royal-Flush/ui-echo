import React, { useEffect, useState } from 'react';
import RetrospectiveCard from '../../components/RetrospectiveCard/RetrospectiveCard';
import { Header } from '../../components/Header/Header';
import { Box, Input } from '@mui/material';

export const PerfilPage = () => {
    const [userData, setUserData] = useState(null);
    const [hovered, setHovered] = useState(false);
    const userMetrics = {
        currentStreak: 45,
        totalLettersSent: 230,
        totalLettersReceived: 112,
    };
    return (
        <>
            <Header />
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                padding: '40px', 
                width: '80%', 
                alignItems: 'center',
                marginLeft: '300px'
                }}>

                {/* Seção de Informações do Usuário */}
                <Box sx={{
                    textAlign: 'center'
                }}> 
                    <img src="/images/profile.png" style={{ height: '70px', width: '70px'}} />
                    <form style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: '30px',
                    }}>
                        <label>nome</label>
                        <input style={{
                            height: '45px',
                            width: '380px',
                            borderRadius: '15px',
                            borderStyle: 'none',
                            backgroundColor: '#E5E5E5',
                            margin: '10px 0 20px 0',
                            paddingLeft: '20px'
                        }} placeholder='aaaaa' />
                        <label>Email</label>
                        <input style={{
                            height: '45px',
                            width: '380px',
                            borderRadius: '15px',
                            borderStyle: 'none',
                            backgroundColor: '#E5E5E5',
                            margin: '10px 0 20px 0',
                            paddingLeft: '20px'
                        }} placeholder='aaaaa' />
                        <label>Role</label>
                        <input style={{
                            height: '45px',
                            width: '380px',
                            borderRadius: '15px',
                            borderStyle: 'none',
                            backgroundColor: '#E5E5E5',
                            margin: '10px 0 20px 0',
                            paddingLeft: '20px'
                        }} placeholder='aaaaa' />
                        <button style={{
                            width: '380px',
                            height: '50px',
                            margin: '10px 0',
                            borderRadius: '13px',
                            borderStyle: 'none',
                            padding: '1px 15px',
                            color: 'white',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            backgroundColor: '#c28d19',
                            boxShadow: '0 6px 6px rgba(0, 0, 0, 0.5)',
                            marginTop: '20px'
                        }}>Salvar</button>
                    </form>
                </Box>
                {/* Seção do Card Estilizado */}
                <RetrospectiveCard
                    streak={userMetrics.currentStreak}
                    lettersSent={userMetrics.totalLettersSent}
                    lettersReceived={userMetrics.totalLettersReceived}
                />
            </div>
        </>
    );
};
