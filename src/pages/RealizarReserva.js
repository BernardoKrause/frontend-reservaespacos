import Header from '../components/Header';
import Footer from '../components/Footer';

import styled from 'styled-components';
import { useState } from 'react';

const RealizarReservaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 16vh 0 0 0;
`

function RealizarReserva() {
  const [nomeEspaco, setNomeEspaco] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [telefoneUsuario, setTelefoneUsuario] = useState('');

  return (
    <RealizarReservaContainer className="RealizarReserva">
        <Header />
        <form>
            <label>
                Espaço Esportivo:
                <select value={nomeEspaco} onChange={(e) => setNomeEspaco(e.target.value)} >
                    <option value="">Selecione uma opção</option>
                    <option value="quadra1">quadra1</option>
                    <option value="quadra2">quadra2</option>
                    <option value="quadra3">quadra3</option>
                </select>
            </label>
            <h4>Informações do solicitante</h4>
            <div>
                <label>
                    Nome Completo
                    <input type='text' value={nomeUsuario} onChange={(e) => setNomeUsuario(e.target.value)} />
                </label>
                <label>
                    Telefone para contato
                    <input type='text' value={telefoneUsuario} onChange={(e) => setTelefoneUsuario(e.target.value)} />
                </label>
            </div>
        </form>
        <Footer />
    </RealizarReservaContainer>
  );
}

export default RealizarReserva;
