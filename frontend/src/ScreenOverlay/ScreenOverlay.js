import "./ScreenOverlay.css";
import { Spinner } from "react-bootstrap";
import React from "react";

const ScreenOverlay = (props) => {
  return (
    <div className="overlay">
      <h1 className="mr-4">{props.text}</h1>
      <Spinner animation="border" />
    </div>
  );
};

export default ScreenOverlay;
