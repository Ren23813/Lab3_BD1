import './select.css'

export const Select = ({
    value, onChange, disabled, opciones = []

}) => {
    return (
        <div>
            <select className = 'selectStyle' value={value} onChange={onChange} disabled={disabled}>
               
                {opciones.map((op, i) => (
                    <option key={i} value={op}>{op}</option>
                ))}
                </select>
        </div>

    )
}