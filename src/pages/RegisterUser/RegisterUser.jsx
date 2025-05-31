import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterUser = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [company, setCompany] = useState(''); // Novo estado para a companhia
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]);


    useEffect(() => {
        fetch("http://localhost:8080/companies")
            .then(res => res.json())
            .then(data => setCompanies(data))
            .catch(() => setCompanies([]));
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !jobTitle || !email || !password || !company) {
            setError('Preencha todos os campos.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await fetch(import.meta.env.VITE_API_URL + '/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    name,
                    role: 'EMPLOYEE',
                    position: jobTitle,
                    company
                })
                
            });

            if (!response.ok) {
                // tenta ler mensagem da API, senão mostra erro padrão
                const resp = await response.json().catch(() => ({}));
                setError(resp.message || 'Erro ao cadastrar. Tente novamente.');
                setLoading(false);
                return;
            }

            // Usuário cadastrado com sucesso!
            navigate('/');
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

                    {/* Dropdown de Companhias */}
                    <select
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        style={{
                            ...inputStyle,
                            backgroundColor: '#fff',
                            appearance: 'auto',
                            width: '375px',
                        }}
                        required
                    >
                        <option value="" disabled>Selecione uma empresa</option>
                        {companies.map((comp) => (
                            <option key={comp.id} value={comp.id}>
                                {comp.name}
                            </option>
                        ))}
                    </select>

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
