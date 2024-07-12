import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdFilterAlt, MdUpdate } from "react-icons/md";
import { Form } from "react-bootstrap";

const EditStockProducts = ({ title }) => {
    const [productos, setProductos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 15;
  
    useEffect(() => {
      const fetchProductos = async () => {
        try {
          const response = await axios.get("https://backend-c-r-production.up.railway.app/products");
          setProductos(response.data);
        } catch (error) {
          console.error("Error al obtener productos:", error);
        }
      };
  
      fetchProductos();
    }, []);
  
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);
  
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(productos.length / productsPerPage); i++) {
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
                {title} |<small> Actualizar existencia de productos</small>
              </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">{title}</a>
                </li>
                <li className="breadcrumb-item active">Actualizar existencia de productos</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Productos Registrados</h3>
          </div>
          <div className="card-body">
            <div className="col-sm-12">
              <form action="" method="POST">
                <div className="form-group row">
                  <label htmlFor="filterNombre" className="col-sm-2 col-form-label">
                    Nombre:
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="form-control"
                      id="filterNombre"
                      name="filterNombre"
                      value=""
                    />
                  </div>
                  <label htmlFor="filterCategoria" className="col-sm-2 col-form-label">
                    Categoría:
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      id="filterCategoria"
                      name="filterCategoria"
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
                    <th className="col-producto-existencia">Producto</th>
                    <th className="item-center">Existencia</th>
                    <th className="item-center">Nueva existencia</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.length > 0 ? (
                    currentProducts.map((producto, index) => (
                      <tr key={producto.id}>
                        <td>{indexOfFirstProduct + index + 1}</td>
                        <td>{producto.nombre}</td>
                        <td className="item-center">{producto.existencia}</td>
                        <td className="item-center">
                            <input type="number" className="form-control"/>
                        </td>
                        <td className="item-center">
                            <button type="submit" className="btn btn-warning" disabled="true">Actualizar <MdUpdate size={25}/></button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No se encontraron productos.
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
                    className={`page-item ${currentPage === number ? "active" : ""}`}
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

export default EditStockProducts;
