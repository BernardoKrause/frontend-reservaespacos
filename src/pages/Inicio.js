
import Button from '../components/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';

import styled from 'styled-components';
import api from '../services/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const InicioContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 16vh 0 0 0;
`

const InicioButtons = styled.div`
  display: flex;
  gap: 4vw;
  margin: 8vh 0;
`

const InicioEspacosTitle = styled.h1`
  width: 80%;
  text-align: left;
`

const InicioEspaco = styled.div`
  padding: 2vh 0;
  width: 80%;
  text-align: left;
  margin: 4vh 0;
`

const NomeEspaco = styled.div`
  font-size: 32px;
`

function Inicio() {
  const [espacos, setEspacos] = useState([]);

  useEffect(() => {
    try {
      api
      .get('/api/espacos')
      .then((response) => setEspacos(response.data))
    } catch (error) {
      console.log("erro: "+error);
    }
  }, []);

  return (
    <InicioContainer className="Inicio">
      <Header />

      <InicioButtons>
        <Link to="/realizar-reserva"><Button texto={"Reserve aqui seu horário"} /></Link>
        <Link to="/espacos"><Button texto={"Visualizar agenda"} /> </Link>
      </InicioButtons>

      <InicioEspacosTitle>Espaços esportivos sob gestão do SECUTE:</InicioEspacosTitle>
      {espacos.map((espaco, i) => <InicioEspaco key={i}>
          <NomeEspaco>{espaco.nomeespaco}</NomeEspaco>
          <p>Endereco: {espaco.logradouro}, {espaco.bairro}, {espaco.numeroendereco}</p>
          <p>Segunda a sábado: {espaco.horarioabertura} - {espaco.horariofechamento}</p>
          <p>Capacidade: {espaco.capacidade} pessoas</p>
      </InicioEspaco>)}

      <Footer />
    </InicioContainer>
  );
}

export default Inicio;
