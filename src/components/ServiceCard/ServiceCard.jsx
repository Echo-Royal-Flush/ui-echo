import { Box, Typography } from "@mui/material";
import ServiceIcon from '@mui/icons-material/Construction';

export const ServiceCard = ({ name, onClick }) => {
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
            <ServiceIcon sx={{ fontSize: 40, color: '#c28d19' }} />
            <Box>
                <Typography variant="h6" color="#000000">{name}</Typography>
            </Box>
        </Box>
    );
};