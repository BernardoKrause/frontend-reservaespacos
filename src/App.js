import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Inicio from './pages/Inicio';
import RealizarReserva from './pages/RealizarReserva';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='realizar-reserva' element={<RealizarReserva />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
