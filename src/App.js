import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Inicio from './pages/Inicio';
import RealizarReserva from './pages/RealizarReserva';
import CalendarPage from './pages/CalendarPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='realizar-reserva' element={<RealizarReserva />} />
        <Route path='calendario' element={<CalendarPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
