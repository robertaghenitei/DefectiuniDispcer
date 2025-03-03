import React from "react";
import "../styles/Observatie.css"

function Observatie({ observatie }) {
  let temp = observatie.continut.split(":");

  return (
    <div>
      <div className="observatie"><b>{temp[0]}:</b>{temp[1]}</div>
    </div>
  );
}

export default Observatie;
