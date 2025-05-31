import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';

// Mock de serviços e usuários
const mockServices = [
    { id: "1", name: "Serviço 1" },
    { id: "2", name: "Serviço 2" },
    { id: "3", name: "Serviço 3" },
];

const mockUsers = [
    { id: "1", name: "Ana" },
    { id: "2", name: "João" },
    { id: "3", name: "Carlos" },
    { id: "4", name: "Bianca" },
];

export const RegisterTeam = ({ open, onClose, onSubmit, isEditing = false, initialData = null }) => {
    const [teamName, setTeamName] = useState('');
    const [service, setService] = useState('');
    const [member, setMember] = useState('');
    const [members, setMembers] = useState([]);
    const [error, setError] = useState('');

    // Carrega os dados iniciais se estiver em modo de edição
    useEffect(() => {
        if (open && isEditing && initialData) {
            setTeamName(initialData.name);
            setService(initialData.service?.id || '');
            setMembers(initialData.members || []);
        }
    }, [open, isEditing, initialData]);

    // Resetar campos ao fechar o modal
    useEffect(() => {
        if (!open) {
            setTeamName('');
            setService('');
            setMember('');
            setMembers([]);
            setError('');
        }
    }, [open]);

    const handleAddMember = () => {
        if (member && !members.find(m => m.id === member)) {
            const user = mockUsers.find(u => u.id === member);
            setMembers([...members, user]);
            setMember('');
        }
    };

    const handleRemoveMember = (idx) => {
        setMembers(members.filter((_, i) => i !== idx));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!teamName || !service || members.length === 0) {
            setError('Preencha todos os campos e adicione pelo menos um membro.');
            return;
        }
        setError('');
        if (onSubmit) {
            onSubmit({
                id: isEditing && initialData ? initialData.id : null, // Mantém o ID se for edição
                name: teamName,
                service: mockServices.find(s => s.id === service),
                members,
                size: members.length
            }, isEditing);
        }
        if (onClose) onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ color: '#7500a8', fontWeight: 700 }}>
                {isEditing ? 'Editar Time' : 'Cadastrar Time'}
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Nome do Time"
                        value={teamName}
                        onChange={e => setTeamName(e.target.value)}
                        fullWidth
                        required
                    />
                    <FormControl fullWidth required>
                        <InputLabel id="service-label">Service</InputLabel>
                        <Select
                            labelId="service-label"
                            value={service}
                            label="Service"
                            onChange={e => setService(e.target.value)}
                        >
                            {mockServices.map((s) => (
                                <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FormControl fullWidth>
                            <InputLabel id="member-label">Adicionar membro</InputLabel>
                            <Select
                                labelId="member-label"
                                value={member}
                                label="Adicionar membro"
                                onChange={e => setMember(e.target.value)}
                            >
                                {mockUsers
                                    .filter(u => !members.find(m => m.id === u.id))
                                    .map((u) => (
                                        <MenuItem key={u.id} value={u.id}>{u.name}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        <IconButton
                            color="primary"
                            onClick={handleAddMember}
                            sx={{ background: '#7500a8', color: '#fff', '&:hover': { background: '#5a008a' } }}
                            aria-label="Adicionar membro"
                        >
                            <AddIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ mt: 1 }}>
                        {members.map((m, idx) => (
                            <Box key={m.id} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                <span style={{ flex: 1 }}>{m.name}</span>
                                <Button
                                    size="small"
                                    color="error"
                                    onClick={() => handleRemoveMember(idx)}
                                >
                                    Remover
                                </Button>
                            </Box>
                        ))}
                    </Box>
                    {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button type="submit" variant="contained" sx={{ background: '#7500a8', color: '#fff' }}>
                        {isEditing ? 'Salvar' : 'Cadastrar'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};