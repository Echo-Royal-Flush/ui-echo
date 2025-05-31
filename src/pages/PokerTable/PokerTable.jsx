import { Box, Button, Select, MenuItem, FormControl, InputLabel, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useState } from "react";
import { Header } from "../../components/Header/Header";
import { PokerCard } from "../../components/PokerCard/PokerCard";

const positiveCardBack = "/images/positive-card-back.png";
const negativeCardBack = "/images/negative-card-back.png";

export const PokerTable = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [selectedMember, setSelectedMember] = useState(users[0]?.id || "");
    const [description, setDescription] = useState("");
    const [descModalOpen, setDescModalOpen] = useState(false);

    const [services, setServices] = useState([]);
    const [loadingServices, setLoadingServices] = useState(true);
    const [errorServices, setErrorServices] = useState(null);

    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [errorUsers, setErrorUsers] = useState(null);

    const categories = ["Lenda", "Épico", "Raro", "Comum", null];
    const cardsId = new Map([
        [null, "44444444-4444-4444-4444-444444444444"],
        ["Lenda", "44444444-4444-4444-4444-444444444445"],
        ["Épico", "44444444-4444-4444-4444-444444444446"],
        ["Raro", "44444444-4444-4444-4444-444444444447"],
        ["Comum", "44444444-4444-4444-4444-444444444448"],
    ]);

    const isTeam = localStorage.getItem('isTeam');
    const teamId = localStorage.getItem('teamId');
    const serviceId = localStorage.getItem('serviceId');
    const userId = localStorage.getItem('id');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_URL + "/services");

                if (!response.ok) throw new Error("Erro ao buscar serviços");
                const data = await response.json();
                setServices(data);
            } catch (err) {
                setErrorServices(err.message);
            } finally {
                setLoadingServices(false);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_URL + `/users-teams/${teamId}/users`);

                if (!response.ok) throw new Error("Erro ao buscar usuários do time");
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setErrorUsers(err.message);
            } finally {
                setLoadingUsers(false);
            }
        };

        if (open) {
            fetchServices();
            fetchUsers();
        }
    }, [isTeam]);


    // Ao clicar para submeter, abre o modal se necessário
    const handleSubmitCard = () => {
        if (
            (selectedCard.type === "CRITICISM" && !description) ||
            (selectedCard.type === "POSITIVE")
        ) {
            setDescModalOpen(true);
        } else {
            setSelectedCard(null);
            setDescription("");
        }
    };

    // Quando confirmar no modal
    const handleConfirmDescription = async () => {
        const payload = {
            idCard: cardsId.get(selectedCategory),
            idEvaluator: userId,
            idEvaluated: isTeam ? selectedMember : serviceId,
            description: description || null,
            isAnon: false,
            type: isTeam ? "USER" : "SERVICE"
        };

        try {
            const response = await fetch(import.meta.env.VITE_API_URL + '/feedbacks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Erro ao realizar feedback');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setDescModalOpen(false);
            setSelectedCard(null);
            setDescription("");
        }
    };

    tableType = "team"; // Forçando o tipo de mesa para "Team" para simplificar o exemplo

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#ffffff',
                backgroundImage: 'url("/images/table.png")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                position: 'relative',
            }}
        >
            <Header />

            {/* Montinho positivo - canto inferior esquerdo */}
            <Box sx={{
                position: 'fixed',
                left: 32,
                bottom: 32,
                zIndex: 10,
                width: 200,
                height: 300,
                display: 'flex',
                alignItems: 'flex-end',
            }}>
                <Box
                    onClick={() => setSelectedCard({ type: "POSITIVE" })}
                    sx={{
                        position: 'relative',
                        cursor: 'pointer',
                        width: 180,
                        height: 280,
                    }}
                >
                    {/* Cartas "atrás" para efeito de montinho */}
                    <Box sx={{
                        position: 'absolute',
                        top: 14,
                        left: 14,
                        width: 180,
                        height: 280,
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                        background: 'rgba(0,0,0,0.06)',
                        zIndex: 0,
                    }} />
                    <Box sx={{
                        position: 'absolute',
                        top: 7,
                        left: 7,
                        width: 180,
                        height: 280,
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.13)',
                        background: 'rgba(0,0,0,0.09)',
                        zIndex: 1,
                    }} />
                    {/* Topo do baralho: carta virada */}
                    <img
                        src={positiveCardBack}
                        alt="Carta positiva virada"
                        style={{
                            width: 180,
                            height: 280,
                            borderRadius: '12px',
                            position: 'relative',
                            zIndex: 2,
                            boxShadow: '0 4px 16px rgba(0,0,0,0.18)'
                        }}
                    />
                </Box>
            </Box>

            {/* Montinho crítica - canto inferior direito */}
            <Box sx={{
                position: 'fixed',
                right: 32,
                bottom: 32,
                zIndex: 10,
                width: 200,
                height: 300,
                display: 'flex',
                alignItems: 'flex-end',
            }}>
                <Box
                    onClick={() => setSelectedCard({ type: "CRITICISM", categoria: criticismDeck[0].categoria })}
                    sx={{
                        position: 'relative',
                        cursor: 'pointer',
                        width: 180,
                        height: 280,
                    }}
                >
                    {/* Cartas "atrás" para efeito de montinho */}
                    <Box sx={{
                        position: 'absolute',
                        top: 14,
                        left: 14,
                        width: 180,
                        height: 280,
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                        background: 'rgba(0,0,0,0.06)',
                        zIndex: 0,
                    }} />
                    <Box sx={{
                        position: 'absolute',
                        top: 7,
                        left: 7,
                        width: 180,
                        height: 280,
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.13)',
                        background: 'rgba(0,0,0,0.09)',
                        zIndex: 1,
                    }} />
                    {/* Topo do baralho: carta negativa virada */}
                    <img
                        src={negativeCardBack}
                        alt="Carta crítica virada"
                        style={{
                            width: 180,
                            height: 280,
                            borderRadius: '12px',
                            position: 'relative',
                            zIndex: 2,
                            boxShadow: '0 4px 16px rgba(0,0,0,0.18)'
                        }}
                    />
                </Box>
            </Box>

            {/* Carta selecionada no centro */}
            {selectedCard && (
                <Box sx={{
                    position: 'fixed',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    zIndex: 20,
                }}>
                    {/* Se for avaliação de time, mostra dropdown de membro */}
                    {isTeam && (
                        <FormControl sx={{ mb: 7, mt: -9.5, minWidth: 180 }}>
                            <InputLabel id="membro-label" sx={{
                                color: '#7500a8',
                                '&.Mui-focused': { color: '#7500a8' }
                            }}>Membro</InputLabel>
                            <Select
                                labelId="membro-label"
                                value={selectedMember}
                                label="Membro"
                                onChange={e => setSelectedMember(e.target.value)}
                                sx={{
                                    backgroundColor: '#ffffff',
                                    color: '#7500a8',
                                    '.MuiOutlinedInput-notchedOutline': { borderColor: '#7500a8' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#7500a8' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#7500a8' },
                                    borderRadius: '25px'
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: { color: '#7500a8' }
                                    }
                                }}
                            >
                                {users.map((m) => (
                                    <MenuItem key={m.id} value={m.id} sx={{ color: '#7500a8' }}>
                                        {m.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}

                    {/* Se for positiva, mostra dropdown de categoria */}
                    {selectedCard.type === "POSITIVE" && (
                        <FormControl sx={{ mb: 2, minWidth: 180 }}>
                            <InputLabel id="categoria-label" sx={{
                                color: '#c28d19',
                                '&.Mui-focused': { color: '#c28d19' }
                            }}>Categoria</InputLabel>
                            <Select
                                labelId="categoria-label"
                                value={selectedCategory}
                                label="Categoria"
                                onChange={e => setSelectedCategory(e.target.value)}
                                sx={{
                                    color: '#c28d19',
                                    '.MuiOutlinedInput-notchedOutline': { borderColor: '#c28d19' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#c28d19' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#c28d19' },
                                    borderRadius: '25px'

                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: { color: '#c28d19' }
                                    }
                                }}
                            >
                                {categories.map((cat) => (
                                    <MenuItem key={cat} value={cat} sx={{ color: '#c28d19' }}>
                                        {cat}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                    <PokerCard
                        type={selectedCard.type}
                        categoria={selectedCard.type === "POSITIVE" ? selectedCategory : null}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, backgroundColor: '#7500a8', color: '#fff' }}
                        onClick={handleSubmitCard}
                    >
                        Submeter carta
                    </Button>
                </Box>
            )}

            {/* Modal para descrição */}
            <Dialog open={descModalOpen} onClose={() => {
                setDescModalOpen(false);
                setDescription(""); // Limpa o campo ao fechar
            }}>
                <DialogTitle>
                    {selectedCard?.type === "CRITICISM"
                        ? "Descreva brevemente o motivo da crítica"
                        : "Descreva brevemente (opcional)"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Descrição"
                        type="text"
                        fullWidth
                        multiline
                        minRows={2}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required={selectedCard?.type === "CRITICISM"}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setDescModalOpen(false);
                        setDescription(""); // Limpa o campo ao fechar
                    }}>Cancelar</Button>
                    <Button
                        onClick={handleConfirmDescription}
                        disabled={selectedCard?.type === "CRITICISM" && !description}
                        variant="contained"
                        sx={{ backgroundColor: '#7500a8', color: '#fff' }}
                    >
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};