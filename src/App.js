import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Producto from './pages/Producto';
import Categoria from './pages/Categoria';
import Cart from './pages/Cart';
import { CartProvider  } from './context/CartContext';

function App() {  
  return (
    <div className="App">
      <CartProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/categorias/:id_cat' element={<Categoria/>}/>
            <Route path='/productos' element={<Productos/>}/>
            <Route path='/productos/:id' element={<Producto/>}/>
            <Route path='/cart' element={<Cart/>}/>
          </Routes>
      </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
