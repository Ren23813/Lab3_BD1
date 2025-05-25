import './input.css'

export const Input = ({
    title
}) => {
    return (
        <div className='contenedor'>
            <label className='labelI'>{title}</label>
            <input className='inputStyle'>
            </input>
        </div>
    )

}