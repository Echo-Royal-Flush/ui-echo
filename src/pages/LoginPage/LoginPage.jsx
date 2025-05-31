import { Box } from "@mui/material"
import { useState } from "react";

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Preencha todos os campos.');
            return;
        }

        console.log('Email:', email);
        console.log('Senha:', password);
        setError('');

        // Chamar  API
        alert('Login enviado!');
    };
    return (
        <Box sx={{
            backgroundColor: '#B655F5',
            display: 'flex',
            height: '100vh',
            textAlign: 'center',
            justifyContent: 'center'
        }}>
            <Box>
                <form onSubmit={handleSubmit} 
                    style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                    <h2>Echo</h2>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{

                        }}
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{

                        }}
                    />

                    {error && <p style={{}}>{error}</p>}

                    <button type="submit" style={{}}>Entrar</button>
                </form>
            </Box>
        </Box>
    )
}