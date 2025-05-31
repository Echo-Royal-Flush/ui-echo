import { Box, Typography } from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';

export const TeamCard = ({ name, size, onClick }) => {
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
                '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 4,
                }
            }}
        >
            <GroupsIcon sx={{ fontSize: 40, color: '#c28d19' }} />
            <Box>
                <Typography variant="h6" color="#000000">{name}</Typography>
                <Typography variant="body2" color="#757575">
                    {size} membros
                </Typography>
            </Box>
        </Box>
    );
};