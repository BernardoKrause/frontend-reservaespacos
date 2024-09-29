import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Inicio from './pages/Inicio';
import RealizarReserva from './pages/RealizarReserva';
import Espacos from './pages/Espacos'
import CalendarPage from './pages/CalendarPage';
import ReservaLogin from './pages/ReservaLogin';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='realizar-reserva' element={<RealizarReserva />} />
        <Route path='espacos' element={<Espacos />} />
        <Route path='calendario' element={<CalendarPage />} />
        <Route path='reserva-login/:codReserva/:situacao' element={<ReservaLogin />}/>
        <Route path='espacos/calendario/:codEspaco' element={<CalendarPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
