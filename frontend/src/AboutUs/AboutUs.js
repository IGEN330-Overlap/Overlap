import "./AboutUs.css"
import Navbar from "../Navbar/Navbar"
import Brendan from "./Brendan.png"

const AboutUs = (props) => {
    return (
        <div className="landing-root d-flex flex-column justify-content-center align-items-left">
        <Navbar></Navbar>
            <h1 text-color>About us :)</h1>
            <p>Hey! Glad you made it. Overlap is a class project built by a few students at UBC.</p> 
            <p> If you have any question, comments, or concerns, please reach out!</p>
            <img src={Brendan} alt= "Brendan"></img>
        </div>
    );
}

export default AboutUs;