import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../services/api';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get(`/api/reservas`);
        console.log('Dados da API:', response.data);

        const eventData = response.data.map(event => {
          const startDateTime = new Date(`${event.datareserva.split('T')[0]}T${event.horainicio}`).toISOString();
          const endDateTime = new Date(`${event.datareserva.split('T')[0]}T${event.horatermino}`).toISOString();

          return {
            title: event.descricao,
            start: startDateTime,
            end: endDateTime,
          };
        });

        console.log('Eventos a serem renderizados:', eventData);
        setEvents(eventData);
      } catch (error) {
        console.error('Erro ao buscar os eventos:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <Header />
      <div style={{ padding: '20px' }}>
        <h1>Meu Calendário</h1>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          locale="pt-br"
        />
      </div>
      <Footer />
    </>
  );
};

export default CalendarPage;



