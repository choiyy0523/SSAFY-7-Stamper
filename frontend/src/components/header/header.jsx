import './header.css'
import Menu from '../../assets/burgermenu.png'

export default function header() {
    return (
        <div className='header'>
            <div>
                <img src={Menu} style={{height:'50px', width:'50px'}}></img>
            </div>
            <div>Stamper</div>
        </div>
    )
}