import Header from '../components/Header';
import Footer from '../components/Footer';

import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Login from '../components/Login';

const ReservaLoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 16vh 0 0 0;
`

function ReservaLogin () { 

    const codReserva = useParams().codReserva;
    const situacao = useParams().situacao;


    return (
        <ReservaLoginContainer>
        <Header />
        <Login codReserva={codReserva} situacao={situacao}/>
        <Footer />
        </ReservaLoginContainer>
    );
}

export default ReservaLogin;

