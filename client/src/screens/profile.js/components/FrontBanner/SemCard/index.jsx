import React from "react";
import "./styles.scss";
function SemCard(props) {
  return (
    <div className="semCard">
      <div className="inner1">
        <p> {props.sem}</p>
        <p>A</p>
      </div>
      <div className="inner2">Semester</div>
    </div>
  );
}

export default SemCard;
