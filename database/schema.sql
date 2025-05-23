CREATE DOMAIN correo_valido AS TEXT CHECK (VALUE ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$');
CREATE TYPE status AS ENUM (
'activo', 
'inactivo',
'vetado'
);

CREATE TYPE cargo_club AS ENUM (
'presidente',
'vicepresidente',
'tesorero',
'vocal',
'miembro'
);




CREATE TABLE estudiantes (carnet SERIAL PRIMARY KEY, nombre VARCHAR(250) NOT NULL, carrera VARCHAR(150) NOT NULL, correo correo_valido UNIQUE);
CREATE TABLE clubes (id SERIAL PRIMARY KEY, nombre VARCHAR(100) NOT NULL, tipo VARCHAR(50));
CREATE TABLE clubes_estudiantes (id SERIAL PRIMARY KEY, id_club INT NOT NULL, CONSTRAINT fk_clubesEstudiantesClub FOREIGN KEY (id_club) REFERENCES clubes(id),  id_estudiante INT NOT NULL, CONSTRAINT fk_clubesEstudiantesEstudiante FOREIGN KEY (id_estudiante) REFERENCES estudiantes(carnet), actividad status NOT NULL, cargo cargo_club NOT NULL);