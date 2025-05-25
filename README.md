# Lab3_BD1
## Sistema de Gestión de Clubes Universitarios

Una aplicación web desarrollada para gestionar estudiantes y su participación en clubes universitarios. Permite registrar, editar y eliminar estudiantes, asignarles roles y actividades dentro de clubes, y asegura integridad de datos mediante validaciones en el backend y la base de datos.

---

## 📁 Estructura del Proyecto

El proyecto está dividido en tres carpetas principales:

- **`database/`**  
  Contiene:
  - `01-schema.sql`: script DDL generado desde el ORM con definición de todas las tablas.
  - `02-data.sql`: script de inserción con más de 30 registros significativos que demuestran relaciones múltiples.
  - 2 tipos de datos personalizados utilizando enum.

- **`backend/`**  
  Implementado en **Python** con **SQLAlchemy (ORM)**.  
  Contiene:
  - Lógica CRUD completa para la tabla principal.
  - Asociaciones múltiples vía tabla intermedia (`estudiante_club`).
  - Validaciones a nivel de aplicación y de base de datos.
  - Endpoints RESTful para interactuar con el frontend.
  - Uso exclusivo del ORM para todas las operaciones.
  - Vista (VIEW) combinada para facilitar el consumo desde la interfaz.

- **`frontend/`**  
  Desarrollado con **React + Vite**.  
  Contiene:
  - Componentes reutilizables (`Input`, `CheckBox`, `Button`, etc.).
  - Formularios dinámicos que permiten crear y editar estudiantes.
  - Validaciones en tiempo real (como correo único y pertenencia mínima a un club).
  - Uso de una vista SQL para poblar el índice principal sin consultar múltiples tablas.

---

## ✨ Funcionalidades destacadas

- 🧍‍♂️ Registro de estudiantes con carrera, correo y clubes asignados
- 🔁 Edición y actualización de estudiantes
- 🗑️ Eliminación por carnet
- 📬 Validación de correos únicos en frontend y backend
- 📚 Validación de pertenencia mínima a un club
- 📄 Uso de vistas SQL para poblar tablas del frontend
- 🔐 Restricciones NOT NULL, UNIQUE, CHECK, claves primarias y foráneas
- 🧪 Tipos de datos personalizados para campos como actividad o cargo

---

## 🚀 Instrucciones para correr el proyecto

### 1. Clona el repositorio

```bash
git clone https://github.com/Ren23813/Lab3_BD1
cd Lab3_BD1
```

###2. Levantar todo con Docker
Asegúrate de tener Docker y Docker Compose instalados y funcionando.
Desde la carpeta raíz (que contiene frontend/, backend/ y database/), ejecuta:

```bash
docker-compose up --build
```

Esto construirá y levantará automáticamente la base de datos, el backend y el frontend.
Una vez finalizado, accede a la aplicación desde:

📍 http://localhost:5173/


