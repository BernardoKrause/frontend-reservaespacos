// CalendarPage.js
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // Componente React do FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // Plugin para exibição de dias em grid

// Novas importações de estilos do FullCalendar
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';


const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try{
        const response = await axios.get('/api/reservas');
        const eventData = response.data.map(event => ({
          title: event.descricao,
          start: event.dataInicio,
          end: event.dataTermino
        }));
        setEvents(eventData);
      }catch(error){
        console.error('Erro ao buscar os eventos:', error);
      }
    };
    fetchEvents();
  },[]);

  return (
    <>
    <Header />
    <div style={{ padding: '20px' }}>
      <h1>Meu Calendário</h1>
      <FullCalendar
        plugins={[dayGridPlugin]} // Definindo o plugin de exibição em grade de dias
        initialView="dayGridMonth" // Vista inicial (mês completo)
        events={events} // Eventos que serão exibidos
        locale="pt-br" // Definindo a localização para português
      />
    </div>
    <Footer/>
    </>
  );
};

export default CalendarPage;

