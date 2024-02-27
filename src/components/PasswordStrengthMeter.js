// PasswordStrengthMeter.js

import React from "react";
import zxcvbn from "zxcvbn";

const PasswordStrengthMeter = ({ password, validations, className, style }) => {
  // Utiliza las validaciones de contraseña para verificar la fortaleza de la contraseña
  const isValidPassword = validations(password);

  // Calcula el score solo si la contraseña es válida
  const result = isValidPassword ? zxcvbn(password) : { score: 0 };
  const score = result.score;

  // Define mensajes de sugerencia para cada nivel de puntuación
  const suggestionMessages = [
    "Muy débil",
    "Débil",
    "Aceptable",
    "Fuerte",
    "Muy fuerte"
  ];

  // Define clases de color para la barra de progreso según la puntuación
  const progressColorClass =
    score === 0
      ? "bg-danger"
      : score === 1
      ? "bg-warning"
      : score === 2
      ? "bg-info"
      : score === 3
      ? "bg-success"
      : "bg-success";

  return (
    <div className={`password-strength-meter ${className}`} style={style}>
      <div className="progress">
        <div
          className={`progress-bar ${progressColorClass}`}
          role="progressbar"
          style={{ width: `${(score + 1) * 25}%` }}
          aria-valuenow={score}
          aria-valuemin="0"
          aria-valuemax="4"
        ></div>
      </div>
      <p>Fortaleza de la contraseña: {suggestionMessages[score]}</p>
    </div>
  );
};

export default PasswordStrengthMeter;
