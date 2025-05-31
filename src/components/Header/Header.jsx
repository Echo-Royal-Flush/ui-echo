import { Box, IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom"
import ProfileIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const Header = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{
            width: '100%',
            height: '85px',
            backgroundColor: '#7500a8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
        }}>
            {/* Botão de voltar */}
            <IconButton
                onClick={() => navigate(-1)}
                sx={{
                    position: 'absolute',
                    left: 16,
                    color: '#fff',
                    background: 'rgba(117,0,168,0.08)',
                    '&:hover': { background: 'rgba(117,0,168,0.18)' }
                }}
                aria-label="Voltar"
            >
                <ArrowBackIosNewIcon />
            </IconButton>
            <img
                src="/images/logo-light.png"
                style={{
                    width: '80px',
                    margin: 0
                }}
                alt="Logo"
            />
            <ProfileIcon
                onClick={() => navigate('/perfil')}
                sx={{
                    color: '#fff',
                    width: 55,
                    height: 55,
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    margin: '15px 20px 20px 0',
                    cursor: 'pointer'
                }}
            />
        </Box>
    )
}