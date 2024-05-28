// Content.js
import React from 'react';

const AddProduct = ({ title }) => {
  return (
    <div className="content-wrapper">
      {/* Content Header */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>
                {title} | 
                <small> Agregar nuevo producto</small>
              </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">{title}</a></li>
                <li className="breadcrumb-item active">Agregar nuevo producto</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="content">
        {/* Contenido específico del cuerpo */}
      </section>
      {/* /.content */}
    </div>
  );
};

export default AddProduct;