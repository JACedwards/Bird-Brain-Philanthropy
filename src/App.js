
import './css/App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import {Routes, Route} from 'react-router-dom';
import Home  from './views/Home';
import Shop from './views/Shop';
import Cart from './views/Cart';
import Danger from './views/Danger';

function App() {
  const [players, setplayers] = useState(['Ruddy Duck', ' Western Bluebird', ' Prothonotary Warbler', ' Ladder-backed Woodpecker', 'Red-throated Loon', 'Kestral', 'Sandhill Crane', 'Junco', 'Horned Owl', "Ridgeway's Rail", 'Loggerhead Shrike', 'Piping Plover', 'Ferruginous Pygmy Owl', "Kirtland's Warbler", 'Marbled Murret', "Bell's Vireo", "Inyo California Towhee", "Gyrfalcon", 'Atlantic Puffin', 'Blue-Footed Booby' ]);


  const shuffleplayers = () => {
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
          <Route children path='/danger' element={<Danger players={players} shuffleplayers={shuffleplayers} />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
