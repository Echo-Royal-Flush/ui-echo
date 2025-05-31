import { Box } from "@mui/material"

export const Header = () => {
    return (
        <Box sx={{
            width: '100%',
            height: '100px',
            backgroundColor: '#7500a8'
        }}>
            <img src="./public/images/logo-light.png" style={{
                width: '80px',
                margin: '10px 0 0 30px'
            }}/>
        </Box>
    )
}