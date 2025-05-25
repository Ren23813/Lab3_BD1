import './input.css'

export const Input = ({
     title, name, value, onChange
}) => {
    return (
        <div className='contenedor'>
            <label className='labelI'>{title}</label>
            <input className='inputStyle' name={name} value={value} onChange={onChange}>
            </input>
        </div>
    )

}