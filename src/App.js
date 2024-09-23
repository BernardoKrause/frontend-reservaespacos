import './App.css';
import Button from './components/Button';
import Header from './components/Header';

import api from './services/api';
import { useEffect, useState } from 'react';

function App() {
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

  espacos.forEach((espaco) => {
    console.log(espaco.codespaco);
  })

  return (
    <div className="App">
      <Header />

      <Button texto={"Reserve aqui seu horário"} />
      <Button texto={"Visualizar agenda"} />
      <Button texto={"Editar reserva"} />

      <p>Espaços esportivos sob gestão do SECUTE:</p>
      {espacos.map((espaco, i) => <div>

          ESPAÇO {i}
          <p>Código espaco: {espaco.codespaco}</p>
          <p>Nome espaco: {espaco.nomeespaco}</p>
          <p>Abre: {espacos.horarioabertura}</p>
          <p>Fecha: {espaco.horariofechamento}</p>
          <p>Capacidade: {espaco.capacidade} pessoas</p>
          <p>Endereco: {espaco.codendereco}</p>
      </div>)}
    </div>
  );
}

export default App;
