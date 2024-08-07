import React, { useEffect, useState } from "react";
import PageTitle from "../../components/Public/PageTitle";
import { Link } from "react-router-dom";
import BootstrapCarousel from "../../components/Public/BootstrapCarousel";
import { MdFilterAlt } from "react-icons/md";

function Home({ searchResults, searchTerm }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [startPage, setStartPage] = useState(1);
  const pagesToShow = 5;

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setProducts(searchResults);
      setCurrentPage(1); // Resetear a la primera página cuando hay resultados de búsqueda
    } else {
      fetch("https://backend-c-r-production.up.railway.app/products/")
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [searchResults]);

  useEffect(() => {
    // Limpiar los filtros cuando no hay término de búsqueda
    if (!searchResults || searchResults.length <= 0) {
      setMinPrice("");
      setMaxPrice("");
      setOrderBy("");
    }
  }, [searchResults]);

  // Filtrar y ordenar productos según criterios
  const filteredAndSortedProducts = () => {
    let filteredProducts = products;

    if (minPrice !== "") {
      filteredProducts = filteredProducts.filter(
        (product) => parseFloat(product.precio) >= parseFloat(minPrice)
      );
    }

    if (maxPrice !== "") {
      filteredProducts = filteredProducts.filter(
        (product) => parseFloat(product.precio) <= parseFloat(maxPrice)
      );
    }

    if (orderBy === "desc") {
      filteredProducts.sort(
        (a, b) => parseFloat(b.precio) - parseFloat(a.precio)
      );
    } else if (orderBy === "asc") {
      filteredProducts.sort(
        (a, b) => parseFloat(a.precio) - parseFloat(b.precio)
      );
    }

    return filteredProducts;
  };

  // Cambiar de página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calcular el número total de páginas
  const totalPages = Math.ceil(
    filteredAndSortedProducts().length / productsPerPage
  );

  const goToPreviousSet = () => {
    if (startPage > 1) {
      setStartPage(startPage - pagesToShow);
      paginate(startPage - pagesToShow);
    }
  };

  const goToNextSet = () => {
    if (startPage + pagesToShow <= totalPages) {
      setStartPage(startPage + pagesToShow);
      paginate(startPage + pagesToShow);
    }
  };

  return (
    <>
      <BootstrapCarousel />
      <main>
        <PageTitle title="Chucherías & Regalos | Inicio" />

        {searchResults && searchResults.length > 0 ? (
          <div className="advanced-search">
            <h2 className="text-center">Resultados para: {searchTerm}</h2>

            <div className="row mt-4 ml-4">
              <div className="col-12 col-md-5 mb-3 mb-md-0">
                <div className="row">
                  <div className="col-6 col-sm-3 d-flex justify-content-end align-items-center">
                    <label
                      htmlFor="min-price"
                      className="col-form-label col-form-label-sm"
                    >
                      Precio mínimo:
                    </label>
                  </div>
                  <div className="col-6 col-sm-3">
                    <input
                      type="number"
                      className="form-control"
                      id="min-price"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                  <div className="col-6 col-sm-3 d-flex justify-content-end align-items-center">
                    <label
                      htmlFor="max-price"
                      className="col-form-label col-form-label-sm"
                    >
                      Precio máximo:
                    </label>
                  </div>
                  <div className="col-6 col-sm-3">
                    <input
                      type="number"
                      className="form-control"
                      id="max-price"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-5">
                <div className="row">
                  <div className="col-2 col-sm-1 d-flex justify-content-end align-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="orderByDesc"
                      checked={orderBy === "desc"}
                      onChange={() =>
                        setOrderBy(orderBy === "desc" ? "" : "desc")
                      }
                    />
                  </div>
                  <div className="col-10 col-sm-5 d-flex align-items-center">
                    <label className="form-check-label" htmlFor="orderByDesc">
                      Mayor a menor
                    </label>
                  </div>
                  <div className="col-2 col-sm-1 d-flex justify-content-end align-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="orderByAsc"
                      checked={orderBy === "asc"}
                      onChange={() =>
                        setOrderBy(orderBy === "asc" ? "" : "asc")
                      }
                    />
                  </div>
                  <div className="col-10 col-sm-5 d-flex align-items-center">
                    <label className="form-check-label" htmlFor="orderByAsc">
                      Menor a mayor
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2 mb-3 mb-md-0">
                <span className="btn btn-info disabled w-100">
                  <MdFilterAlt size={20} /> Filtrar
                </span>
              </div>
            </div>
          </div>
        ) : (
          <h2>Recomendados</h2>
        )}

        <hr className="hr-primary my-4" />

        <div className="section">
          <div className="row catalogo">
            {filteredAndSortedProducts().length > 0 ? (
              filteredAndSortedProducts()
                .slice(
                  (currentPage - 1) * productsPerPage,
                  currentPage * productsPerPage
                )
                .map((product) => (
                  <div
                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 catalog"
                    key={product.productoId}
                  >
                    <Link
                      to={`/product/${product.productoId}`}
                      className="text-decoration-none"
                    >
                      <div className="card shadow-sm">
                        <div className="cont-img item-center">
                          <img
                            src={product.imagen}
                            className="card-img-top img-catalog"
                            alt={product.nombre}
                          />
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">{product.nombre}</h5>
                          <p className="card-text fw-bold mt-3">{`$ ${product.precioFinal}`}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
            ) : (
              <p>No se encontraron productos.</p>
            )}
          </div>
        </div>

        {/* Agregar paginación */}
        <ul className="pagination text-center mt-4">
          <li className={`page-item ${startPage === 1 ? "disabled" : ""}`}>
            <button onClick={goToPreviousSet} className="page-link">
              &laquo;
            </button>
          </li>

          {Array.from({
            length: Math.min(pagesToShow, totalPages - startPage + 1),
          }).map((_, index) => {
            const pageIndex = startPage + index;
            return (
              <li
                key={pageIndex}
                className={`page-item ${
                  currentPage === pageIndex ? "active" : ""
                }`}
              >
                <button
                  onClick={() => paginate(pageIndex)}
                  className="page-link"
                >
                  {pageIndex}
                </button>
              </li>
            );
          })}

          <li
            className={`page-item ${
              startPage + pagesToShow > totalPages ? "disabled" : ""
            }`}
          >
            <button onClick={goToNextSet} className="page-link">
              &raquo;
            </button>
          </li>
        </ul>
      </main>
    </>
  );
}

export default Home;
