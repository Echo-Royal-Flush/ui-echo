import { Box, Typography } from "@mui/material";
import positiveDecor from '../../../public/images/positive-card-decor.png';
import negativeDecor from '../../../public/images/negative-card-decor.png';
import PositiveIcon from '@mui/icons-material/ThumbUpAlt';
import NegativeIcon from '@mui/icons-material/ThumbDownAlt';

export const PokerCard = ({ type, categoria, onDragStart }) => {
    const decor = type === 'POSITIVE' ? positiveDecor : negativeDecor;
    const typeName = type === 'POSITIVE' ? 'POSITIVA' : 'CRÍTICA';

    // Gradientes pastel
    const background =
        type === 'POSITIVE'
            ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 60%, #e0f7fa 100%)'
            : 'linear-gradient(135deg, #ff5858 0%, #ff9a9e 60%, #fff0f3 100%)';
    return (
        <Box
            draggable
            onDragStart={onDragStart}
            sx={{
                width: 180,
                height: 280,
                borderRadius: 4,
                boxShadow: 4,
                background,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'grab',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                userSelect: 'none',
            }}
        >
            {/* Decoração */}
            <img
                src={decor}
                alt=""
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 1,
                }}
            />

            {/* Conteúdo da carta */}
            <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1, color: '#368851' }}>
                    {categoria}
                </Typography>
                <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                    {type === 'POSITIVE'
                        ? <PositiveIcon fontSize="inherit" sx={{ color: '#368851', fontSize: 50, opacity: '60%' }} />
                        : <NegativeIcon fontSize="inherit" sx={{ color: '#F40303', fontSize: 50, opacity: '60%' }} />
                    }
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{ mt: 2, color: type === 'POSITIVE' ? '#368851' : '#F40303' }}>
                    {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
                </Typography>
            </Box>
        </Box>
    );
};