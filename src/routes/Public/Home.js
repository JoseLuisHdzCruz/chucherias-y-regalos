import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { Link } from "react-router-dom";
import BootstrapCarousel from "../../components/Public/BootstrapCarousel";

function Home({ searchResults, searchTerm }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [orderBy, setOrderBy] = useState("");

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
    if (!searchResults && searchResults.length <= 0) {
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
  const totalPages = Math.ceil(filteredAndSortedProducts().length / productsPerPage);

  return (
    <>
      <BootstrapCarousel />
      <main>
        <PageTitle title="Chucherias & Regalos | Inicio" />

        {searchResults && searchResults.length > 0 ? (
          <div className="advanced-search">
            <h2 className="text-center">Resultados para: {searchTerm}</h2>

            <div className="cont-filter mt-4 ml-4">
              <div className="price-range">
                <div className="form-row">
                  <div className="form-group col-sm-6">
                    <label
                      htmlFor="min-price"
                      className="col-form-label col-form-label-sm mr-2"
                    >
                      Precio mínimo:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="min-price"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label
                      htmlFor="max-price"
                      className="col-form-label col-form-label-sm mr-2"
                    >
                      Precio máximo:
                    </label>
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
              <div className="order-by">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="orderByDesc"
                    checked={orderBy === "desc"}
                    onChange={() =>
                      setOrderBy(orderBy === "desc" ? "" : "desc")
                    }
                  />
                  <label className="form-check-label" htmlFor="orderByDesc">
                    Ordenar de mayor a menor
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="orderByAsc"
                    checked={orderBy === "asc"}
                    onChange={() => setOrderBy(orderBy === "asc" ? "" : "asc")}
                  />
                  <label className="form-check-label" htmlFor="orderByAsc">
                    Ordenar de menor a mayor
                  </label>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h2>Recomendados </h2>
        )}

        <hr className="hr-primary" />

        <div className="catalog">
          {filteredAndSortedProducts().length > 0 ? (
            filteredAndSortedProducts()
              .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
              .map((product) => (
                <Link
                  to={`/product/${product.productoId}`}
                  key={product.productoId}
                >
                  <div className="card mt-4" style={{ width: "18rem" }}>
                    <div className="cont-img">
                      <img
                        src={product.imagen}
                        className="card-img-top img-catalog"
                        alt={product.nombre}
                      />
                    </div>
                    <div className="card-body mt-3">
                      <div className="cont-description">
                        <h5>{product.nombre}</h5>
                      </div>
                      <div className="cont-price mt-4">
                        <h3 className="fw-bold">{`$ ${product.precio}`}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
          ) : (
            <p>No se encontraron productos.</p>
          )}
        </div>

        {/* Agregar paginación */}
        <ul className="pagination text-center mt-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default Home;
