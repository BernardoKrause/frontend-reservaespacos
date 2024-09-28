import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../services/api';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Ícones de edição e exclusão

const CalendarContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 10vh 0 0 0;
`;

const DivCalender = styled.div`
  padding: 20px;
  z-index: 1; // Garante que o calendário tenha um z-index mais baixo
`;

const DivBotao = styled.div`
  justify-content: flex-end;
  text-font: 20px
`;

const CalendarioHeader = styled.h2``;

const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // Fundo escuro com transparência
    zIndex: 1000, // Garante que o overlay fique sobre o calendário
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1001, // Garante que o conteúdo do modal esteja sobre o overlay
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
  },
};

// Estilo dos botões de ação
const ActionButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 18px;
  margin-right: 10px;

  &:hover {
    color: #0056b3;
  }
`;

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false); // Estado para controlar a abertura do modal
  const [selectedEvent, setSelectedEvent] = useState(null); // Evento selecionado

  const paramentros = useParams();
  const codEspaco = paramentros.codEspaco;
  const [evento, setEvento] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get(`/api/reserva/espaco/${codEspaco}`);
        console.log('Dados da API:', response.data);

        const eventData = response.data.map((event) => {
          setEvento(event);
          const startDateTime = new Date(
            `${event.datareserva.split('T')[0]}T${event.horainicio}`
          ).toISOString();
          const endDateTime = new Date(
            `${event.datareserva.split('T')[0]}T${event.horatermino}`
          ).toISOString();

          return {
            title: event.descricao,
            start: startDateTime,
            end: endDateTime,
            extendedProps: {
              descricao: event.descricao,
              nomeespaco: event.nomeespaco,
              horainicio: event.horainicio,
              horatermino: event.horatermino,
            },
          };
        });

        console.log('Eventos a serem renderizados:', eventData);
        setEvents(eventData);
      } catch (error) {
        console.error('Erro ao buscar os eventos:', error);
      }
    };

    fetchEvents();
  }, [codEspaco]);

  const handleEventClick = (info) => {
    setSelectedEvent(info.event.extendedProps); // Passa os detalhes do evento para o estado
    setModalIsOpen(true); // Abre o modal
  };

  const closeModal = () => {
    setModalIsOpen(false); // Fecha o modal
    setSelectedEvent(null); // Limpa o evento selecionado
  };

  const handleEditEvent = () => {
    console.log('Editar evento:', selectedEvent);
    // Lógica para editar o evento
  };

  const handleDeleteEvent = () => {
    console.log('Deletar evento:', selectedEvent);
    // Lógica para deletar o evento
  };

  return (
    <CalendarContainer>
      <Header />
      <DivCalender>
        <CalendarioHeader>Calendário - {evento.nomeespaco} </CalendarioHeader>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          locale="pt-br"
          eventClick={handleEventClick} // Adiciona o evento de clique
          height="auto"
        />
      </DivCalender>
      <Footer />

      {/* Modal */}
      {selectedEvent && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Detalhes do Evento"
          style={customModalStyles} // Aplica o estilo customizado 
        >
          <DivBotao>
            <h2>{selectedEvent.descricao}
              <ActionButton onClick={handleEditEvent}>
                <FontAwesomeIcon icon={faEdit} />
              </ActionButton>
              <ActionButton onClick={handleDeleteEvent}>
                <FontAwesomeIcon icon={faTrash} />
              </ActionButton>
            </h2>
          </DivBotao>
          <p>
            <strong>Espaço:</strong> {selectedEvent.nomeespaco}
          </p>
          <p>
            <strong>Início:</strong> {selectedEvent.horainicio}
          </p>
          <p>
            <strong>Término:</strong> {selectedEvent.horatermino}
          </p>

          <button onClick={closeModal}>Fechar</button>
        </Modal>
      )}
    </CalendarContainer>
  );
};

export default CalendarPage;
