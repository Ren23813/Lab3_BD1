//import { useState } from 'react'
import { useEffect, useState } from 'react';

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [version, setVersion] = useState('');
  useEffect(() => {
    fetch('http://localhost:8000/version')
      .then((res) => res.json())
      .then((data) => setVersion(data.postgres_version))
      .catch((err) => console.error('Error al obtener versión:', err));
  }, []);

  return (
     <div>
      <h1>PostgreSQL Version:</h1>
      <p>{version}</p>
    </div>
    
  )
}

export default App
