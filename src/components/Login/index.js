import { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../../services/api';

const LoginContainer = styled.div`
    display: flex;
    align-items: center;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 6vh;
`

const LabelsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 1.6vh;
`

const Label = styled.label`
    display: flex;
    flex-direction: column;
    gap: 1vh;
    font-size: 2em;
`

const Input = styled.input`
    background-color: #BCE3F5;
    border: 1px solid gray;
    border-radius: 8px;
    width: 20vw;
`

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
`

const Erro = styled.div`
    margin-top: -2vh;
    font-size: 0.6em;
`

function Login({ codReserva }) {
    const [emailUsuario, setEmailUsuario] = useState('');
    const [senhaUsuario, setSenhaUsuario] = useState('');

    const [erroEmail, setErroEmail] = useState('');
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

    

    const [usuario, setUsuario] = useState([]);
    useEffect(() => {
        try {
        api
        .get(`/api/usuario/${codReserva}`)
        .then((response) => setUsuario(response.data))
        } catch (error) {
        console.log("erro: "+error);
        }
    }, [codReserva]);

    const [erroSenha, setErroSenha] = useState('');
    // Função para validar o e-mail usando regex
    const validarSenha = (valor) => {
        if (parseInt(valor) === parseInt(usuario[0].cpfusuario)) {
            setErroSenha('');
            return true;
        } else {
            setErroSenha('Senha inválida!');
            return false;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if(!validarSenha(senhaUsuario)) {
            return false;
        } 
    
        window.location.reload();
      }

    return (
        <LoginContainer>
            <Form onSubmit={handleSubmit}>
            <LabelsContainer>
                <Label>
                    Email
                    <Input type='text' value={emailUsuario} onChange={(e) => {
                        setEmailUsuario(e.target.value);
                        validarEmail(e.target.value);
                        }} required />
                    <Erro>{erroEmail && <p style={{ color: 'red' }}>{erroEmail}</p>}</Erro>
                </Label>
                <Label>
                    Senha
                    <Input type='password' value={senhaUsuario} onChange={(e) => {
                        setSenhaUsuario(e.target.value);
                        
                    }} required />
                    <Erro>{erroSenha && <p style={{ color: 'red' }}>{erroSenha}</p>}</Erro>
                </Label>
            </LabelsContainer>
            <SubmitButton type='submit' value="Enviar"/>
            </Form>
        </LoginContainer>
    );
}

export default Login;