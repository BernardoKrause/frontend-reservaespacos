import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Inicio from './pages/Inicio';
import RealizarReserva from './pages/RealizarReserva';
import Espacos from './pages/Espacos'
import CalendarPage from './pages/CalendarPage';
import EditarReservaLogin from './pages/EditarReservaLogin';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='realizar-reserva' element={<RealizarReserva />} />
        <Route path='espacos' element={<Espacos />} />
        <Route path='calendario' element={<CalendarPage />} />
        <Route path='editar-reserva-login/:codReserva' element={<EditarReservaLogin />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
