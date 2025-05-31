import { Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterUser = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !jobTitle || !email || !password) {
            setError('Preencha todos os campos.');
            return;
        }

        setError('');

        // Chamar API de cadastro aqui
        alert('Cadastro enviado!');

        navigate('/');
    };

    return (
        <Box sx={{
            background: 'linear-gradient(135deg, #540089 0%, #8e1dc1 40%, #ca78c8 100%)',
            display: 'flex',
            height: '100vh',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Box>
                <form onSubmit={handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>

                    <img
                        src="/images/logo-light.png"
                        alt="Logo Echo"
                        style={{
                            width: '180px',
                            margin: '0 auto 16px auto',
                            display: 'block'
                        }}
                    />

                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={inputStyle}
                    />

                    <input
                        type="text"
                        placeholder="Cargo"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        style={inputStyle}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={inputStyle}
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                    />

                    {error && <p style={{ color: '#c28d19', margin: '8px 0' }}>{error}</p>}

                    <button type="submit"
                        style={{
                            width: '380px',
                            height: '40px',
                            margin: '10px 0',
                            borderRadius: '13px',
                            borderStyle: 'none',
                            padding: '1px 15px',
                            color: 'white',
                            fontWeight: 'bold',
                            backgroundColor: '#c28d19',
                            boxShadow: '0 6px 6px rgba(0, 0, 0, 0.5)'
                        }}>Cadastrar</button>

                    <p style={{ color: '#fff' }}>
                        Já possui conta? <a
                            style={{ textDecoration: 'underline', color: '#fff', cursor: 'pointer' }}
                            onClick={() => navigate('/')}
                        >
                            Entrar
                        </a>
                    </p>
                </form>
            </Box>
        </Box>
    );
};

const inputStyle = {
    width: '350px',
    height: '40px',
    margin: '10px 0',
    borderRadius: '13px',
    borderStyle: 'none',
    padding: '1px 15px'
};
