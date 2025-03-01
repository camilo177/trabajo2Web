import React from "react";
import Lab2 from "../components/Lab2";

const Laboratorio2 = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Laboratorio 2: Integración de un Escenario con Animación Mediante useFrame()</h1>
      <p>
        Este laboratorio presenta un escenario con tres figuras geométricas que usan useFrame() para:
        <ul>
          <li>Rotación continua en el eje Y.</li>
          <li>Movimiento oscilatorio en el eje Y.</li>
          <li>Interacción con el mouse para modificar la animación (rotación o escala) al hacer clic.</li>
        </ul>
      </p>
      <div style={{ height: "500px" }}>
        <Lab2 />
      </div>
    </div>
  );
};

export default Laboratorio2;
