import { CheckBox } from "../CheckBoxs/CheckBox";
import { Input } from "../Inputs/Input";
import { useState, useEffect } from "react";
import './form.css';
import { Button } from "../Buttons/Button";

const clubesIniciales = [
  { id: 1, nombre: "Robótica" },
  { id: 2, nombre: "Debate" },
  { id: 3, nombre: "Teatro" },
  { id: 4, nombre: "Ajedrez" },
  { id: 5, nombre: "Música" },
  { id: 6, nombre: "Fotografía" },
  { id: 7, nombre: "Atletismo" },
  { id: 8, nombre: "Lectura" },
  { id: 9, nombre: "Programación" },
  { id: 10, nombre: "Cine" },
  { id: 11, nombre: "Voluntariado" },
  { id: 12, nombre: "Emprendimiento" },
  { id: 13, nombre: "Coro" },
  { id: 14, nombre: "Danza" },
  { id: 15, nombre: "Boxeo" },
];

export const Form = ({ datosIniciales = null }) => {

    useEffect(() => {
    if (datosIniciales) {
        console.log("datosIniciales:", datosIniciales);

      // Rellenar nombre, carrera, correo desde el primer registro
      setFormData({
        carnet: datosIniciales[0].carnet || "",
        nombre: datosIniciales[0].estudiante || "",
        carrera: datosIniciales[0].carrera || "",
        correo: datosIniciales[0].correo || "",
      });

      // Rellenar los clubes
      const clubsActualizados = clubesIniciales.map(club => {
        const encontrado = datosIniciales.find((d) => {
        const nombreNormalizado = d.club.replace(/^Club de\s+/i, "").trim().toLowerCase();
        return nombreNormalizado === club.nombre.toLowerCase();
      });
        if (encontrado) {
          return {
            ...club,
            activo: true,
            seleccion1: encontrado.actividad,
            seleccion2: encontrado.cargo,
          };
        }
        return { ...club, activo: false, seleccion1: '', seleccion2: '' };
      });

      setClubs(clubsActualizados);
    }
  }, [datosIniciales]);


  const [formData, setFormData] = useState({
    carnet: "",
    nombre: "",
    carrera: "",
    correo: "",
  });

  const [error, setError] = useState("");
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [confirmacionDelete, setCofirmacionDelete] = useState(false);
  const [confirmacionUpdate, setConfirmacionUpdate] = useState(false);
  const modoEdicion = datosIniciales !== null;


  const [clubs, setClubs] = useState(
    clubesIniciales.map((club) => ({
      ...club,
      activo: false,
      seleccion1: "",
      seleccion2: "",
    }))
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleDelete = () => {
    const { carnet } = formData;

    if (!carnet) {
      setError("No se encontró el carnet del estudiante para eliminar.");
      return;
    }

    fetch(`http://localhost:8000/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ carnet }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al eliminar");
        return response.json();
      })
      .then((data) => {
        console.log("Estudiante eliminado:", data);
        setCofirmacionDelete(true);
      })
      .catch((error) => {
        console.error("Error al eliminar:", error);
        setError("Ocurrió un error al eliminar el estudiante.");
      });
  };


  const handleUpdate = () => {
    const { carnet, nombre, carrera, correo } = formData;

    if (!carnet || !nombre || !carrera || !correo) {
      setError("Todos los campos son obligatorios para actualizar.");
      return;
    }

    const clubesSeleccionados = [];
    const actividadesSeleccionadas = [];
    const cargosSeleccionados = [];

    clubs.forEach((club) => {
      if (club.activo) {
        clubesSeleccionados.push(club.id);
        actividadesSeleccionadas.push(club.seleccion1);
        cargosSeleccionados.push(club.seleccion2);
      }
    });

    const estudiante = {
      carnet,
      nombre,
      carrera,
      correo,
      clubes: clubesSeleccionados,
      actividad: actividadesSeleccionadas,
      cargo: cargosSeleccionados,
    };

    fetch(`http://localhost:8000/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(estudiante),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al actualizar");
        return response.json();
      })
      .then((data) => {
        console.log("Estudiante actualizado:", data);
        setConfirmacionUpdate(true);
      })
      .catch((error) => {
        console.error("Error al actualizar:", error);
        setError("Ocurrió un error al actualizar el estudiante.");
      });
  };


  const handleSubmit = () => {
    const { nombre, carrera, correo } = formData;

    if (!nombre || !carrera || !correo) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (!validateEmail(correo)) {
      setError("El correo no tiene un formato válido.");
      return;
    }

    setError(""); // Limpia errores anteriores

    const clubesSeleccionados = [];
    const actividadesSeleccionadas = [];
    const cargosSeleccionados = [];

    clubs.forEach((club) => {
      if (club.activo) {
        clubesSeleccionados.push(club.id);
        actividadesSeleccionadas.push(club.seleccion1);
        cargosSeleccionados.push(club.seleccion2);
      }
    });

    const estudiante = {
      nombre,
      carrera,
      correo,
      clubes: clubesSeleccionados,
      actividad: actividadesSeleccionadas,
      cargo: cargosSeleccionados,
    };

    console.log("Datos a enviar:", estudiante);
    //  enviar `estudiante` al backend

    fetch("http://localhost:8000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(estudiante),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al enviar los datos");
      }
      return response.json(); // si el backend responde con JSON
    })
    .then((data) => {
      console.log("Estudiante creado exitosamente:", data);
      setMostrarConfirmacion(true);
      
    })
    .catch((error) => {
      console.error("Error en la petición:", error);
      setError("Ocurrió un error al enviar los datos.");
    });

  };

  


  return (
    <>
    {mostrarConfirmacion && (
      <div className="modal-overlay">
        <div className="modal-content">
          <p className="pPop">¡Estudiante creado exitosamente! </p>
          <button onClick={() => window.location.reload()}>Aceptar</button>
        </div>
      </div>
    )}

    {confirmacionUpdate && (
      <div className="modal-overlay">
        <div className="modal-content">
          <p className="pPop">¡El estudiante se ha actualizado correctamente! </p>
          <button onClick={() => window.location.reload()}>Aceptar</button>
        </div>
      </div>
    )}

    {confirmacionDelete && (
      <div className="modal-overlay">
        <div className="modal-content">
          <p className="pPop">¡Se ha eliminado al estudiante correctamente! </p>
          <button onClick={() => window.location.reload()}>Aceptar</button>
        </div>
      </div>
    )}


    
    <div className="formStyle">
      <h3>Datos del Estudiante</h3>
      <Input title="Nombre:" name="nombre" value={formData.nombre} onChange={handleInputChange} />
      <Input title="Carrera:" name="carrera" value={formData.carrera} onChange={handleInputChange} />
      <Input title="Correo:" name="correo" value={formData.correo} onChange={handleInputChange} />

      

      <h3>Clubs Disponibles</h3>
      {clubs.map((club) => (
        <CheckBox
          key={club.id}
          club={club}
          onChange={(updatedClub) =>
            setClubs((prev) => prev.map((c) => (c.id === updatedClub.id ? updatedClub : c)))
          }
        />
      ))}

      {error && <p style={{ color: "Purple" }}>{error}</p>}

      {!modoEdicion ? (
        <div className = 'divB'>
        <Button text="Cancelar" onClick={() => window.location.reload()} />
        <Button text="Crear Estudiante" onClick={handleSubmit} />
        </div>
        ) : (
        <div className = 'divB'>
          <Button text="Cancelar" onClick={() => window.location.reload()} />
          <Button text="Actualizar Estudiante" onClick={handleUpdate} />
          <Button text="Eliminar Estudiante" onClick={handleDelete} />
        </div>
      )}

    </div>
    </>
  );
};
