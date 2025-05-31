import { Box } from "@mui/material"

export const Header = () => {
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
        </Box>
    )
}