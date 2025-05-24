from sqlalchemy import Column, Integer, String, ForeignKey, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import CheckConstraint
from sqlalchemy.types import String
from enum import Enum as pyEnum


Base = declarative_base()

class Estudiante(Base):
    __tablename__ = "estudiantes"
    carnet = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(250), nullable=False)
    carrera = Column(String(150), nullable=False)
    correo = Column(String, unique=True, nullable=True)
    __table_args__ = (
        CheckConstraint(
            "correo ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'",
            name="correo_valido"
        ),
    )
   
    clubes_estudiantes = relationship("Club_Estudiante", back_populates="estudiante")

    def __repr__(self):
        return f"<Estudiante(carnet={self.carnet}, nombre={self.nombre}, carrera={self.carrera}, correo={self.correo})>"


class Actividad(pyEnum):
    activo = "activo"
    inactivo = "inactivo"
    vetado = "vetado"

class CargoClub(pyEnum):
    presidente = "presidente"
    vicepresidente = "vicepresidente"
    tesorero = "tesorero"
    vocal = "vocal"
    miembro = "miembro"


class Club(Base):
    __tablename__ = "clubes"
    id = Column(Integer, primary_key = True, autoincrement=True)
    nombre = Column(String(100), nullable=False)
    tipo = Column(String(50), nullable=False)
    
    clubes_estudiantes = relationship("Club_Estudiante", back_populates="club")

    def __repr__(self):
        return f"<Club(id={self.id}, nombre={self.nombre}, tipo={self.tipo})>"
    


class Club_Estudiante(Base):
    __tablename__ = "clubes_estudiantes"
    id = Column(Integer, primary_key = True, autoincrement=True)
    id_club = Column(Integer, ForeignKey('clubes.id', ondelete="CASCADE"), nullable=False)
    id_estudiante = Column(Integer, ForeignKey('estudiantes.carnet', ondelete="CASCADE"), nullable=False)
    actividad = Column(Enum(Actividad), nullable=False)
    cargo = Column(Enum(CargoClub), nullable= False)

    club = relationship("Club", back_populates="clubes_estudiantes")
    estudiante = relationship("Estudiante", back_populates="clubes_estudiantes")

    def __repr__(self):
        return f"<Club_Estudiante(id={self.id}, id_club={self.id_club}, id_estudiante={self.id_estudiante}, actividad={self.actividad}, cargo={self.cargo})>"


class Tabla_General(Base):
    __tablename__ = "tabla_general"
    
    carnet = Column(Integer, primary_key=True)
    estudiante = Column("estudiante", String(250))
    carrera = Column(String(150))
    correo = Column(String)
    __table_args__ = (
        CheckConstraint(
            "correo ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'",
            name="correo_valido"
        ),
    )
    club = Column(String(100))
    actividad = Column(Enum(Actividad))
    cargo = Column(Enum(CargoClub))

    def __repr__(self):
        return f"<TablaGeneral(carnet={self.carnet}, estudiante={self.estudiante}, carrera={self.carrera}, correo={self.correo}, club={self.club}, actividad={self.actividad}, cargo={self.cargo})>"


