import './App.css';
import Navbar from './components/Navbar/Navbar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer'

function App() {
  return (
    <div className="App">
      <header>
        <Navbar/>
      </header>
      <main>
        <ItemListContainer/>
      </main>
    </div>
  );
}

export default App;
