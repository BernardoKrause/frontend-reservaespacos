import Header from '../components/Header';
import Footer from '../components/Footer';

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import api from '../services/api';

const RealizarReservaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 16vh 0 0 0;
  font-weight: 600;
  font-size: 20px;
`

const LabelsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const Label = styled.label`
    display: flex;
    flex-direction: column;
    gap: 1vh;
    width: 48%;
`

const Input = styled.input`
    background-color: #BCE3F5;
    border: 1px solid gray;
    border-radius: 8px;
`

const InputSelect = styled.select`
    border: 1px solid gray;
    border-radius: 8px;
    background-color: #BCE3F5;
`

const LabelCheck = styled.label`
    display: flex;
    margin: 2vh 0 2vh 0;
`

const SubmitButton = styled.input`
    background-color: #004666;
    border: none;
    border-radius: 24px;
    color: #fff;
    padding: 2vh 4vw;
    font-size: 28px;
    margin-bottom: 6vh;

    &:hover {
        cursor: pointer;
    }
`

const Erro = styled.div`
    font-size: 0.6em;
`

function RealizarReserva() {
    // declaração dos dados (informações a serem inseridos)
  const [nomeEspaco, setNomeEspaco] = useState('');
  const [tipoEspaco, setTipoEspaco] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [telefoneUsuario, setTelefoneUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [cpfUsuario, setCpfUsuario] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataReserva, setDataReserva] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaTermino, setHoraTermino] = useState('');

  // pega os espaços do banco de dados e armazena no vetor
  const [espacos, setEspacos] = useState([]);
  useEffect(() => {
    try {
      api
      .get('/api/espacos/')
      .then((response) => setEspacos(response.data))
    } catch (error) {
      console.log("erro: "+error);
    }
  }, []);

  const [codEspacoAtual, setCodEspacoAtual] = useState(1);
  function getEspacoAtual (valorAtual) {
    for (let i = 0; i < espacos.length; i++) { 
        if (espacos[i].nomeespaco === valorAtual) {
            setCodEspacoAtual(espacos[i].codespaco)
        }
      }
  }

  // pega os espaços do banco de dados e armazena no vetor
  const [tiposEspacos, setTiposEspacos] = useState([]);
  useEffect(() => {
    try {
      api
      .get(`/api/tipos/espaco/${codEspacoAtual}`)
      .then((response) => setTiposEspacos(response.data))
    } catch (error) {
      console.log("erro: "+error);
    }
  }, [codEspacoAtual]);

  const [codTipo, setCodTipo] = useState(1) ///////////////////////////////
  function getIdTipoEspacoAtual (valorAtual) {
    for (let i = 0; i< tiposEspacos.length; i++) {
      if (tiposEspacos[i].nometipo === valorAtual) {
        setCodTipo(tiposEspacos[i].codtipo);
      }
    }
  }
  
  const [erroTelefone, setErroTelefone] = useState('');
  // Função para validar o telefone usando regex
  const validarTelefone = (valor) => {
    const telefoneRegex = /^\d{11}$/; // 
    if (telefoneRegex.test(valor)) {
      setErroTelefone(''); 
      return true;
    } else {
      setErroTelefone('Telefone inválido! Permitido apenas números (11 dígitos).');
      return false;
    }
  };

  const [erroCPF, setErroCPF] = useState('');
  // Função para validar o CPF usando regex
  const validarCPF = (valor) => {
    const cpfRegex = /^\d{11}$/; // 
    if (cpfRegex.test(valor)) {
      setErroCPF(''); 
      return true;
    } else {
      setErroCPF('CPF inválido! Permitido apenas números (11 dígitos).');
      return false;
    }
  };

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

    // pega a data de amanhã
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];

    const [reservasEspaco, setReservasEspaco] = useState([]);
    useEffect(() => {
      try {
        api
        .get(`/api/reservas/${codEspacoAtual}/${codTipo}`)
        .then((response) => setReservasEspaco(response.data))
      } catch (error) {
        console.log("erro: "+error);
      }
    }, [codEspacoAtual, codTipo]);
    
    function verificaReserva (dataValue,horaInicioValue,horaTerminoValue) {
      return reservasEspaco.some(reserva => {
        const tamanhoData = dataValue.length;
        const dataReservaFeita = reserva.datareserva.slice(0, tamanhoData);
        const horaInicioFormatada = horaInicioValue+':00';
        const horaTerminoFormatada = horaTerminoValue+':00';

        return (dataReservaFeita === dataValue) && (((horaInicioFormatada === reserva.horainicio) && (horaTerminoFormatada === reserva.horatermino))
        || ((horaInicioFormatada >= reserva.horainicio && horaInicioFormatada <= reserva.horatermino) 
        || (horaTerminoFormatada >= reserva.horainicio && horaTerminoFormatada <= reserva.horatermino)));
      });
    }

  // envia os dados para o banco de dados
  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = 'http://localhost:3030/api/reservas';
    const codEspaco = codEspacoAtual
    const data = { dataReserva, descricao, horaInicio, horaTermino, codEspaco, codTipo }

    if (!(validarTelefone(telefoneUsuario) && validarEmail(emailUsuario) && validarCPF(cpfUsuario))) {
      return alert('Erro: Verifique os campos informados.');      
    } else if (verificaReserva(dataReserva, horaInicio, horaTermino)) {
      return alert('ERRO: Já existe uma reserva nesse espaço e nesse mesmo horário!');
    }else {
      alert('Formulário enviado com sucesso!');
    }
    
    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));

    window.location.reload();
  }

  return (
    <RealizarReservaContainer className="RealizarReserva">
        <Header />
        <form onSubmit={handleSubmit}>
            <LabelsContainer>
                <Label>
                    Espaço Esportivo
                    <InputSelect value={nomeEspaco} onChange={(e) => {
                        setNomeEspaco(e.target.value);
                        getEspacoAtual(e.target.value);
                        }} required>
                        <option value="">Selecione uma opção</option>
                        {espacos.map((espaco, i) => <option key={i} value={espaco.nomeespaco}>{espaco.nomeespaco}</option>)}
                    </InputSelect>
                </Label>
                <Label>
                    Tipo do Espaço
                    <InputSelect value={tipoEspaco} onChange={(e) => {
                      setTipoEspaco(e.target.value);
                      getIdTipoEspacoAtual(e.target.value);
                    }} required>
                        <option value="">Selecione uma opção</option>
                        {tiposEspacos.map((tipoespaco, i) => <option key={i} value={tipoespaco.nometipo}>{tipoespaco.nometipo}</option>)}
                    </InputSelect>
                </Label>
            </LabelsContainer>
            <h4>Informações do solicitante</h4>
            <LabelsContainer>
                <Label>
                    Nome Completo
                    <Input type='text' value={nomeUsuario} onChange={(e) => setNomeUsuario(e.target.value)} required/>
                </Label>
                <Label>
                    Telefone para contato
                    <Input type='text' value={telefoneUsuario} onChange={(e) => {
                                                                            setTelefoneUsuario(e.target.value)
                                                                            validarTelefone(e.target.value);
                        }} required/>
                    <Erro>{erroTelefone && <p style={{ color: 'red' }}>{erroTelefone}</p>}</Erro>
                </Label>
            </LabelsContainer>
            <LabelsContainer>
                <Label>
                    E-mail
                    <Input type='text' value={emailUsuario} onChange={(e) => {
                                                                            setEmailUsuario(e.target.value);
                                                                            validarEmail(e.target.value);
                        }} />
                    <Erro>{erroEmail && <p style={{ color: 'red' }}>{erroEmail}</p>}</Erro>
                </Label>
                <Label>
                    CPF
                    <Input type='text' value={cpfUsuario} onChange={(e) => {
                                                                            setCpfUsuario(e.target.value);
                                                                            validarCPF(e.target.value);
                        }} required/>
                    <Erro>{erroCPF && <p style={{ color: 'red' }}>{erroCPF}</p>}</Erro>
                </Label>
            </LabelsContainer>
            <h4>Informações do solicitante</h4>
            <LabelsContainer>
                <Label>
                    Descrição da Reserva
                    <Input type='text' value={descricao} onChange={(e) => setDescricao(e.target.value)} required/>
                </Label>
            </LabelsContainer>
            <Label>
                Data da Reserva
                <Input type='date' value={dataReserva} onChange={(e) => setDataReserva(e.target.value)} min={tomorrowString}  required/>
            </Label>
            <LabelsContainer>
                <Label>
                    Horário Início
                    <Input min="08:00" type='time' value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} required/>
                </Label>
                <Label>
                    Horário Término
                    <Input max="22:00" type='time' value={horaTermino} onChange={(e) => setHoraTermino(e.target.value)} required/>
                </Label>
            </LabelsContainer>
            <LabelCheck>
                <Input type='checkbox' required onChange={(e) => verificaReserva(dataReserva, horaInicio, horaTermino)}/>
                Ciente que terei que apresentar documento de identificação com FOTO
            </LabelCheck>
            <SubmitButton type='submit' value="Enviar" />
        </form>
        <Footer />
    </RealizarReservaContainer>
  );
}

export default RealizarReserva;
