import React from "react";
import "./TextBlurb.css";
import { ReactComponent as GithubLogo } from "./github.svg";

const Blurb = (props) => {
  return (
    <div className="about-name-container">
      <h1 className="big-text">
        <strong>About us</strong>
      </h1>
      <div className="under-bar"></div>
      <p className="sub-text">
        Hey! Glad you made it. Overlap is a web application designed and created
        by six Integrated Engineering Students at UBC. Our goal is to expand the
        social aspect of music sharing and music taste during these socially
        distant COVID times. Overlap makes recommended group playlists and adds
        fun and colourful music stats! We hope you enjoy exploring our
        quarantine project with your friends and would love to hear any feedback
        you have!
      </p>
      <p className="sub-text">
        If you have any question, comments, or concerns, please reach out!
      </p>
      <p className="sub-text">
        You can send us an email at:{" "}
        <a className="emailLink" href="mailto:projectoverlap.app@gmail.com">
          projectoverlap.app@gmail.com
        </a>
      </p>
      <p className="sub-text text-continued">Feel free to check out our GitHub repository: <a
        className="sub-text github-link d-inline-flex flex-row align-items-center"
        href="https://github.com/IGEN330-Overlap/Overlap"
        target="_blank"
        rel="noreferrer"
      >
        Github <GithubLogo className="github-logo" /></a> </p>
      <p className="sub-text">
        Or click on any of our baby photos to be taken to our linkedin profiles
        and send us a message!
      </p>
    </div>
  );
};

export default Blurb;
