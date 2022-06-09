
import './css/App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import {Routes, Route} from 'react-router-dom';
import Home  from './views/Home';
import Shop from './views/Shop';
import Cart from './views/Cart';

function App() {
  const [players, setplayers] = useState(['Messi', ' Marco Veratti', ' Kylian Mbappe', ' ', ' Neymar', 'Keylor Navas', 'Marquinhos', 'Nuno Mendes', 'Idrissa Gueye', 'Sergio Ramos']);


  const shuffleplayers = () => {
    // players.sort(() => Math.random() - 0.5);
    let tempplayers = [...players];
    tempplayers.sort(() => Math.random() - 0.5);
    setplayers(tempplayers); 
  }

  return (
    <React.Fragment>
    <Navbar/>
    <Routes>
      <Route children path='/' element={<Home players={players} shuffleplayers={shuffleplayers} />} />
      <Route children path='/shop' element={<Shop />} />
      <Route children path='/cart' element={<Cart />} />
    </Routes>
    </React.Fragment>
  );
}

export default App;
