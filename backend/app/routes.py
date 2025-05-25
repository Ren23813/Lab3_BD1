from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .db import SessionLocal
from .models import Estudiante, Tabla_General,Club,Club_Estudiante
from pydantic import BaseModel

router = APIRouter()

class IngresoEstudiante(BaseModel):
    nombre:str
    carrera:str
    correo:str
    clubes:list[int]
    actividad: list[str]
    cargo: list[str]
    class Config:
        orm_mode = True

class EstudianteExistente(BaseModel):
    carnet:int
    nombre:str
    carrera:str
    correo:str
    clubes:list[int]
    actividad: list[str]
    cargo: list[str]
    class Config:
        orm_mode = True

class CarnetEntrante(BaseModel):
    carnet:int
    class Config:
        orm_mode = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/estudiantes")
def mostrar_tablaGen(db: Session = Depends(get_db)):
    return db.query(Tabla_General).all()



@router.post("/register")
def registrar_estudiante(estudiante: IngresoEstudiante, db: Session = Depends(get_db)):
    estudiante_alrExists = db.query(Estudiante).filter(Estudiante.correo == estudiante.correo).first()
    if estudiante_alrExists:
        raise HTTPException(status_code=400, detail="El correo ya está registrado.")
    
    nuevo_estudiante = Estudiante(
        nombre=estudiante.nombre,
        carrera=estudiante.carrera,
        correo=estudiante.correo
    )
    db.add(nuevo_estudiante)
    db.commit()
    db.refresh(nuevo_estudiante)

    for i, club_id in enumerate(estudiante.clubes):
        club = db.query(Club).filter(Club.id == club_id).first()
        if not club:
            raise HTTPException(status_code=400, detail=f"Club con ID {club_id} no existe.")
        
        try:
            actividad_val = estudiante.actividad[i]
            cargo_val = estudiante.cargo[i]
        except IndexError:
            raise HTTPException(status_code=400, detail=f"Faltan valores de actividad o cargo para el club con ID {club_id}.")
        
        club_estudiante = Club_Estudiante(
            id_club=club_id,
            id_estudiante=nuevo_estudiante.carnet,
            actividad=actividad_val,
            cargo=cargo_val
        )
        db.add(club_estudiante)
    
    db.commit()  

    return {
        "message": "Estudiante registrado exitosamente",
        "estudiante": nuevo_estudiante,
        "clubes_asociados": estudiante.clubes
    }


@router.put("/edit")
def editar_estudiante(estudianteEntrante: EstudianteExistente, db: Session = Depends(get_db)):
    estudiante_shouldExist = db.query(Estudiante).filter(Estudiante.carnet == estudianteEntrante.carnet).first()
    if not estudiante_shouldExist:
        raise HTTPException(status_code=400, detail="El estudiante a editar no existe.")
    
    estudiante_shouldExist.nombre = estudianteEntrante.nombre
    estudiante_shouldExist.carrera = estudianteEntrante.carrera
    estudiante_shouldExist.correo = estudianteEntrante.correo

    db.query(Club_Estudiante).filter(
        Club_Estudiante.id_estudiante == estudianteEntrante.carnet
    ).delete(synchronize_session=False)

    for i, club_id in enumerate(estudianteEntrante.clubes):
        try:
            actividad_val = estudianteEntrante.actividad[i]
            cargo_val = estudianteEntrante.cargo[i]
        except IndexError:
            raise HTTPException(status_code=400, detail=f"Faltan valores de actividad o cargo para el club con ID {club_id}.")
        
        club = db.query(Club).get(club_id)
        if not club:
            raise HTTPException(status_code=400, detail=f"Club con ID {club_id} no existe.")
        
        club_estudiante = Club_Estudiante(
            id_club=club_id,
            id_estudiante=estudianteEntrante.carnet,
            actividad=actividad_val,
            cargo=cargo_val
        )
        db.add(club_estudiante)
    
    db.commit()  
    db.refresh(estudiante_shouldExist)
    return {
        "message": "Estudiante actualizado correctamente",
        "estudiante": {
        "carnet":  estudiante_shouldExist.carnet,
        "nombre":  estudiante_shouldExist.nombre,
        "carrera": estudiante_shouldExist.carrera,
        "correo":  estudiante_shouldExist.correo,
        "clubes":  estudianteEntrante.clubes,
        "actividad": estudianteEntrante.actividad,
        "cargo": estudianteEntrante.cargo,
        }
    }

    
@router.delete("/delete")
def borrar_estudiante(carnet: CarnetEntrante, db: Session = Depends(get_db)):
    estudiante_shouldExist = db.query(Estudiante).filter(Estudiante.carnet == carnet.carnet).first()
    if not estudiante_shouldExist:
        raise HTTPException(status_code=400, detail="El estudiante a eliminar no existe.")
    
    db.query(Club_Estudiante).filter(Club_Estudiante.id_estudiante == carnet.carnet).delete()
    db.delete(estudiante_shouldExist)
    db.commit()
    return {
        "message":"estudiante eliminado",
        "estudiante id":carnet.carnet
    }
    