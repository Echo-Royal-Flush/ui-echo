import { Box, Typography, IconButton } from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const TeamCard = ({ name, size, onClick, onEditClick, team }) => {
    const handleEditClick = (e) => {
        e.stopPropagation(); // Evita que o clique propague para o card inteiro
        if (onEditClick) onEditClick(team);
    };

    const userRole = JSON.parse(localStorage.getItem('role'));

    return (
        <Box
            onClick={onClick}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                backgroundColor: ' #ffffff',
                borderRadius: 2,
                boxShadow: 2,
                p: 2,
                cursor: 'pointer',
                transition: 'transform 0.1s',
                position: 'relative',
                '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 4,
                }
            }}
        >
            {/* Ícone à esquerda */}
            <GroupsIcon sx={{ fontSize: 40, color: '#c28d19', flexShrink: 0 }} />

            {/* Conteúdo central */}
            <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                <Typography variant="h6" color="#000000" noWrap>{name}</Typography>
                <Typography variant="body2" color="#757575">
                    {size} membros
                </Typography>
            </Box>

            {/* Botão à direita */}
            {userRole === 'ADMIN' && (
                <IconButton
                    sx={{
                        color: '#7500a8',
                        flexShrink: 0,
                        ml: 1
                    }}
                    onClick={handleEditClick}
                    aria-label="editar"
                >
                    <MoreVertIcon />
                </IconButton>
            )}
        </Box>
    );
};