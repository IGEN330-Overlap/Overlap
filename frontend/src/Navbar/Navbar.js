import './Navbar.css';
import logo from './overlap_image.jpg';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <nav class="navbar navbar-text navbar-expand-lg fixed-top">
            <div class="container-fluid">
                 <img width="75" height="30" src= {logo} alt="logo"/>      
            <div class= "collapse navbar-collapse" id= "navbarNavAltMarkup">
                <ul class="navbar-nav">
                    <li class="nav-item">  
                        <Link to ="GroupProfilePage/GroupProfilePage">My Groups</Link>
                    </li>
                    <li class="nav-item">
                        <Link to ="AboutUs/AboutUs">About Us</Link> 
                    </li>
                </ul>
            </div>
            </div>                       
        </nav>
    );  
}

export default Navbar;
