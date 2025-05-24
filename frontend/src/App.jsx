//import { useState } from 'react'
import { useEffect, useState } from 'react';

import './App.css'

function App() {
  const [estudiantes, setEstudiantes] = useState([]);

useEffect(() => {
  fetch('http://localhost:8000/estudiantes')
    .then(res => res.json())
    .then(data => setEstudiantes(data))
    .catch(console.error);
}, []);

  return (
     <div>
      <h1>Estudiantes :D</h1>
    <ul>
      {estudiantes.map(estudiante => (
        <li key={estudiante.id}>{estudiante.nombre} - {estudiante.correo}</li>
      ))}
    </ul>
      </div>
    
  )
}

export default App
