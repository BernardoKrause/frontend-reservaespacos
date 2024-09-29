import { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const TituloLogin = styled.h1`
    color: #004666;
`

const LoginContainer = styled.div`
    
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6vh;

`;

const LabelsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 1.6vh;
 
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    gap: 1vh;
    font-size: 2em;
 
`;

const Input = styled.input`
    background-color: #BCE3F5;
    border: 1px solid gray;
    border-radius: 8px;
    width: 20vw;

    @media (max-width: 768px) {
        width: 80vw;
    }
`;

const SubmitButton = styled.input`
    background-color: #004666;
    border: none;
    border-radius: 24px;
    color: #fff;
    padding: 2vh 4vw;
    font-size: 28px;
    margin-bottom: 6vh;
    align-self: flex-start;

    &:hover {
        cursor: pointer;
    }
`;

const Erro = styled.div`
    margin-top: -2vh;
    font-size: 0.6em;
`;

function Login({ codReserva, situacao }) {
    const [emailUsuario, setEmailUsuario] = useState('');
    const [senhaUsuario, setSenhaUsuario] = useState('');
    const [usuario, setUsuario] = useState(null); // Alterado para começar como `null`
    const [erroEmail, setErroEmail] = useState('');
    const [erroSenha, setErroSenha] = useState('');
    
    
    const navigate = useNavigate();

    // Função para validar o e-mail usando regex
    const validarEmail = (valor) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(valor)) {
            setErroEmail(''); // Limpa o erro se o e-mail for válido
            return true;
        } else {
            setErroEmail('E-mail inválido! Insira um e-mail no formato correto.');
            return false;
        }
    };

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await api.get(`/api/usuario/${codReserva}`);
                setUsuario(response.data[0]); // Supondo que o usuário vem como um array
            } catch (error) {
                console.log("Erro ao buscar usuário: " + error);
            }
        };

        fetchUsuario();
    }, [codReserva]);

    // Função para validar a senha
    const validarSenha = (valor) => {
        if (usuario && parseInt(valor) === parseInt(usuario.cpfusuario)) {
            setErroSenha('');
            return true;
        } else {
            setErroSenha('Email ou senha inválida!');
            return false;
        }
    };

    const [reserva, setReserva] = useState([]);
    useEffect(() => {
        try {
        api
        .get(`/api/reservas/${codReserva}`)
        .then((response) => setReserva(response.data))
        } catch (error) {
        console.log("erro: "+error);
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const urlReserva = `http://localhost:3030/api/reserva/${codReserva}`

        if (!validarSenha(senhaUsuario)) {
            return;
        }

        if (parseInt(situacao) === 1) {
            navigate(`/editar-reserva/${codReserva}/${situacao}`);
        } else if (parseInt(situacao) === 2) {
            try {
                const response = await fetch(urlReserva, {
                    method: 'DELETE', 
                    headers: {
                        'Content-Type': 'application/json', 
                    }
                });
        
                if (response.ok) {
                    alert('Reserva deletada com sucesso!');
                } else {
                    alert('Erro ao deletar a reserva.');
                }
            
                navigate(`/espacos/calendario/${reserva[0].codespaco}`);
            } catch (error) {
                console.error('Erro ao fazer a requisição DELETE:', error);
            }

            
        }
    };

    return (
        <LoginContainer>
            <TituloLogin>Editar Reserva</TituloLogin>
            <Form onSubmit={handleSubmit}>
                <LabelsContainer>
                    <Label>
                        Email
                        <Input 
                            type='text' 
                            value={emailUsuario} 
                            onChange={(e) => {
                                setEmailUsuario(e.target.value);
                                validarEmail(e.target.value);
                            }} 
                            required 
                        />
                        <Erro>{erroEmail && <p style={{ color: 'red' }}>{erroEmail}</p>}</Erro>
                    </Label>
                    <Label>
                        Senha
                        <Input 
                            type='password' 
                            value={senhaUsuario} 
                            onChange={(e) => setSenhaUsuario(e.target.value)} 
                            required 
                        />
                        <Erro>{erroSenha && <p style={{ color: 'red' }}>{erroSenha}</p>}</Erro>
                    </Label>
                </LabelsContainer>
                <SubmitButton type='submit' value="Enviar" />
            </Form>
        </LoginContainer>
    );
}

export default Login;
