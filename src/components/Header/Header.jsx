import { Box } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const Header = () => {

    const navigate = useNavigate();
    return (
        <Box sx={{
            width: '100%',
            height: '85px',
            backgroundColor: '#7500a8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <img src="./public/images/logo-light.png" style={{
                width: '80px',
                margin: 0
            }} />
            <img src="./public/images/profile.png"
                onClick={() => navigate('/perfil')}
                style={{
                    width: '55px',
                    height: '55px',
                    position: 'absolute',
                    right: '0',           // Alinha à esquerda da posição relativa mais próxima
                    top: '0',            // (opcional) posiciona no topo
                    margin: '15px 20px 20px 0',
                }} />
        </Box>
    )
}