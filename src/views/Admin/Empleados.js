import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdFilterAlt, MdAdd, MdEdit } from "react-icons/md";

const Empleados = ({ title }) => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 15;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://backend-c-r-production.up.railway.app/admin/get-employee');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(employees.length / employeesPerPage); i++) {
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
                {title} |<small> Empleados</small>
              </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">{title}</a>
                </li>
                <li className="breadcrumb-item active">Empleados</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Empleados Registrados</h3>
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

            <hr className="border border-primary border-3 opacity-75"/>

            <p>
              <Link to="/admin/employs/add-employee" className="btn btn-primary btn-add">
                <MdAdd size={25} /> Agregar
              </Link>
            </p>

            <div className="table-responsive">
              <table
                id="employeesTable"
                className="table table-striped table-bordered table-hover table-sm"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido Paterno</th>
                    <th>Apellido Materno</th>
                    <th>Status</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEmployees.length > 0 ? (
                    currentEmployees.map((employee, index) => (
                      <tr key={employee.empleadoId}>
                        <td>{indexOfFirstEmployee + index + 1}</td>
                        <td>{employee.nombre}</td>
                        <td>{employee.apPaterno}</td>
                        <td>{employee.apMaterno}</td>
                        <td className="item-center">
                          {employee.statusId === 1 ? (
                            <i className="fas fa-check-circle text-success"></i>
                          ) : (
                            <i className="fas fa-times-circle text-danger"></i>
                          )}
                        </td>
                        <td>{employee.correo}</td>
                        <td className="item-center">
                          <Link
                            to={`edit-employee/${employee.empleadoId}`}
                            className="btn btn-warning mr-2"
                            data-toggle="tooltip"
                            title="Editar"
                          >
                            <MdEdit size={25} />
                          </Link>
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
                  <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                    <a onClick={handleClick} className="page-link" id={number}>
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
