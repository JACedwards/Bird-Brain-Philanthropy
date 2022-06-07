
import './css/App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';

function App() {
  const [count, setCount] = useState(0);
  const [students, setStudents] = useState(['/ Jay /', '/ Junco /', '/ Hawk /', '/ Red Winged Blackbird /', '/ Hummingbird /']);

  const changeCounter = () => {
    console.log('current count' + count);
    setCount(count + 1);
  }

  const shuffleStudents = () => {
    // students.sort(() => Math.random() - 0.5);
    let tempStudents = [...students];
    tempStudents.sort(() => Math.random() - 0.5);
    setStudents(tempStudents); 
  }

  return (
    <div className="App">
      <Navbar studentsFromApp={students} setStudentsFromApp={setStudents}/>
      {console.log('Hello, Tuesday')}
      <h1 className='counter'>{count}</h1>
      <button onClick={changeCounter}>Change Count</button>
      <h1 className='students'>{students}</h1>
      <button onClick={shuffleStudents}>Shuffle Students</button>
    </div>
  );
}

export default App;
