import { Box } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const navigate = useNavigate();
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
                            fontSize: '25px',
                            fontWeight: 'bold',
                            backgroundColor: '#c28d19',
                            boxShadow: '0 6px 6px rgba(0, 0, 0, 0.5)'
                        }}>Entrar</button>
                    <p style={{ color: '#fff' }}>
                        Não possui conta? <a
                            style={{ textDecoration: 'underline', color: '#fff', cursor: 'pointer' }}
                            onClick={() => navigate('/register')}
                        >
                            Cadastre-se!
                        </a>
                    </p>
                </form>
            </Box>
        </Box>
    )
}