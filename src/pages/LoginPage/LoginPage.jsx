import { Box, Button } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Preencha todos os campos.');
            return;
        }

        setError('');

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (!response.ok) {
                // tenta ler mensagem da API, senão mostra erro padrão
                const resp = await response.json().catch(() => ({}));
                setError(resp.message || 'Erro ao cadastrar. Tente novamente.');
                setLoading(false);
                return;
            }

            const data = await response.json();
            localStorage.setItem('email', JSON.stringify(data.email));
            localStorage.setItem('role', JSON.stringify(data.role));
            localStorage.setItem('companyId', JSON.stringify(data.companyId));
            localStorage.setItem('token', JSON.stringify(data.token));
            localStorage.setItem('id', JSON.stringify(data.id));

            navigate('/teams');
        } catch (err) {
            setError('Erro de conexão com o servidor.');
            setLoading(false);
        }
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

                    <Button type="submit"
                        variant="contained"
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
                        }}>Entrar</Button>
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