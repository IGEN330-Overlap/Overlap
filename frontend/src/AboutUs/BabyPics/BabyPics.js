import "./BabyPics.css";
import Brendan from "./Brendan.png";
import Kevin from "./Kevin.jpg";
import Beatrice from "./Beatrice.jpg";
import Josi from "./Josi.jpg";
import Danica from "./Danica.jpg";
import RealRemy from "./RealRemy.jpg";

const Babies = (props) => {
    return(
        <div className= "baby-members">
            
            <div className= 'container-baby' onClick={()=>window.open('https://www.linkedin.com/in/-kevin-peng/')}>
                <img className='icon-baby' src={Kevin} alt= 'Kevin'></img>
                <p className="baby-name">
                    <b>Kevin</b>
                </p>
            </div>
            <div className= 'container-baby' onClick={()=>window.open('https://www.linkedin.com/in/danica-dickinson-997137197/')}>
                <img className='icon-baby' src={Danica} alt= 'Danica'></img>
                <p className="baby-name">
                    <b>Danica</b>
                </p>
            </div>
            <div className= 'container-baby' onClick={()=>window.open('https://www.linkedin.com/in/remy-zhang/')}>
                <img className='icon-baby' src={RealRemy} alt= 'RealRemy'></img>
                <div className="baby-name">
                    <b>Remy</b>
                </div>
            </div>
            <div className= 'container-baby' onClick={()=>window.open('https://www.linkedin.com/in/josiannzhou/')}>
                <img className='icon-baby' src={Josi} alt= 'Josie'></img>
                <div className="baby-name">
                    <b>Josie</b>
                </div>
            </div>
            <div className= 'container-baby' onClick={()=>window.open('https://www.linkedin.com/in/brendan-lai-176460182/')}>
                <img className='icon-baby' src={Brendan} alt= 'Brendan'></img>
                <div className="baby-name">
                    <b>Brendan</b>
                </div>
            </div>
            <div className= 'container-baby' onClick={()=>window.open('https://www.linkedin.com/in/beatrice-tam/')}>    
                <img className='icon-baby' src={Beatrice} alt= 'Beatrice'></img>
                <div className="baby-name">
                    <b>Beatrice</b>
                </div>
            </div>
        </div>
  );
};

export default Babies;
