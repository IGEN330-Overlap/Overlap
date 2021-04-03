import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './UserProfile.css';

import Navbar1 from "../Navbar/Navbar";
import { TopGenres } from '../GroupProfilePage/TopGenres/TopGenres';
import { GroupTopStats } from '../GroupProfilePage/TopStats/TopStats';
import ScreenOverlay from '../ScreenOverlay/ScreenOverlay';

const axios = require("axios");

const UserProfile = (props) => {
  const spotifyID = useSelector((state) => state.userObject);
  const userArray = [spotifyID];

  // get screen width to determine how many items in the carousel
  const [width, getWidth] = useState(window.innerWidth)

  useEffect(() => {
      const handleResize = () => {
          getWidth(window.innerWidth)
      }
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, [])

  if (spotifyID.userID === "" ) {
    return <ScreenOverlay text="Collecting your information" />;
  } else if (spotifyID) {
      console.log(spotifyID);
    return (
        <div className="user-landing-root">
        <Navbar1/>
        <div className="userProfile-title">
            <strong className="userProfile-title-text">My Music Profile</strong>
            <div className="under-bar"></div>
        </div>
        <div className="top-stats-display">
            <GroupTopStats groupUsers={userArray}/>
        </div>
        <div className="top-genres-display">
            <TopGenres groupUsers={userArray} />
        </div>
    </div>
    );
    }
};

export default UserProfile;