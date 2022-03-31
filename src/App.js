import './App.css';
import Navbar from './components/Navbar/Navbar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

function App() {
  const [detailView, setDetailView] = useState(false);
  const [buttonView, setButtonView] = useState(false);

  useEffect(() => {
    if (detailView === true) {
      setButtonView(true)
    } 
  }, [detailView])

  const button = () => {
    if (!buttonView) {
      return (
        <Button onClick={() => {setDetailView(true)}}>Ver detalle</Button>
      )
    }
  }
  
  return (
    <div className="App">
        <Navbar/>
        {button()}
        {!detailView ? (
          <ItemListContainer/>
        ) : (
          <ItemDetailContainer/>
        )} 
    </div>
  );
}

export default App;
