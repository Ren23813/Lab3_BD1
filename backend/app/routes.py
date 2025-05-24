from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .db import SessionLocal
from .models import Estudiante, Tabla_General
from sqlalchemy import text

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/version") #de prueba para confirmar conexión con front
def get_pg_version(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT version();"))
    version = result.fetchone()
    return {"postgres_version": version[0]}

@router.get("/estudiantes")
def listar_clientes(db: Session = Depends(get_db)):
    return db.query(Tabla_General).all()