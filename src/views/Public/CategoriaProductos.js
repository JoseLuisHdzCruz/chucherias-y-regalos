import React, { useEffect, useState } from "react";
import PageTitle from "../../components/Public/PageTitle";
import { Link } from "react-router-dom";
import BootstrapCarousel from "../../components/Public/BootstrapCarousel";
import { MdFilterAlt } from "react-icons/md";
import { useParams } from "react-router-dom";

function CategoriaProductos() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if ( id ) {
        fetch(`https://backend-c-r-production.up.railway.app/products/categoria/${id}`)
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error("Error fetching products:", error));
      setCurrentPage(1); // Resetear a la primera página cuando hay resultados de búsqueda
    } else {
      
    }
  }, [id]);

  useEffect(() => {
    // Limpiar los filtros cuando no hay término de búsqueda
    if (!products && products.length <= 0) {
      setMinPrice("");
      setMaxPrice("");
      setOrderBy("");
    }
  }, [products]);

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

        {products && products.length > 0 && (
           <div className="advanced-search">

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
                        <h3 className="fw-bold">{`$ ${product.precioFinal}`}</h3>
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

export default CategoriaProductos;
