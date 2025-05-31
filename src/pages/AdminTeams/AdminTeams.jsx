import { Box, Grid, Typography, Button, Divider } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { TeamCard } from "../../components/TeamCard";

const teams = [
    { name: "Equipe Alpha", size: 8 },
    { name: "Equipe Beta", size: 5 },
    { name: "Equipe Gama", size: 12 },
    { name: "Equipe Delta", size: 7 },
    { name: "Equipe Epsilon", size: 10 },
    { name: "Equipe Zeta", size: 4 },
];

export const AdminTeams = () => {
    return (
        <Box sx={{
            backgroundColor: '#ffffff',
            display: 'flex',
            py: 6,
            px: 2,
            height: '100vh',
            textAlign: 'center',
            justifyContent: 'center'
        }}>
            <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
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
                <Divider sx={{ mb: 4 }} /> {/* Linha divisória */}
                <Grid container spacing={3}>
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
            </Box>
        </Box>
    )
}