import PageTitle from '../../components/PageTitle'
import React, { useState, useEffect, useContext } from "react";
import {
  MdAdd,
  MdRemove
} from "react-icons/md";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CarruselProductos from "../../components/Public/CarruselProductos";
import { CartContext } from '../../context/CartContext';
import CartModal from '../../components/Public/CartModal';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const { token } = useAuth();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false); // Estado para controlar la apertura/cierre del modal del carrito

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

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if(token){
      addToCart(product, quantity);
      setIsCartModalOpen(true); // Abrir el modal del carrito después de agregar al carrito
    } else {
      toast.error("Para la siguiente accion debe iniciar sesión.")
    }
    
  };

  const handleCloseCartModal = () => {
    setIsCartModalOpen(false); // Cerrar el modal del carrito
  };

  return (
    <main>
      <PageTitle title="Chucherias & Regalos | Detalle del producto" />

      <h3 className="title-pag fw-bold text-uppercase">
        Detalle del producto
      </h3>
      <hr className="hr-primary" />

      <div className="detail-product">
        <div className="colum-detail">
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-6">
                <img
                  src={product.imagen}
                  className="img-fluid rounded-start mt-4"
                  alt="Oso de peluche"
                />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h2 className="title-product fw-bold">{product.nombre}</h2>
                  <h2 className="text-price mt-2 fw-bold">$ {product.precioFinal}</h2>
                  <span>IVA Incluido</span>

                  <p className="card-text mt-4">
                    {product.descripcion}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="colum-add">
          <div className="card">
            <div className="card-body">
              <h5 className="text-center">
                Disponible:<strong className='text-primary ml-2'>{product.existencia} piezas</strong> 
              </h5>
              <div className="cant mt-4">
                <h5>Cantidad</h5>
                <div className="counter">
                  <button className="decrement" onClick={handleDecrement}>
                    <MdRemove size={25} />
                  </button>
                  <span className="value">{quantity}</span>
                  <button className="increment" onClick={handleIncrement}>
                    <MdAdd size={25} />
                  </button>
                </div>
              </div>
              <div className="cont-buttons text-center mt-4">
                <button className="btn-secondary" style={{width:250}}>Comprar ahora</button>
                <button className="btn-primary" onClick={handleAddToCart}>Agregar a carrito</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CarruselProductos />
      <CartModal isOpen={isCartModalOpen} onClose={handleCloseCartModal} />
    </main>
  );
};

export default ProductDetail;
