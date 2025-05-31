import { useEffect, useState } from "react";
import { Box, Grid, Typography, Button, Divider, CircularProgress, Alert } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { TeamCard } from "../../components/TeamCard/TeamCard";
import { Header } from "../../components/Header/Header";
import { ServiceCard } from "../../components/ServiceCard/ServiceCard";

export const FeedbackSelection = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Dados mockados de equipes
    const teams = [
        { name: "Equipe Alpha", size: 8 },
        { name: "Equipe Beta", size: 5 },
        { name: "Equipe Gama", size: 12 },
        { name: "Equipe Delta", size: 7 },
        { name: "Equipe Epsilon", size: 10 },
        { name: "Equipe Zeta", size: 4 },
    ];

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch("http://localhost:8080/services");

                if (!response.ok) {
                    throw new Error(`Erro ao buscar serviços: ${response.status}`);
                }

                const data = await response.json();
                setServices(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <Box sx={{ backgroundColor: '#ffffff' }}>
            <Header />
            <Box sx={{ maxWidth: 1200, mx: 'auto', marginTop: '40px' }}>
                {/* Equipes */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Typography
                        variant="h4"
                        color="#7500a8"
                        sx={{ flexGrow: 1, textAlign: 'left', fontWeight: 'bold' }}
                    >
                        Equipes
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ backgroundColor: '#c28d19' }}
                        onClick={() => alert('Cadastrar novo time')}
                    >
                        Adicionar
                    </Button>
                </Box>
                <Divider sx={{ mb: 4 }} />
                <Grid container spacing={3} sx={{ mb: 8 }}>
                    {teams.map((team, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={idx}>
                            <TeamCard
                                name={team.name}
                                size={team.size}
                                onClick={() => alert(`Equipe: ${team.name}`)}
                            />
                        </Grid>
                    ))}
                </Grid>

                {/* Serviços */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Typography
                        variant="h4"
                        color="#7500a8"
                        sx={{ flexGrow: 1, textAlign: 'left', fontWeight: 'bold' }}
                    >
                        Serviços
                    </Typography>
                </Box>
                <Divider sx={{ mb: 4 }} />

                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : (
                    <Grid container spacing={3}>
                        {services.map((service, idx) => (
                            <Grid item xs={12} sm={6} md={4} key={idx}>
                                <ServiceCard
                                    name={service.name}
                                    onClick={() => alert(`Serviço: ${service.name}`)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Box>
    );
};