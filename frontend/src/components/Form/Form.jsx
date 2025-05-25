import { Input } from "../Inputs/Input"
import './form.css'

export const Form = () => {
    return (
        <div className="formStyle">
            <Input title={'Nombre: '}></Input>
            <Input title={'Carrera: '}></Input>
            <Input title={'Correo: '}></Input>
        </div>
    )
}