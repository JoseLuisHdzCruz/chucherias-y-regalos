// Content.js
import React from 'react';

const Content = ({ title, subTitle }) => {
  return (
    <div className="content-wrapper">
      {/* Content Header */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>
                {title} |
                <small> {subTitle}</small>
              </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">{title}</a></li>
                <li className="breadcrumb-item active">{subTitle}</li>
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

export default Content;