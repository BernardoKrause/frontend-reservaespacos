import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';
import api from '../services/api';
import { useEffect, useState } from 'react';

const EspacoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 16vh 0 0 0;
`;

const DivEspacos = styled.div`
  display: flex;
  flex-wrap: wrap; 
  justify-content: space-between;
  width: 80%;
  padding: 10px;
  gap: 20px;
`;

const Espaco = styled.div`
  width: 350px;
  height: auto; 
  text-align: left;
  background: #004666;
  border-radius: 20px;
  padding: 20px;
  color: white; 
`;

const NomeEspaco = styled.div`
  font-size: 25px;
  font-weight: 500;
  line-height: 36px;
  text-align: left;
`;

const PEspacos = styled.p`
  font-size: 12px;
  font-weight: 500;
  text-align: left;
  padding: 2px;
`;

const FilterContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
`;

function Espacos() {
  const [espacos, setEspacos] = useState([]);
  const [filteredEspacos, setFilteredEspacos] = useState([]);
  const [capacidade, setCapacidade] = useState('');
  const [tipoQuadra, setTipoQuadra] = useState('');

  useEffect(() => {
    const fetchEspacos = async () => {
      try {
        const response = await api.get('/api/espacos');
        setEspacos(response.data);
        setFilteredEspacos(response.data); // Inicialmente mostrar todos

        // Busca os tipos de espaços para cada espaço
        const tipos = await Promise.all(
          response.data.map(async (espaco) => {
            const tipoResponse = await api.get(`/api/tipos/espaco/${espaco.codespaco}`);
            return {
              ...espaco,
              tipos: tipoResponse.data, // Adiciona os tipos ao espaço
            };
          })
        );

        console.log(tipos);

        setEspacos(tipos); // Atualiza espacos com os tipos
        setFilteredEspacos(tipos); // Atualiza os filtrados com os tipos também
      } catch (error) {
        console.log("Erro: " + error);
      }
    };

    fetchEspacos(); // Chama a função para carregar os espaços
  }, []);

  const [codTipo, setCodTipo] = useState(1) ///////////////////////////////
  function getIdTipoEspacoAtual (valorAtual) {
    for (let i = 0; i< tiposEspacos.length; i++) {
      if (tiposEspacos[i].nometipo === valorAtual) {
        setCodTipo(tiposEspacos[i].codtipo);
      }
    }
  }

  const handleFilter = async () => {
    try {
      let filtered;
  
      if (tipoQuadra) {
        const response = await api.get(`/api/espacos/tipo/${codTipo}`);
        filtered = response.data; // Filtra pelos tipos
      } else if (capacidade) {
        const response = await api.get(`/api/espacos/capacidade/${capacidade}`);
        filtered = response.data; // Filtra pela capacidade
      } else {
        filtered = espacos; // Caso nenhum filtro seja selecionado
      }

      // Busca os tipos de espaços para cada espaço
      console.log(filtered)
      const tiposFiltered = await Promise.all(
        filtered.map(async (espaco) => {
          console.log(espaco);
          const tipoResponse = await api.get(`/api/tipos/espaco/${espaco.codespaco}`);
          return {
            ...espaco,
            tipos: tipoResponse.data, // Adiciona os tipos ao espaço
          };
        })
      );

      console.log(tiposFiltered);

      setEspacos(tiposFiltered); // Atualiza espacos com os tipos
      setFilteredEspacos(tiposFiltered); // Atualiza os espaços filtrados
    } catch (error) {
      console.log("Erro: " + error);
    }
  };

  const [tiposEspacos, setTiposEspacos] = useState([]);
  useEffect(() => {
    try {
      api
      .get('/api/tipos')
      .then((response) => setTiposEspacos(response.data))
    } catch (error) {
      console.log("erro: "+error);
    }
  }, []);
  

  return (
    <EspacoContainer className="Espacos">
      <Header />

<FilterContainer>
  <InputContainer>
    <Label htmlFor="tipoQuadra">Tipo do Espaço</Label>
    <Select
      id="tipoQuadra"
      value={tipoQuadra}
      onChange={(e) => {
        setTipoQuadra(e.target.value);
        getIdTipoEspacoAtual(e.target.value)
        setCapacidade(''); // Limpa a capacidade quando tipo é selecionado
      }}
    >
      <option value="">Selecione uma opção</option>
      {tiposEspacos.map((tipoespaco, i) => (
        <option key={i} value={tipoespaco.id}>{tipoespaco.nometipo}</option> // Usar o ID do tipo
      ))}
    </Select>
  </InputContainer>

  <InputContainer>
    <Label htmlFor="capacidade">Capacidade Mínima</Label>
    <Input
      id="capacidade"
      type="number"
      value={capacidade}
      onChange={(e) => {
        setCapacidade(e.target.value);
        setTipoQuadra(''); // Limpa o tipo quando capacidade é alterada
      }}
      placeholder="Capacidade mínima"
    />
  </InputContainer>

  <button onClick={handleFilter}>Filtrar</button>
</FilterContainer>

      <DivEspacos>
        {filteredEspacos.map((espaco) => (
          <Espaco key={espaco.codespaco}>
            <NomeEspaco>Agendamento - {espaco.nomeespaco}</NomeEspaco>
            <PEspacos>Endereço: {espaco.logradouro}, {espaco.bairro}, {espaco.numeroendereco}</PEspacos>
            <PEspacos>Segunda a sábado: {espaco.horarioabertura} - {espaco.horariofechamento}</PEspacos>
            <PEspacos>Capacidade: {espaco.capacidade} pessoas</PEspacos>
            <PEspacos>Tipo: {}
            {espaco.tipos && espaco.tipos.length > 0 && (
              espaco.tipos.map((tipo, index) => (
                <span key={index}>
                  {tipo.nometipo}{index < espaco.tipos.length - 1 ? ', ' : ''}
                </span>
              ))
            )}
          </PEspacos>
          </Espaco>
        ))}
      </DivEspacos>

      <Footer />
    </EspacoContainer>
  );
}

export default Espacos;