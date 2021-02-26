import "./AboutUs.css"
import React from 'react';
import Blurb from './TextBlurb/TextBlurb';
import Navbar from "../Navbar/Navbar";
import Babies from './BabyPics/BabyPics';

const AboutUs = (props) => {
    return(     
        <div className="about-root">
            <div className= "navbar">
                <Navbar />
            </div>
            <div className="about">
            <div className="text-blurb">
                <Blurb />
            </div>
            <div className='display-babies'>
                <Babies />
            </div>
            </div>
        </div>        
    )
}

export default AboutUs;