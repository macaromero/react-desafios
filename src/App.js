import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Producto from './pages/Producto';
import Categoria from './pages/Categoria';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { CartProvider  } from './context/CartContext';
import {CategoriesProvider} from './context/CategoriesContext';
import Purchase from './pages/Purchase';
import Contact from './pages/Contact';

function App() {  
  return (
    <div className="App">
      <CategoriesProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar/>
            <Routes>  
              <Route path='*' element={<NotFound/>}/>
              <Route path='/' element={<Home/>}/>
              <Route path='/products' element={<Productos/>}/>
              <Route path='/products/:id' element={<Producto/>}/>
              <Route path='/categories/:id_cat' element={<Categoria/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/purchase' element={<Purchase/>}/>
              <Route path='/contact' element={<Contact/>}/>
            </Routes>
        </BrowserRouter>
        </CartProvider>
      </CategoriesProvider>
    </div>
  );
}

export default App;
