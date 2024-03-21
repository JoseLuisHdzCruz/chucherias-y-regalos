// Content.js
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import {
    MdFilterAlt,
    MdAdd,
    MdEdit
  } from "react-icons/md";

const Inventario = ({ title }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://backend-c-r-production.up.railway.app/products/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Maneja el error según sea necesario
    }
  };

  return (
    <div className="content-wrapper">
      {/* Content Header */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>
                {title} |<small> Inventario</small>
              </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">{title}</a>
                </li>
                <li className="breadcrumb-item active">Inventario</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Productos Registrados</h3>
          </div>
          <div className="card-body">
            <div className="col-sm-12">
              <form action="" method="POST">
                <div className="form-group row">
                  <label for="filterNombre" className="col-sm-1 col-form-label">
                    Nombre:
                  </label>
                  <div className="col-sm-2">
                    <input
                      type="text"
                      className="form-control"
                      id="filterNombre"
                      name="filterNombre"
                      value=""
                    />
                  </div>
                  <label
                    for="filterTipoSangre"
                    className="col-sm-2 col-form-label"
                  >
                    Categoria:
                  </label>
                  <div className="col-sm-2">
                    <select
                      className="form-control"
                      id="filterTipoSangre"
                      name="filterTipoSangre"
                    >
                      <option disabled selected></option>
                    </select>
                  </div>
                  <label for="filterEdad" className="col-sm-1 col-form-label">
                    Estatus:
                  </label>
                  <div className="col-sm-2">
                    <input
                      type="number"
                      className="form-control"
                      id="filterEdad"
                      name="filterEdad"
                      value=""
                    />
                  </div>
                  <div className="col-sm-2">
                    <button type="submit" className="btn btn-success">
                      <MdFilterAlt size={25} /> Filtrar
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <hr className="hr-primary" />

            <p>
              <a href="/admin/inventory/add-product" className="btn btn-primary btn-add">
                <MdAdd size={25} /> Agregar
              </a>
            </p>

            <div className="table-responsive">
              <table
                id="productsTable"
                className="table table-striped table-bordered table-hover table-sm"
              >
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Precio</th>
                    <th>Existencia</th>
                    <th>Categoria</th>
                    <th>Creado</th>
                    <th>Modificado</th>
                    <th>Activo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <tr key={product.productoId}>
                        <td>{product.nombre}</td>
                        <td>{product.descripcion}</td>
                        <td>{product.precio}</td>
                        <td>{product.existencia}</td>
                        <td>{product.categoriaId}</td>
                        <td>{product.created}</td>
                        <td>{product.modified}</td>
                        <td className="item-center">
                          {product.statusId === "1" ? (
                            <i className="fas fa-check-circle text-success"></i>
                          ) : (
                            <i className="fas fa-times-circle text-danger"></i>
                          )}
                        </td>
                        <td className="item-center">
                          <a
                            href={`#edit/${product.productoId}`}
                            className="btn btn-warning mr-2"
                            data-toggle="tooltip"
                            title="Editar"
                          >
                            <MdEdit size={25} />
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="item-center">
                        No se encontraron productos.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer">
            <div id="load-more-container text-center"></div>
          </div>
        </div>
      </section>
      {/* /.content */}
    </div>
  );
};

export default Inventario;
