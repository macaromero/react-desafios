import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Producto from './pages/Producto';
import Categoria from './pages/Categoria';

function App() {  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/categorias/:id_cat' element={<Categoria/>}/>
          <Route path='/productos' element={<Productos/>}/>
          <Route path='/productos/:id' element={<Producto/>}/>
          <Route path='*' element={<div>FALTA HACER</div>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
