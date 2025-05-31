import { Box, Grid, Typography, Button, Divider } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { TeamCard } from "../../components/TeamCard/TeamCard";
import { Header } from "../../components/Header/Header";
import { ServiceCard } from "../../components/ServiceCard/ServiceCard";
import { useState } from "react";
import { RegisterTeam } from "../RegisterTeam/RegisterTeam";

const services = [
    { name: "Serviço 1", size: 3 },
    { name: "Serviço 2", size: 6 },
    { name: "Serviço 3", size: 2 },
];

const teamsData = [
    { id: '1', name: "Equipe Alpha", size: 8 },
    { id: '2', name: "Equipe Beta", size: 5 },
    { id: '3', name: "Equipe Gama", size: 12 },
    { id: '4', name: "Equipe Delta", size: 7 },
    { id: '5', name: "Equipe Epsilon", size: 10 },
    { id: '6', name: "Equipe Zeta", size: 4 },
];

export const FeedbackSelection = () => {
    const [registerModalOpen, setRegisterModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTeam, setCurrentTeam] = useState(null);
    const [teams, setTeams] = useState(teamsData);

    // Função para abrir o modal de edição
    const handleEditTeam = (team) => {
        setCurrentTeam(team);
        setIsEditing(true);
        setRegisterModalOpen(true);
    };

    return (
        <Box sx={{
            backgroundColor: '#ffffff',
        }}>
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
                        onClick={() => setRegisterModalOpen(true)}
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
                                team={team}
                                onClick={() => alert(`Equipe: ${team.name}`)}
                                onEditClick={handleEditTeam}
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
                    // Lógica para atualizar ou adicionar time
                    if (isEdit) {
                        // Atualizar o time existente
                        const updatedTeams = teams.map(t =>
                            t.id === data.id ? data : t
                        );
                        setTeams(updatedTeams);
                    } else {
                        // Adicionar novo time
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
    )
}