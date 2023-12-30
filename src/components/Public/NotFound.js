// NotFound.js
import React from "react";
import "../../styles/NotFound.css";

const NotFound = () => {
  return (
    <div className="body">
      <h1>Página no encontrada</h1>
      <p className="zoom-area">
        <b>¡Vaya! </b> Esta página es como una isla desierta. Nada por aquí.{" "}
      </p>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>    
    </div>
  );
};

export default NotFound;
