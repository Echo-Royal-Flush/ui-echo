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
            background: 'linear-gradient(135deg, #540089 0%, #8e1dc1 40%, #ca78c8 100%)',
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
                            width: '350px',
                            height: '40px',
                            margin: '10px 0',
                            borderRadius: '13px',
                            borderStyle: 'none',
                            padding: '1px 15px'
                        }}
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '350px',
                            height: '40px',
                            margin: '10px 0',
                            borderRadius: '13px',
                            borderStyle: 'none',
                            padding: '1px 15px'
                        }}
                    />

                    {error && <p style={{}}>{error}</p>}

                    <button type="submit" 
                        style={{
                            width: '380px',
                            height: '40px',
                            margin: '10px 0',
                            borderRadius: '13px',
                            borderStyle: 'none',
                            padding: '1px 15px',
                            backgroundColor: '#00B27F',
                            boxShadow: '0 6px 6px rgba(0, 0, 0, 0.5)'
                        }}>Entrar</button>
                        <p>Não possui conta? <a style={{textDecoration: 'none'}} href="">Cadastre-se!</a></p>
                </form>
            </Box>
        </Box>
    )
}