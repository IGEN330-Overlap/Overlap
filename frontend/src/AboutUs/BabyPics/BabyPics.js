import './BabyPics.css';
import Brendan from './Brendan.png';
import Kevin from './Kevin.jpg';
import Beatrice from './Beatrice.jpg';
import Josi from './Josi.jpg';
import Danica from './Danica.jpg';
import RealRemy from './RealRemy.jpg';

const Babies = (props) => {
    return(
        <div className= "baby-members">
            <div className= 'container-baby'>
                <img className='icon-baby' src={Danica} alt= 'Danica'></img></div>

            <div className= 'container-baby'>
                <img className='icon-baby' src={Kevin} alt= 'Kevin'></img></div>

            <div className= 'container-baby'>
                <img className='icon-baby' src={RealRemy} alt= 'RealRemy'></img></div>
            
            <div className= 'container-baby'>
                <img className='icon-baby' src={Josi} alt= 'Josi'></img></div>
            
            <div className= 'container-baby'>
                <img className='icon-baby' src={Brendan} alt= 'Brendan'></img></div>

            <div className= 'container-baby'>    
                <img className='icon-baby' src={Beatrice} alt= 'Beatrice'></img></div>
        </div>
    )
}

export default Babies;