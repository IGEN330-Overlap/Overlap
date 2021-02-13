import React from 'react';
import './TextBlurb.css';

const Blurb = (props) => {
    return(
    <div className="about-name-container">
        <h1 className="big-text"><strong>About us</strong></h1>
        <div className="under-bar"></div>
        <p className='sub-text'>Hey! Glad you made it. Overlap is a class project built by a few students at UBC.</p> 
        <p className='sub-text'>If you have any question, comments, or concerns, please reach out!</p>
    </div>
    )
}

export default Blurb;