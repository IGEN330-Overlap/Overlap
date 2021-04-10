import "./ScreenOverlay.css";
import { Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ScreenOverlay = (props) => {
  const [renderBack, setRenderBack] = useState(false);

  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
  }, []);

  //check if component mounted before setting timeout and state
  useEffect(() => {
    if (didMount === true) {
      setTimeout(() => {
        setRenderBack(true);
      }, 6000);
    }
  }, [didMount]);

  return (
    <div className="overlay">
      <div className="overlay-row">
        <h1 className="mr-4 overlay-text">{props.text}</h1>
        <Spinner animation="border" />
      </div>
      {renderBack && (
        <Link to="/" className="back-link">
          Something went wrong? Take me back!
        </Link>
      )}
    </div>
  );
};

export default ScreenOverlay;
