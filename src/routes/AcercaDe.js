import React from 'react';
import '../styles/styles.css';
import { MdChevronRight } from "react-icons/md";


function AcercaDe() {
  return (
    <div className="wrapper row3 m-5">
        <h3 className="fw-semibold">
        Inicio <MdChevronRight size={25} className="icon-aling" /> Acerca De
      </h3>

      <h2 className="title-pag fw-bold mt-3 text-center">Quienes somos?</h2>
      <hr className="hr-primary" />
      <main className="hoc container clear">
        <div className="content">
          <div id="comments">
            <h2>
              <strong>Integrantes</strong>
            </h2>
            <div className="cont-group" style={{ display: 'flex' }}>
              <article className="card-alumno" style={{ marginRight: '50px' }}>
             
                  <figure className="avatar">
                    <img
                      src="/images/perfil_alumna.jpg"
                      style={{ height: '100px' }}
                      alt=""
                    />
                  </figure>
                  <h2>
                    <strong>Doroteo Martínez Itzel</strong>
                  </h2>
                <div className="comcont">
                  <p>
                    <strong>Grado:</strong> 7°
                  </p>
                  <p>
                    <strong>Grupo:</strong> A
                  </p>
                  <p>
                    <strong>Matricula:</strong> 20211311
                  </p>
                  <p>
                    <strong>Carrera:</strong> Ingeniería en Desarrollo y Gestión de Software
                  </p>
                </div>
              </article>
              <article className="card-alumno">
                  <figure className="avatar">
                    <img
                      src="/images/perfil_alumno.jpg"
                      style={{ height: '100px' }}
                      alt=""
                    />
                  </figure>
                  <h2>
                    <strong>Hernández De La Cruz José Luis</strong>
                  </h2>
                <div className="comcont">
                  <p>
                    <strong>Grado:</strong> 7°
                  </p>
                  <p>
                    <strong>Grupo:</strong> A
                  </p>
                  <p>
                    <strong>Matricula:</strong> 20211032
                  </p>
                  <p>
                    <strong>Carrera:</strong> Ingeniería en Desarrollo y Gestión de Software
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
        {/* / main body */}
        <div className="clear"></div>
      </main>
    </div>
  );
}

export default AcercaDe;