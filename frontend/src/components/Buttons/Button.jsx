import './button.css'

export const Button = ({
    text,
    onClick
}) => {
    return (
        
            <button className='buttonStyle' onClick={onClick}> 
                {text}
            </button>
            
        
    )
}