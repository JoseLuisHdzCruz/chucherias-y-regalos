import PageTitle from '../../components/PageTitle'
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import {
  MdChevronRight,
  MdAdd,
  MdRemove,
  MdArrowRight,
  MdArrowLeft,
} from "react-icons/md";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Funcion del carrusel
  // const [position, setPosition] = useState(0);

  // const handleMoveLeft = () => {
  //   setPosition((prevPosition) => prevPosition - 1);
  // };

  // const handleMoveRight = () => {
  //   setPosition((prevPosition) => prevPosition + 1);
  // };

  const [startIdx, setStartIdx] = useState(0);
  const elementsPerPage = 3;

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

  return (
    <main>
      <PageTitle title="Chucherias & Regalos | Detalle del producto" />

      <h3 className="title-pag fw-bold text-uppercase">
        Detalle del producto
      </h3>
      <hr className="hr-primary" />

      <section className="content">
            <div className="card card-solid">
                <div className="card-body">
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <h3 className="d-inline-block d-sm-none">Oso Osito De Peluche Teo</h3>
                            <div className="col-12">
                                <img src="/images/oso de peluche.jpg" className="product-image" alt="Product Image" />
                            </div>
                            <div className="col-12 product-image-thumbs">
                                <div className="product-image-thumb"><img src="/images/oso de peluche.jpg" alt="Product Image" /></div>
                                <div className="product-image-thumb"><img src="/images/oso de peluche.jpg" alt="Product Image" /></div>
                                <div className="product-image-thumb active"><img src="/images/oso de peluche.jpg" alt="Product Image" /></div>
                                <div className="product-image-thumb"><img src="/images/oso de peluche.jpg" alt="Product Image" /></div>
                                <div className="product-image-thumb"><img src="/images/oso de peluche.jpg" alt="Product Image" /></div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6">
                            <h3 className="my-3">Oso Osito De Peluche Teo</h3>
                            <p>Hermoso osito Teo súper esponjosito y suave. Calidad
                    PREMIUM. <br /> Ideal para arreglos de mesa y regalo. Si no
                    encuentra los sets de este mismo modelo puede preguntar por
                    ellos.</p>
                            <hr />
                            <h4>Colores disponibles</h4>
                            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                <label className="btn btn-default text-center">
                                    <input type="radio" name="color_option" id="color_option_a1" autoComplete="off" checked />
                                    Green
                                    <br />
                                    <i className="fas fa-circle fa-2x text-green"></i>
                                </label>
                                <label className="btn btn-default text-center">
                                    <input type="radio" name="color_option" id="color_option_a2" autoComplete="off" />
                                    Blue
                                    <br />
                                    <i className="fas fa-circle fa-2x text-blue"></i>
                                </label>
                                <label className="btn btn-default text-center">
                                    <input type="radio" name="color_option" id="color_option_a3" autoComplete="off" />
                                    Purple
                                    <br />
                                    <i className="fas fa-circle fa-2x text-purple"></i>
                                </label>
                                <label className="btn btn-default text-center">
                                    <input type="radio" name="color_option" id="color_option_a4" autoComplete="off" />
                                    Red
                                    <br />
                                    <i className="fas fa-circle fa-2x text-red"></i>
                                </label>
                                <label className="btn btn-default text-center active">
                                    <input type="radio" name="color_option" id="color_option_a5" autoComplete="off" />
                                    Orange
                                    <br />
                                    <i className="fas fa-circle fa-2x text-orange"></i>
                                </label>
                            </div>
                            <h4 className="mt-3">Size <small>Please select one</small></h4>
                            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                <label className="btn btn-default text-center">
                                    <input type="radio" name="color_option" id="color_option_b1" autoComplete="off" />
                                    <span className="text-xl">S</span>
                                    <br />
                                    Small
                                </label>
                                <label className="btn btn-default text-center">
                                    <input type="radio" name="color_option" id="color_option_b2" autoComplete="off" />
                                    <span className="text-xl">M</span>
                                    <br />
                                    Medium
                                </label>
                                <label className="btn btn-default text-center">
                                    <input type="radio" name="color_option" id="color_option_b3" autoComplete="off" />
                                    <span className="text-xl">L</span>
                                    <br />
                                    Large
                                </label>
                                <label className="btn btn-default text-center active">
                                    <input type="radio" name="color_option" id="color_option_b4" autoComplete="off" />
                                    <span className="text-xl">XL</span>
                                    <br />
                                    Xtra-Large
                                </label>
                            </div>
                            <div className="bg-gray py-2 px-3 mt-4">
                                <h2 className="mb-0">
                                    $80.00
                                </h2>
                                <h4 className="mt-0">
                                    <small>Ex Tax: $80.00 </small>
                                </h4>
                            </div>
                            <div className="mt-4">
                                <div className="btn btn-primary btn-lg btn-flat">
                                    <i className="fas fa-cart-plus fa-lg mr-2"></i>
                                    Add to Cart
                                </div>
                                <div className="btn btn-default btn-lg btn-flat">
                                    <i className="fas fa-heart fa-lg mr-2"></i>
                                    Add to Wishlist
                                </div>
                            </div>
                            <div className="mt-4 product-share">
                                <Link to="#" className="text-gray">
                                    <i className="fab fa-facebook-square fa-2x"></i>
                                </Link>
                                <Link to="#" className="text-gray">
                                    <i className="fab fa-twitter-square fa-2x"></i>
                                </Link>
                                <Link to="#" className="text-gray">
                                    <i className="fas fa-envelope-square fa-2x"></i>
                                </Link>
                                <Link to="#" className="text-gray">
                                    <i className="fas fa-rss-square fa-2x"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <nav className="w-100">
                            <div className="nav nav-tabs" id="product-tab" role="tablist">
                                <Link className="nav-item nav-link active" id="product-desc-tab" data-toggle="tab" to="#product-desc" role="tab" aria-controls="product-desc" aria-selected="true">Description</Link>
                                <Link className="nav-item nav-link" id="product-comments-tab" data-toggle="tab" to="#product-comments" role="tab" aria-controls="product-comments" aria-selected="false">Comments</Link>
                                <Link className="nav-item nav-link" id="product-rating-tab" data-toggle="tab" to="#product-rating" role="tab" aria-controls="product-rating" aria-selected="false">Rating</Link>
                            </div>
                        </nav>
                        <div className="tab-content p-3" id="nav-tabContent">
                            <div className="tab-pane fade active show" id="product-desc" role="tabpanel" aria-labelledby="product-desc-tab"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae condimentum erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed posuere, purus at efficitur hendrerit, augue elit lacinia arcu, a eleifend sem elit et nunc. Sed rutrum vestibulum est, sit amet cursus dolor fermentum vel. Suspendisse mi nibh, congue et ante et, commodo mattis lacus. Duis varius finibus purus sed venenatis. Vivamus varius metus quam, id dapibus velit mattis eu. Praesent et semper risus. Vestibulum erat erat, condimentum at elit at, bibendum placerat orci. Nullam gravida velit mauris, in pellentesque urna pellentesque viverra. Nullam non pellentesque justo, et ultricies neque. Praesent vel metus rutrum, tempus erat a, rutrum ante. Quisque interdum efficitur nunc vitae consectetur. Suspendisse venenatis, tortor non convallis interdum, urna mi molestie eros, vel tempor justo lacus ac justo. Fusce id enim a erat fringilla sollicitudin ultrices vel metus. </div>
                            <div className="tab-pane fade" id="product-comments" role="tabpanel" aria-labelledby="product-comments-tab"> Vivamus rhoncus nisl sed venenatis luctus. Sed condimentum risus ut tortor feugiat laoreet. Suspendisse potenti. Donec et finibus sem, ut commodo lectus. Cras eget neque dignissim, placerat orci interdum, venenatis odio. Nulla turpis elit, consequat eu eros ac, consectetur fringilla urna. Duis gravida ex pulvinar mauris ornare, eget porttitor enim vulputate. Mauris hendrerit, massa nec aliquam cursus, ex elit euismod lorem, vehicula rhoncus nisl dui sit amet eros. Nulla turpis lorem, dignissim a sapien eget, ultrices venenatis dolor. Curabitur vel turpis at magna elementum hendrerit vel id dui. Curabitur a ex ullamcorper, ornare velit vel, tincidunt ipsum. </div>
                            <div className="tab-pane fade" id="product-rating" role="tabpanel" aria-labelledby="product-rating-tab"> Cras ut ipsum ornare, aliquam ipsum non, posuere elit. In hac habitasse platea dictumst. Aenean elementum leo augue, id fermentum risus efficitur vel. Nulla iaculis malesuada scelerisque. Praesent vel ipsum felis. Ut molestie, purus aliquam placerat sollicitudin, mi ligula euismod neque, non bibendum nibh neque et erat. Etiam dignissim aliquam ligula, aliquet feugiat nibh rhoncus ut. Aliquam efficitur lacinia lacinia. Morbi ac molestie lectus, vitae hendrerit nisl. Nullam metus odio, malesuada in vehicula at, consectetur nec justo. Quisque suscipit odio velit, at accumsan urna vestibulum a. Proin dictum, urna ut varius consectetur, sapien justo porta lectus, at mollis nisi orci et nulla. Donec pellentesque tortor vel nisl commodo ullamcorper. Donec varius massa at semper posuere. Integer finibus orci vitae vehicula placerat. </div>
                        </div>
                    </div>
                </div>
            </div>
      </section>

      <hr className="hr-primary" />
      <h4 className="title-pag fw-bold mt-3">Tambien podria gustarte</h4>

      <div className="carrusel-container mb-4">
        <div
          className="carrusel-detalle mt-4"
        >
            <Link to="/product" style={{ display: startIdx <= 0 ? 'block' : 'none' }}>
              <div className="card mt-4">
                <div className="cont-img-carrusel">
                  <img
                    src="/images/oso de peluche.jpg"
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

            <Link to="/product" style={{ display: startIdx <= 1 ? 'block' : 'none' }}>
              <div className="card mt-4">
                <div className="cont-img-carrusel">
                  <img
                    src="/images/R (2).jpg"
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

            <Link to="/product" style={{ display: startIdx <= 2 ? 'block' : 'none' }}>
              <div className="card mt-4">
                <div className="cont-img-carrusel">
                  <img
                    src="/images/R.jpg"
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

            <Link to="/product" style={{ display: startIdx <= 3 ? 'block' : 'none' }}>
              <div className="card mt-4">
                <div className="cont-img-carrusel">
                  <img
                    src="/images/collar.jpg"
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
