import "./AboutUs.css"
import Navbar from "../Navbar/Navbar"
import Brendan from "./Brendan.png"

const AboutUs = (props) => {
    return (
        <div className="format d-flex flex-column align-items-left">
        <Navbar></Navbar>
            <div>
                <h1 format text>About us :)</h1>
                <p>Hey! Glad you made it. Overlap is a class project built by a few students at UBC.</p> 
                <p> If you have any question, comments, or concerns, please reach out!</p>
                <img src={Brendan} alt= "Brendan"></img>
            </div>
        </div>
    );
}

export default AboutUs;