import React from "react";
import Lab1 from "../components/Lab1";

const Laboratorio1 = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Laboratorio 1: Creación de un Escenario 3D con Múltiples Figuras y Texturas</h1>
      <p>
        En este laboratorio se crea un escenario 3D que contiene cinco figuras geométricas diferentes:
        <strong> cubo, esfera, cono, toroide y cilindro</strong>. Cada figura tiene una textura aplicada mediante
        <strong> TextureLoader</strong> para mejorar su apariencia.
      </p>
      <p>
        En particular, el cubo utiliza dos capas de texturas: 
        <em> una para el color base (albedo)</em> y <em>otra para la transparencia (alpha)</em>.
        Además, la escena cuenta con una iluminación adecuada, y se han agregado controles (OrbitControls)
        para mover la cámara y explorar el entorno. La esfera también posee una ligera animación de rotación.
      </p>
      <div style={{ height: "500px" }}>
        <Lab1 />
      </div>
    </div>
  );
};

export default Laboratorio1;
