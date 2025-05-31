import React, { useEffect, useState } from 'react';
import RetrospectiveCard from '../../components/RetrospectiveCard/RetrospectiveCard';
import { Header } from '../../components/Header/Header';
import { Box, Button } from '@mui/material';
import ProfileIcon from '@mui/icons-material/AccountCircle';

export const PerfilPage = () => {
    const [userData, setUserData] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1); // Suporte para controle
    const tamanho = 10;

    const userMetrics = {
        currentStreak: 45,
        totalLettersSent: 230,
        totalLettersReceived: 112,
    };

    const userId = localStorage.getItem('id');
    useEffect(async () => {
        try {
            const response = await fetch(`http://localhost:8080/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao criar o time');
            }

            setUserData(response);
        } catch (err) {
            setError(err.message);
        }
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8080/feedbacks/paged?userId=${userId}&pagina=${pagina}&tamanho=${tamanho}`)
            .then((res) => res.json())
            .then((data) => {
                setFeedbacks(data.content || []);
                setTotalPaginas(data.totalPages || 1);
            })
            .catch((err) => console.error("Erro ao buscar feedbacks:", err));
    }, [userData]);

    const handleNext = () => {
        if (pagina < totalPaginas) setPagina(pagina + 1);
    };

    const handlePrev = () => {
        if (pagina > 1) setPagina(pagina - 1);
    };

    return (
        <>
            <Header />
            {/* Container principal com duas colunas */}
            <Box sx={{
                display: 'flex',
                padding: '40px',
                maxWidth: '1200px',
                margin: '0 auto',
                gap: '40px'
            }}>
                {/* Coluna 1: Informações do Usuário */}
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <ProfileIcon
                        sx={{
                            color: '#7500a8',
                            width: 120,
                            height: 120,
                            marginBottom: '20px'
                        }}
                    />

                    <Box sx={{
                        width: '100%',
                        textAlign: 'left',
                        bgcolor: '#f5f5f5',
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <Box sx={{ mt: 3 }}>
                            <p><strong>Nome:</strong> {userData?.name || 'Carregando...'}</p>
                            <p><strong>Email:</strong> {userData?.email || 'Carregando...'}</p>
                            <p><strong>Cargo:</strong> {userData?.position || 'Carregando...'}</p>
                            <p><strong>Empresa:</strong> {userData?.company || 'Carregando...'}</p>
                        </Box>
                    </Box>
                </Box>

                {/* Coluna 2: RetrospectiveCard */}
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                }}>
                    <RetrospectiveCard
                        streak={userMetrics.currentStreak}
                        lettersSent={userMetrics.totalLettersSent}
                        lettersReceived={userMetrics.totalLettersReceived}
                    />
                </Box>
            </Box>

            {/* Seção de Cartas Recebidas */}
            <Box sx={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                <h2>Cartas Recebidas</h2>
                {feedbacks.length > 0 ? (
                    <ul style={{
                        listStyleType: 'none',
                        padding: 0
                    }}>
                        {feedbacks.map((item, index) => (
                            <li key={index} style={{
                                margin: '10px 0',
                                padding: '15px',
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                            }}>
                                <strong>De:</strong> {item.senderName || 'Anônimo'}<br />
                                <strong>Mensagem:</strong> {item.content}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhuma carta encontrada.</p>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '200px', marginTop: '10px' }}>
                    <Button variant="outlined" onClick={handlePrev} disabled={pagina === 1}>Anterior</Button>
                    <Button variant="outlined" onClick={handleNext} disabled={pagina === totalPaginas}>Próxima</Button>
                </Box>
            </Box>
        </>
    );
};