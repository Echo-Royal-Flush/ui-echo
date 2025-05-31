import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';

export const RegisterTeam = ({ open, onClose, onSubmit, isEditing = false }) => {
    const [teamName, setTeamName] = useState('');
    const [service, setService] = useState('');
    const [services, setServices] = useState([]);
    const [setLoadingServices] = useState(true);
    const [setErrorServices] = useState(null);
    const [member, setMember] = useState('');
    const [members, setMembers] = useState([]);
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    const [setLoadingUsers] = useState(true);
    const [setErrorUsers] = useState(null);


    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch("http://localhost:8080/services");
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
                const response = await fetch("http://localhost:8080/users");
                if (!response.ok) throw new Error("Erro ao buscar usuários");
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
    }, [open]);


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
            const user = users.find(u => u.id === member);
            setMembers([...members, user]);
            setMember('');
        }
    };

    const handleRemoveMember = (idx) => {
        setMembers(members.filter((_, i) => i !== idx));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!teamName || !service || members.length === 0) {
            setError('Preencha todos os campos e adicione pelo menos um membro.');
            return;
        }
        setError('');

        const payload = {
            name: teamName,
            length: members.length,
            service: services.find(s => s.id === service), // precisa enviar o objeto completo
            members: members.map(m => m.id), // objetos completos dos membros
            companyId: JSON.parse(localStorage.getItem('companyId'))
        };

        try {
            const response = await fetch('http://localhost:8080/teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Erro ao criar o time');
            }

            const newTeam = await response.json();
            if (onSubmit) onSubmit(newTeam, isEditing);
            if (onClose) onClose();
        } catch (err) {
            setError(err.message);
        }
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
                            {services.map((s) => (
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
                                {users
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