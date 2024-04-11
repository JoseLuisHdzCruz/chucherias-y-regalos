import React, { useState } from "react";

function GrowthRateCalculator() {
  const [amount, setAmount] = useState("");
  const [time, setTime] = useState("");
  const [rate, setRate] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const calculateRate = () => {
    const amt = parseFloat(amount);
    const t = parseFloat(time);

    if (!isNaN(amt) && !isNaN(t) && amt > 0 && t > 0) {
      const calculatedRate = Math.log(amt) / t;
      setRate(calculatedRate.toFixed(2));
    } else {
      setRate("Ingrese números válidos y mayores que cero en los campos.");
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Calculadora de Tasa de Crecimiento</h2>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Categoría:</label>
          <select
            className="form-select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="">Selecciona una opción</option>
            <option value="1">Peluches</option>
            <option value="2">Juegos de mesa</option>
          </select>
        </div>
        <div className="mb-3">
          <h5>Filtrar por fecha:</h5>
          <div className="row">
            <div className=" col-md-5">
              <input
                type="date"
                name="fechaInicial"
                className="form-control mb-2"
              />
            </div>
            <div className=" col-md-5">
              <input
                type="date"
                name="fechaFinal"
                className="form-control mb-2"
              />
            </div>
            <div className=" col-md-2">
              <button type="submit" className="btn btn-info">
                Obtener
              </button>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Cantidad:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tiempo:</label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="form-control"
          />
        </div>
        <button onClick={calculateRate} className="btn btn-primary">
          Calcular Tasa
        </button>
        <div>
          <h3>Tasa de Crecimiento:</h3>
          <p>{rate}</p>
        </div>
      </div>
    </div>
  );
}

export default GrowthRateCalculator;
