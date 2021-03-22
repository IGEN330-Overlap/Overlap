import React from 'react';
import './TextBlurb.css';

const Blurb = (props) => {
    return(
    <div className="about-name-container">
        <h1 className="big-text"><strong>About us</strong></h1>
        <div className="under-bar"></div>
        <p className='sub-text'>Hey! Glad you made it. Overlap is a web application 
        designed and created by six Integrated Engineering Students at UBC. 
        One thing the COVID pandemic has showed us is the lack of socialibilty in music. 
        Where you could previously go to parties or concerts and discover new music, 
        the pandemic has limited the opportunities to expand your own horizons. 
        </p> 
        <p className='sub-text'>If you have any question, comments, or concerns, please reach out!</p>
    </div>
    )
}

export default Blurb;