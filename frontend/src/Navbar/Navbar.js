import './Navbar.css';
import logo from './overlap_image.jpg'

const Navbar = (props) => {
    return (
        <nav class="navbar navbar-text navbar-expand-lg fixed-top">
            <div class="container-fluid navbar-custom">
                 <img width="65" height="25" src= {logo} alt="logo"/>      
            <div class= "collapse navbar-collapse" id= "navbarNavAltMarkup">
                <ul class="navbar-nav me-auto mb-lg-0">
                    <li class="nav-item dropdown">  
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown">
                            My Groups
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./AboutUs">About Us</a>
                    </li>
                </ul>
            </div>
            </div>                       
        </nav>
    );  
}

export default Navbar;
