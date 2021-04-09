import React from 'react';
import './TextBlurb.css';

const Blurb = (props) => {
    return(
    <div className="about-name-container">
        <h1 className="big-text"><strong>About us</strong></h1>
        <div className="under-bar"></div>
        <p className='sub-text'>Hey! Glad you made it. Overlap is a web application 
        designed and created by six Integrated Engineering Students at UBC.
        Our goal is to expand the social aspect of music sharing 
        and music taste during these socially distant COVID times. Overlap makes recommended group playlists
        and adds fun and colourful music stats! We hope you enjoy exploring
        our quarantine project with your friends and would love to hear any feedback you have!
        </p> 
        <p className='sub-text'>If you have any question, comments, or concerns, please reach out!</p>
        <p className='sub-text'>You can send us an email at: <b className="emailLink">projectoverlap.app@gmail.com</b></p>
        <p className='sub-text'>Or click on any of our baby photos to be taken to our linkedin profiles and send us a message!</p>
    </div>
    )
}

export default Blurb;