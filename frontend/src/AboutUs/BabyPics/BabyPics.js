import './BabyPics.css';
import Brendan from './Brendan.png';
import Kevin from './Kevin.jpg';
import Beatrice from './Beatrice.jpg';
import Josi from './Josi.jpg';
import Danica from './Danica.jpg';
import Remy from './Remy.jpg';

const Babies = (props) => {
    return(
        <div className= "baby-members">
            <div className= 'container-baby'>
                <img className='icon' src={Danica} alt= 'Danica'></img></div>
                    <div className="name">
                                <strong>Danica</strong>
                        </div>
            <div className= 'container-baby'>
                <img className='icon' src={Kevin} alt= 'Kevin'></img></div>

            <div className= 'container-baby'>
                <img className='icon' src={Remy} alt= 'Remy'></img></div>
            
            <div className= 'container-baby'>
                <img className='icon' src={Josi} alt= 'Josi'></img></div>
            
            <div className= 'container-baby'>
                <img className='icon' src={Brendan} alt= 'Brendan'></img></div>

            <div className= 'container-baby'>    
                <img className='icon' src={Beatrice} alt= 'Beatrice'></img></div>
        </div>
    )
}

export default Babies;