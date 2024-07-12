import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdFilterAlt, MdAdd } from "react-icons/md";
import { Form } from "react-bootstrap";

const Empleados = ({ title }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 15;

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("https://backend-c-r-production.up.railway.app/users");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleToggle = async (userId, nuevoEstado) => {
    try {
      await axios.put(`https://backend-c-r-production.up.railway.app/usuarios/${userId}`, {
        habilitado: nuevoEstado,
      });

      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.id === userId ? { ...usuario, habilitado: nuevoEstado } : usuario
        )
      );
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = usuarios.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(usuarios.length / employeesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>
                {title} |<small> Suspencion de usuarios</small>
              </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">{title}</a>
                </li>
                <li className="breadcrumb-item active">Suspencion de usuarios</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Usuarios Registrados</h3>
          </div>
          <div className="card-body">
            <div className="col-sm-12">
              <form action="" method="POST">
                <div className="form-group row">
                  <label htmlFor="filterCorreo" className="col-sm-2 col-form-label">
                    Correo:
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="form-control"
                      id="filterCorreo"
                      name="filterCorreo"
                      value=""
                    />
                  </div>
                  <label htmlFor="filterStatus" className="col-sm-2 col-form-label">
                    Estatus:
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="number"
                      className="form-control"
                      id="filterStatus"
                      name="filterStatus"
                      value=""
                    />
                  </div>
                  <div className="col-sm-1">
                    <button type="submit" className="btn btn-success">
                      <MdFilterAlt size={25} />
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <hr className="border border-primary border-3 opacity-75" />

            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover table-sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Usuario</th>
                    <th>Status</th>
                    <th>Habilitar / Deshabilitar</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEmployees.length > 0 ? (
                    currentEmployees.map((usuario, index) => (
                      <tr key={usuario.id}>
                        <td>{indexOfFirstEmployee + index + 1}</td>
                        <td>
                            <h5>{usuario.nombre} {usuario.aPaterno} {usuario.aMaterno}</h5>
                            <span className="mb-4">{usuario.correo}</span>
                        </td>
                        <td className="item-center">
                          {usuario.statusId === 1 ? (
                            <i className="fas fa-check-circle text-success"></i>
                          ) : (
                            <i className="fas fa-times-circle text-danger"></i>
                          )}
                        </td>
                        <td className="item-center">
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={usuario.statusId === 1}
                              onChange={(e) =>
                                handleToggle(usuario.id, e.target.checked)
                              }
                            />
                            <span className="slider round"></span>
                          </label>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="item-center">
                        No se encontraron empleados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer">
            <nav>
              <ul className="pagination justify-content-center" style={{ marginBottom: 80 }}>
                {pageNumbers.map((number) => (
                  <li
                    key={number}
                    className={`page-item ${
                      currentPage === number ? "active" : ""
                    }`}
                  >
                    <a
                      onClick={handleClick}
                      className="page-link"
                      id={number}
                      href="#"
                    >
                      {number}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Empleados;