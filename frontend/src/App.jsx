//import { useState } from 'react'
import { useEffect, useState } from 'react';

import './App.css'

import { Header } from './components/Header/Header';
import { Form } from './components/Form/Form';
import { Table } from './components/Table/Table';

function App() {
  const [estudiantes, setEstudiantes] = useState([]);

  const [seccion, setSeccion] = useState('datos')
  const columnas = [
    { key: 'carnet', titulo: 'Carnet' },
    { key: 'estudiante', titulo: 'Nombre' },
    { key: 'carrera', titulo: 'Carrera' },
    { key: 'club', titulo: 'Club' },
    { key: 'cargo', titulo: 'Puesto Club' },
    { key: 'actividad', titulo: 'Estado en el club' },
    { key: 'correo', titulo: 'Correo' },
    { key: 'acciones', titulo: 'Acciones' }
    
  ]

  const mostrarSeccion = () =>{
    switch (seccion) {
      case 'datos':
        return (
          <Table 
          datos={estudiantes}
          columnas={columnas}
          />
        )

      case 'nuevo':
        return (<Form></Form>)
    }
  }

useEffect(() => {
  fetch('http://localhost:8000/estudiantes')
    .then(res => res.json())
    .then(data => setEstudiantes(data))
    .catch(console.error);
}, []);



  return (
  
     <div>
      <Header text = 'Estudiantes y clubs' onSelect = {setSeccion}/>
      <div className='centrar'>{mostrarSeccion()}

      </div>

      
      
    
      </div>

      
  )
}

export default App
