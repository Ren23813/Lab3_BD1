import { Button } from '../Buttons/Button'
import './header.css'

export const Header = ({
    text,
    onSelect
}) => {
    return(
        <div className='head'>
            <div className='divV'>
                <h2 className='titleH'>{text}</h2>
                <p className='nombres'>Melisa Mendizabal - Renato Rojas</p>
            </div>
            <div className='buttonsH'> 
                <Button 
                    text = 'Ver datos' 
                    onClick={() => onSelect('datos')}
                ></Button>

                <Button 
                    text = 'Nuevo +'
                    onClick={() => onSelect('nuevo')}
                ></Button>
            </div>
        </div>
    )
}