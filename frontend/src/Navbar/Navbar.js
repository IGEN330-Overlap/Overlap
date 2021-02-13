import './Navbar.css';
import logo from '../overlap-logo.svg';
import { Link } from 'react-router-dom';


const Navbar = (props) => {
    return (
        <nav className="navbar navbar-text navbar-expand">
            <div className="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggle" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                 <Link to ="/authorized/"><img width="75" height="30" src= {logo} alt="logo"/></Link>     
            <div className= "navbar-collapse" id="navbarToggle">
                <ul className="navbar-nav">
                    <li className="nav-item">  
                        <strong><Link to ="/authorized/GroupProfilePage/GroupProfilePage/" className="links">My Groups</Link></strong>
                    </li>
                    <li className="nav-item">
                        <strong><Link to ="/authorized/AboutUs/" className="links">About Us</Link> </strong>
                    </li>
                </ul>
            </div>
            </div>                       
        </nav>
    );  
}

export default Navbar;
