import PageTitle from "../../components/PageTitle";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { MdArrowRight, MdArrowLeft } from "react-icons/md";

const ProductDetail = () => {
  const [startIdx, setStartIdx] = useState(0);
  const elementsPerPage = 3;
  const [showDescription, setShowDescription] = useState(true);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleMoveLeft = () => {
    if (startIdx > 0) {
      setStartIdx(startIdx - 1);
    }
  };

  const handleMoveRight = () => {
    const maxStartIdx = 4 - elementsPerPage; // Ajusta esto según la cantidad total de elementos
    if (startIdx < maxStartIdx) {
      setStartIdx(startIdx + 1);
    }
  };

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [transformStyle, setTransformStyle] = useState("scale(1)");

  useEffect(() => {
    // Hacer la solicitud a la API para obtener los detalles del producto
    fetch(`https://backend-c-r-production.up.railway.app/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);

  if (!product) {
    // Puedes mostrar un mensaje de carga mientras se obtienen los datos
    return <p>Cargando...</p>;
  }

  const handleMouseMove = (e) => {
    const container = e.currentTarget;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const transformValue = `scale(2) translate(-50%, -50%) translate(${x}px, ${y}px)`;
    setTransformStyle(transformValue);
  };

  const handleMouseLeave = () => {
    setTransformStyle("scale(1)");
  };

  return (
    <main>
      <PageTitle title="Chucherias & Regalos | Detalle del producto" />

      <h3 className="title-pag fw-bold text-uppercase">Detalle del producto</h3>
      <hr className="hr-primary" />

      <section className="content">
        <div className="card card-solid">
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-sm-6">
                <h3 className="d-inline-block d-sm-none">{product.nombre}</h3>
                <div
                  className="col-12"
                  id="zoom-container"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ overflow: "hidden" }}
                >
                  <img
                    src={product.imagen}
                    className="product-image"
                    id="zoom-img"
                    alt="Product Image"
                    style={{
                      transform: transformStyle,
                      transition: "transform 0.5s",
                    }}
                  />
                </div>
                {/* <div className="col-12 product-image-thumbs">
                  <div className="product-image-thumb">
                    <img src="/images/icono-producto.jpg" alt="Product Image" />
                  </div>
                  <div className="product-image-thumb">
                    <img src="/images/icono-producto.jpg" alt="Product Image" />
                  </div>
                  <div className="product-image-thumb active">
                    <img src="/images/icono-producto.jpg" alt="Product Image" />
                  </div>
                  <div className="product-image-thumb">
                    <img src="/images/icono-producto.jpg" alt="Product Image" />
                  </div>
                  <div className="product-image-thumb">
                    <img src="/images/icono-producto.jpg" alt="Product Image" />
                  </div>
                </div> */}
              </div>
              <div className="col-12 col-sm-6">
                <h3 className="my-3">{product.nombre}</h3>
                <p>{product.descripcion}</p>
                <hr />
                <h4>Colores disponibles</h4>
                <div
                  className="btn-group btn-group-toggle"
                  data-toggle="buttons"
                >
                  <label className="btn btn-default text-center">
                    <input
                      type="radio"
                      name="color_option"
                      id="color_option_a1"
                      autoComplete="off"
                      checked
                    />
                    Green
                    <br />
                    <i className="fas fa-circle fa-2x text-green"></i>
                  </label>
                  <label className="btn btn-default text-center">
                    <input
                      type="radio"
                      name="color_option"
                      id="color_option_a2"
                      autoComplete="off"
                    />
                    Azul
                    <br />
                    <i className="fas fa-circle fa-2x text-blue"></i>
                  </label>
                  <label className="btn btn-default text-center">
                    <input
                      type="radio"
                      name="color_option"
                      id="color_option_a3"
                      autoComplete="off"
                    />
                    Morado
                    <br />
                    <i className="fas fa-circle fa-2x text-purple"></i>
                  </label>
                  <label className="btn btn-default text-center">
                    <input
                      type="radio"
                      name="color_option"
                      id="color_option_a4"
                      autoComplete="off"
                    />
                    Rojo
                    <br />
                    <i className="fas fa-circle fa-2x text-red"></i>
                  </label>
                  <label className="btn btn-default text-center active">
                    <input
                      type="radio"
                      name="color_option"
                      id="color_option_a5"
                      autoComplete="off"
                    />
                    Anaranjado
                    <br />
                    <i className="fas fa-circle fa-2x text-orange"></i>
                  </label>
                </div>
                <h4 className="mt-3">
                  Tamaño <small>Porfavor seleccione uno</small>
                </h4>
                <div
                  className="btn-group btn-group-toggle"
                  data-toggle="buttons"
                >
                  <label className="btn btn-default text-center">
                    <input
                      type="radio"
                      name="color_option"
                      id="color_option_b1"
                      autoComplete="off"
                    />
                    <span className="text-xl">S</span>
                    <br />
                    Small
                  </label>
                  <label className="btn btn-default text-center">
                    <input
                      type="radio"
                      name="color_option"
                      id="color_option_b2"
                      autoComplete="off"
                    />
                    <span className="text-xl">M</span>
                    <br />
                    Medium
                  </label>
                  <label className="btn btn-default text-center">
                    <input
                      type="radio"
                      name="color_option"
                      id="color_option_b3"
                      autoComplete="off"
                    />
                    <span className="text-xl">L</span>
                    <br />
                    Large
                  </label>
                  <label className="btn btn-default text-center active">
                    <input
                      type="radio"
                      name="color_option"
                      id="color_option_b4"
                      autoComplete="off"
                    />
                    <span className="text-xl">XL</span>
                    <br />
                    Xtra-Large
                  </label>
                </div>
                <div className="bg-gray py-2 px-3 mt-4">
                  <h2 className="mb-0">$ {product.precio}.00</h2>
                  <h4 className="mt-0">
                    <small>IVA: $2.25 </small>
                  </h4>
                </div>
                <div className="mt-4">
                  <div className="btn btn-primary btn-lg btn-flat">
                    <i className="fas fa-cart-plus fa-lg mr-2"></i>
                    Agregar a carrito
                  </div>
                  <div className="btn btn-default btn-lg btn-flat">
                    <i className="fas fa-heart fa-lg mr-2"></i>
                    Agregar a lista de deseos
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <nav className="w-100">
                <div className="nav nav-tabs text-center" id="product-tab" role="tablist">
                  <h2 className="text-primary">Comentarios</h2>
                </div>
              </nav>
              <div>
                <button
                  className="btn btn-outline-info"
                  onClick={toggleDescription}
                >
                  {showDescription
                    ? "Ocultar comentarios"
                    : "Mostrar comentario"}
                </button>
                <div
                  className={`tab-content p-3 ${
                    showDescription ? "" : "d-none"
                  }`}
                  id="nav-tabContent"
                >
                  <div
                    className="tab-pane fade active show"
                    id="product-desc"
                    role="tabpanel"
                    aria-labelledby="product-desc-tab"
                  >
                    {showDescription && (
                      <>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Morbi vitae condimentum erat. Vestibulum ante
                          ipsum primis in faucibus orci luctus et ultrices
                          posuere cubilia Curae; Sed posuere, purus at efficitur
                          hendrerit, augue elit lacinia arcu, a eleifend sem
                          elit et nunc. Sed rutrum vestibulum est, sit amet
                          cursus dolor fermentum vel.
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Morbi vitae condimentum erat. Vestibulum ante
                          ipsum primis in faucibus orci luctus et ultrices
                          posuere cubilia Curae; Sed posuere, purus at efficitur
                          hendrerit, augue elit lacinia arcu, a eleifend sem
                          elit et nunc. Sed rutrum vestibulum est, sit amet
                          cursus dolor fermentum vel.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="hr-primary" />
      <h4 className="title-pag fw-bold mt-3">Tambien podria gustarte</h4>

      <div className="carrusel-container mb-4">
        <div className="carrusel-detalle mt-4">
          <Link
            to="/product"
            style={{ display: startIdx <= 0 ? "block" : "none" }}
          >
            <div className="card mt-4">
              <div className="cont-img-carrusel">
                <img
                  src="/images/icono-producto.jpg"
                  className="card-img-top img-catalog"
                  alt="Oso de peluche"
                />
              </div>
              <div className="card-body mt-2">
                <div className="cont-description">
                  <h5>Oso Osito De Peluche Teo</h5>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to="/product"
            style={{ display: startIdx <= 1 ? "block" : "none" }}
          >
            <div className="card mt-4">
              <div className="cont-img-carrusel">
                <img
                  src="/images/icono-producto.jpg"
                  className="card-img-top img-catalog"
                  alt="..."
                />
              </div>
              <div className="card-body mt-2">
                <div className="cont-description">
                  <h5>Alcancia de cerdito colorida</h5>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to="/product"
            style={{ display: startIdx <= 2 ? "block" : "none" }}
          >
            <div className="card mt-4">
              <div className="cont-img-carrusel">
                <img
                  src="/images/icono-producto.jpg"
                  className="card-img-top img-catalog"
                  alt="..."
                />
              </div>
              <div className="card-body mt-2">
                <div className="cont-description">
                  <h5>Mochila para niñas con forma de catarina</h5>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to="/product"
            style={{ display: startIdx <= 3 ? "block" : "none" }}
          >
            <div className="card mt-4">
              <div className="cont-img-carrusel">
                <img
                  src="/images/icono-producto.jpg"
                  className="card-img-top img-catalog"
                  alt="..."
                />
              </div>
              <div className="card-body mt-2">
                <div className="cont-description">
                  <h5>Collar para dama con piedra preciosa</h5>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      {startIdx > 0 && (
        <button
          type="button"
          className="carrusel-button carrusel-button-left"
          onClick={handleMoveLeft}
        >
          <span aria-hidden="true">
            <MdArrowLeft size={40} />
          </span>
        </button>
      )}
      {startIdx < 4 - elementsPerPage && (
        <button
          type="button"
          className="carrusel-button carrusel-button-right"
          onClick={handleMoveRight}
        >
          <span aria-hidden="true">
            <MdArrowRight size={40} />
          </span>
        </button>
      )}
    </main>
  );
};

export default ProductDetail;
