import { useEffect, useState } from "react";
import { Box, Grid, Typography, Button, Divider, CircularProgress, Alert } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { TeamCard } from "../../components/TeamCard/TeamCard";
import { Header } from "../../components/Header/Header";
import { ServiceCard } from "../../components/ServiceCard/ServiceCard";
import { RegisterTeam } from "../RegisterTeam/RegisterTeam";
import { Navigate } from "react-router-dom";
import dotenv from 'dotenv';

dotenv.config();

export const FeedbackSelection = () => {
    const [services, setServices] = useState([]);
    const [teams, setTeams] = useState([]);
    const [loadingServices, setLoadingServices] = useState(true);
    const [loadingTeams, setLoadingTeams] = useState(true);
    const [errorServices, setErrorServices] = useState(null);
    const [errorTeams, setErrorTeams] = useState(null);

    const [registerModalOpen, setRegisterModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTeam, setCurrentTeam] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_URL + "/services");
                if (!response.ok) throw new Error(`Erro ao buscar serviços: ${response.status}`);
                const data = await response.json();
                setServices(data);
            } catch (err) {
                setErrorServices(err.message);
            } finally {
                setLoadingServices(false);
            }
        };

        const fetchTeams = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_URL + "/teams");
                if (!response.ok) throw new Error(`Erro ao buscar equipes: ${response.status}`);
                const data = await response.json();
                setTeams(data);
            } catch (err) {
                setErrorTeams(err.message);
            } finally {
                setLoadingTeams(false);
            }
        };

        fetchServices();
        fetchTeams();
    }, []);

    const handleOpenTeam = (team) => {
        localStorage.setItem('teamId', JSON.stringify(team.id));
        localStorage.setItem('isTeam', true);
        Navigate("/gametable");
    }

    const handleOpenService = (service) => {
        localStorage.setItem('serviceId', JSON.stringify(service.id));
        localStorage.setItem('isTeam', false);
        Navigate("/gametable");
    }

    const handleEditTeam = (team) => {
        setCurrentTeam(team);
        setIsEditing(true);
        setRegisterModalOpen(true);
    };

    const userRole = JSON.parse(localStorage.getItem('role'));

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
                    {userRole === 'ADMIN' && (
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{ backgroundColor: '#c28d19' }}
                            onClick={() => setRegisterModalOpen(true)}
                        >
                            Adicionar
                        </Button>
                    )}
                </Box>
                <Divider sx={{ mb: 4 }} />

                {loadingTeams ? (
                    <CircularProgress />
                ) : errorTeams ? (
                    <Alert severity="error">{errorTeams}</Alert>
                ) : (
                    <Grid container spacing={3} sx={{ mb: 8 }}>
                        {teams.map((team, idx) => (
                            <Grid item xs={12} sm={6} md={4} key={idx}>
                                <TeamCard
                                    name={team.name}
                                    size={team.length || team.size} // adaptável ao que vier da API
                                    team={team}
                                    onClick={() => handleOpenTeam(team)}
                                    onEditClick={handleEditTeam}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}

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

                {loadingServices ? (
                    <CircularProgress />
                ) : errorServices ? (
                    <Alert severity="error">{errorServices}</Alert>
                ) : (
                    <Grid container spacing={3}>
                        {services.map((service, idx) => (
                            <Grid item xs={12} sm={6} md={4} key={idx}>
                                <ServiceCard
                                    name={service.name}
                                    onClick={() => handleOpenService(service)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>

            {/* Modal de cadastro/edição de time */}
            <RegisterTeam
                open={registerModalOpen}
                onClose={() => {
                    setRegisterModalOpen(false);
                    setIsEditing(false);
                    setCurrentTeam(null);
                }}
                onSubmit={(data, isEdit) => {
                    if (isEdit) {
                        const updatedTeams = teams.map(t =>
                            t.id === data.id ? data : t
                        );
                        setTeams(updatedTeams);
                    } else {
                        setTeams([...teams, { ...data, id: Date.now().toString() }]);
                    }
                    setRegisterModalOpen(false);
                    setIsEditing(false);
                    setCurrentTeam(null);
                }}
                isEditing={isEditing}
                initialData={currentTeam}
            />
        </Box>
    );
};