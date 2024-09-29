import Header from '../components/Header';
import Footer from '../components/Footer';

import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import Login from '../components/Login';

const EditarReservaLoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 16vh 0 0 0;
  
  
`

const EditarReservaLogin = () => { 

    const codReserva = useParams().codReserva;
    console.log(codReserva);

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

    return (
        <EditarReservaLoginContainer>
        <Header />
        <Login codReserva={reserva}/>
        <Footer />
        </EditarReservaLoginContainer>
    );
}

export default EditarReservaLogin;

