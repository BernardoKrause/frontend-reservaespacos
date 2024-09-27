import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Inicio from './pages/Inicio';
import RealizarReserva from './pages/RealizarReserva';
import Espacos from './pages/Espacos'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='realizar-reserva' element={<RealizarReserva />} />
        <Route path='espacos' element={<Espacos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
