import "./ScreenOverlay.css";
import { Spinner } from "react-bootstrap";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ScreenOverlay = (props) => {
  const [renderBack, setRenderBack] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRenderBack(true);
    }, 6000);
  }, []);

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
