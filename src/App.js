
import './css/App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import {Routes, Route} from 'react-router-dom';
import Home  from './views/Home';
import Shop from './views/Shop';

function App() {
  const [students, setStudents] = useState([' Jay ', ' Junco ', ' Hawk ', ' Red-Winged Blackbird ', ' Hummingbird ', 'Kestrel', 'Cowbird', 'Parrot', 'Penguin', 'Ostrich']);


  const shuffleStudents = () => {
    // students.sort(() => Math.random() - 0.5);
    let tempStudents = [...students];
    tempStudents.sort(() => Math.random() - 0.5);
    setStudents(tempStudents); 
  }

  return (
    <React.Fragment>
    <Navbar/>

    <Routes>
      <Route children path='/' element={<Home students={students} shuffleStudents={shuffleStudents} />} />
      <Route children path='/shop' element={<Shop />} />
    </Routes>
    </React.Fragment>
  );
}

export default App;
