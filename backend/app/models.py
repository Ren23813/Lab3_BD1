from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Estudiante(Base):
    __tablename__ = "estudiantes"
    carnet = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(250), nullable=False)
    carrera = Column(String(150), nullable=False)
    correo = Column(String, unique=True, nullable=True)

    def __repr__(self):
        return f"<Estudiante(carnet={self.carnet}, nombre={self.nombre}, carrera={self.carrera}, correo={self.correo})>"


