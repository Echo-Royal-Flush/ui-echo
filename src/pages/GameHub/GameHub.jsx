import { Box } from "@mui/material"
import { Header } from "../../components/Header/Header"
import { ViewCard } from "../../components/ViewCard/ViewCard"
import { PlayCard } from "../../components/PlayCard/PlayCard"

export const GameHub = () => {
    return (
        <Box>
            <Header />
            <Box sx={{
                display: 'flex', 
                width: '60%',
                margin: '0 auto'  
            }}>
               <ViewCard />
               <PlayCard />
            </Box>
        </Box>
    )
}