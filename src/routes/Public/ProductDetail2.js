import PageTitle from "../../components/PageTitle";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CarruselProductos from "../../components/Public/CarruselProductos";
import ComentariosProductos from "../../components/Public/ComentariosProdructos";
import CartModal from "../../components/Public/CartModal";
import ModalComponent from "../../components/Public/Modal"; // Nuevo import
import { useAuth } from "../../context/AuthContext";

const ProductDetail = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [transformStyle, setTransformStyle] = useState("scale(1)");
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [total, setTotal] = useState(0);
  // modal iniciar sesion
  const [mostrarModal, setMostrarModal] = useState(false);


  const activarModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  useEffect(() => {
    // Cargar el carrito desde localStorage al cargar el componente
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCartItems) {
      setCartItems(savedCartItems);
    }

    // Hacer la solicitud a la API para obtener los detalles del producto
    fetch(`https://backend-c-r-production.up.railway.app/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);

 
  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  if (!product) {
    // Puedes mostrar un mensaje de carga mientras se obtienen los datos
    return <p>Cargando...</p>;
  }

  const handleMouseMove = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const transformValue = `scale(2) translate(-50%, -50%) translate(${x}px, ${y}px)`;
    setTransformStyle(transformValue);
  };

  const handleMouseLeave = () => {
    setTransformStyle("scale(1)");
  };

  const btnAddStyle = {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    borderRadius: "10px",
  };

  const contButton = {
    justifyContent: "space-around",
    display: "flex",
    alignItems: "center",
  };

  const handleAddToCart = () => {
    if (!token) {
      // Usuario no autenticado, mostrar modal de inicio de sesión
      setMostrarModal(true);
    } else {
      // Usuario autenticado, agregar producto al carrito
      const existingItemIndex = cartItems.findIndex(
        (item) => item.id === product.id
      );
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity += 1;
        setCartItems(updatedCartItems);
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
      setIsModalOpen(true); // Abrir el modal después de agregar un producto al carrito
    }
  };

  const updateCartItem = (itemId, quantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const deleteCartItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
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
                <div className="mt-4" style={contButton}>
                  <div
                    className="btn btn-primary btn-lg btn-flat"
                    style={btnAddStyle}
                    onClick={handleAddToCart}
                  >
                    <i className="fas fa-cart-plus fa-lg mr-2"></i>
                    Agregar a carrito
                  </div>
                  <div
                    className="btn btn-default btn-lg btn-flat"
                    style={btnAddStyle}
                  >
                    <i className="fas fa-heart fa-lg mr-2"></i>
                    Agregar a lista de deseos
                  </div>
                </div>
              </div>
            </div>
            <ComentariosProductos />
          </div>
        </div>
      </section>

      <CarruselProductos />

      {/* Renderizar el modal de inicio de sesión */}
      {mostrarModal && (
        <ModalComponent
          show={mostrarModal}
          onClose={() => setMostrarModal(false)}
        />
      )}

      {/* Renderizar el modal del carrito */}
      {isModalOpen && (
        <CartModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          cartItems={cartItems}
          total={total}
          updateCartItem={updateCartItem}
          deleteCartItem={deleteCartItem}
        />
      )}
    </main>
  );
};

export default ProductDetail;

//

// import PageTitle from "../../components/PageTitle";
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import CarruselProductos from "../../components/Public/CarruselProductos";
// import ComentariosProductos from "../../components/Public/ComentariosProdructos";
// import CartModal from "../../components/Public/CartModal";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [transformStyle, setTransformStyle] = useState("scale(1)");
//   const [cartItems, setCartItems] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [total, setTotal] = useState(0);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario ha iniciado sesión

//   useEffect(() => {
//     // Cargar el carrito desde localStorage al cargar el componente
//     const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
//     if (savedCartItems) {
//       setCartItems(savedCartItems);
//     }

//     // Hacer la solicitud a la API para obtener los detalles del producto
//     fetch(`https://backend-c-r-production.up.railway.app/products/${id}`)
//       .then((response) => response.json())
//       .then((data) => setProduct(data))
//       .catch((error) =>
//         console.error("Error fetching product details:", error)
//       );
//   }, [id]);

//   // Guardar el carrito en localStorage cada vez que cambie
//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   if (!product) {
//     // Puedes mostrar un mensaje de carga mientras se obtienen los datos
//     return <p>Cargando...</p>;
//   }

//   const handleMouseMove = (e) => {
//     const x = e.nativeEvent.offsetX;
//     const y = e.nativeEvent.offsetY;
//     const transformValue = `scale(2) translate(-50%, -50%) translate(${x}px, ${y}px)`;
//     setTransformStyle(transformValue);
//   };

//   const handleMouseLeave = () => {
//     setTransformStyle("scale(1)");
//   };

//   const btnAddStyle = {
//     justifyContent: "center",
//     display: "flex",
//     alignItems: "center",
//     borderRadius: "10px"
//   };

//   const contButton = {
//     justifyContent: "space-around",
//     display: "flex",
//     alignItems: "center",
//   }

//   const handleAddToCart = () => {
//     const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);
//     if (existingItemIndex !== -1) {
//       const updatedCartItems = [...cartItems];
//       updatedCartItems[existingItemIndex].quantity += 1;
//       setCartItems(updatedCartItems);
//     } else {
//       setCartItems([...cartItems, { ...product, quantity: 1 }]);
//     }
//     setIsModalOpen(true); // Abrir el modal después de agregar un producto al carrito
//   };

//   const updateCartItem = (itemId, quantity) => {
//     const updatedCartItems = cartItems.map(item => {
//       if (item.id === itemId) {
//         return {...item, quantity};
//       }
//       return item;
//     });
//     setCartItems(updatedCartItems);
//   };

//   const deleteCartItem = (itemId) => {
//     const updatedCartItems = cartItems.filter(item => item.id !== itemId);
//     setCartItems(updatedCartItems);
//   };

//   return (
//     <main>
//       <PageTitle title="Chucherias & Regalos | Detalle del producto" />

//       <h3 className="title-pag fw-bold text-uppercase">Detalle del producto</h3>
//       <hr className="hr-primary" />

//       <section className="content">
//         <div className="card card-solid">
//           <div className="card-body">
//             <div className="row">
//               <div className="col-12 col-sm-6">
//                 <h3 className="d-inline-block d-sm-none">{product.nombre}</h3>
//                 <div
//                   className="col-12"
//                   id="zoom-container"
//                   onMouseMove={handleMouseMove}
//                   onMouseLeave={handleMouseLeave}
//                   style={{ overflow: "hidden" }}
//                 >
//                   <img
//                     src={product.imagen}
//                     className="product-image"
//                     id="zoom-img"
//                     alt="Product Image"
//                     style={{
//                       transform: transformStyle,
//                       transition: "transform 0.5s",
//                     }}
//                   />
//                 </div>
//                 {/* <div className="col-12 product-image-thumbs">
//                   <div className="product-image-thumb">
//                     <img src="/images/icono-producto.jpg" alt="Product Image" />
//                   </div>
//                   <div className="product-image-thumb">
//                     <img src="/images/icono-producto.jpg" alt="Product Image" />
//                   </div>
//                   <div className="product-image-thumb active">
//                     <img src="/images/icono-producto.jpg" alt="Product Image" />
//                   </div>
//                   <div className="product-image-thumb">
//                     <img src="/images/icono-producto.jpg" alt="Product Image" />
//                   </div>
//                   <div className="product-image-thumb">
//                     <img src="/images/icono-producto.jpg" alt="Product Image" />
//                   </div>
//                 </div> */}
//               </div>
//               <div className="col-12 col-sm-6">
//                 <h3 className="my-3">{product.nombre}</h3>
//                 <p>{product.descripcion}</p>
//                 <hr />
//                 <h4>Colores disponibles</h4>
//                 <div
//                   className="btn-group btn-group-toggle"
//                   data-toggle="buttons"
//                 >
//                   <label className="btn btn-default text-center">
//                     <input
//                       type="radio"
//                       name="color_option"
//                       id="color_option_a1"
//                       autoComplete="off"
//                       checked
//                     />
//                     Green
//                     <br />
//                     <i className="fas fa-circle fa-2x text-green"></i>
//                   </label>
//                   <label className="btn btn-default text-center">
//                     <input
//                       type="radio"
//                       name="color_option"
//                       id="color_option_a2"
//                       autoComplete="off"
//                     />
//                     Azul
//                     <br />
//                     <i className="fas fa-circle fa-2x text-blue"></i>
//                   </label>
//                   <label className="btn btn-default text-center">
//                     <input
//                       type="radio"
//                       name="color_option"
//                       id="color_option_a3"
//                       autoComplete="off"
//                     />
//                     Morado
//                     <br />
//                     <i className="fas fa-circle fa-2x text-purple"></i>
//                   </label>
//                   <label className="btn btn-default text-center">
//                     <input
//                       type="radio"
//                       name="color_option"
//                       id="color_option_a4"
//                       autoComplete="off"
//                     />
//                     Rojo
//                     <br />
//                     <i className="fas fa-circle fa-2x text-red"></i>
//                   </label>
//                   <label className="btn btn-default text-center active">
//                     <input
//                       type="radio"
//                       name="color_option"
//                       id="color_option_a5"
//                       autoComplete="off"
//                     />
//                     Anaranjado
//                     <br />
//                     <i className="fas fa-circle fa-2x text-orange"></i>
//                   </label>
//                 </div>
//                 <h4 className="mt-3">
//                   Tamaño <small>Porfavor seleccione uno</small>
//                 </h4>
//                 <div
//                   className="btn-group btn-group-toggle"
//                   data-toggle="buttons"
//                 >
//                   <label className="btn btn-default text-center">
//                     <input
//                       type="radio"
//                       name="color_option"
//                       id="color_option_b1"
//                       autoComplete="off"
//                     />
//                     <span className="text-xl">S</span>
//                     <br />
//                     Small
//                   </label>
//                   <label className="btn btn-default text-center">
//                     <input
//                       type="radio"
//                       name="color_option"
//                       id="color_option_b2"
//                       autoComplete="off"
//                     />
//                     <span className="text-xl">M</span>
//                     <br />
//                     Medium
//                   </label>
//                   <label className="btn btn-default text-center">
//                     <input
//                       type="radio"
//                       name="color_option"
//                       id="color_option_b3"
//                       autoComplete="off"
//                     />
//                     <span className="text-xl">L</span>
//                     <br />
//                     Large
//                   </label>
//                   <label className="btn btn-default text-center active">
//                     <input
//                       type="radio"
//                       name="color_option"
//                       id="color_option_b4"
//                       autoComplete="off"
//                     />
//                     <span className="text-xl">XL</span>
//                     <br />
//                     Xtra-Large
//                   </label>
//                 </div>
//                 <div className="bg-gray py-2 px-3 mt-4">
//                   <h2 className="mb-0">$ {product.precio}.00</h2>
//                   <h4 className="mt-0">
//                     <small>IVA: $2.25 </small>
//                   </h4>
//                 </div>
//                 <div className="mt-4" style={contButton}>
//                   <div className="btn btn-primary btn-lg btn-flat" style={btnAddStyle} onClick={handleAddToCart}>
//                     <i className="fas fa-cart-plus fa-lg mr-2"></i>
//                     Agregar a carrito
//                   </div>
//                   <div className="btn btn-default btn-lg btn-flat" style={btnAddStyle}>
//                     <i className="fas fa-heart fa-lg mr-2"></i>
//                     Agregar a lista de deseos
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <ComentariosProductos />
//           </div>
//         </div>
//       </section>

//       <CarruselProductos />

//        {/* Renderizar el modal si showCartModal es true */}
//        {isModalOpen && (
//         <CartModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           cartItems={cartItems}
//           total={total}
//           updateCartItem={updateCartItem}
//           deleteCartItem={deleteCartItem}
//         />
//       )}

//     </main>
//   );
// };

// export default ProductDetail;

// import PageTitle from "../../components/PageTitle";
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import CarruselProductos from "../../components/Public/CarruselProductos";
// import ComentariosProductos from "../../components/Public/ComentariosProdructos";
// import CartModal from "../../components/Public/CartModal";
// import { useCart } from "../../components/Public/CartContext";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [transformStyle, setTransformStyle] = useState("scale(1)");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { cartItems, updateCartItem } = useCart();

//   useEffect(() => {
//     // Hacer la solicitud a la API para obtener los detalles del producto
//     fetch(`https://backend-c-r-production.up.railway.app/products/${id}`)
//       .then((response) => response.json())
//       .then((data) => setProduct(data))
//       .catch((error) =>
//         console.error("Error fetching product details:", error)
//       );
//   }, [id]);

//   if (!product) {
//     // Puedes mostrar un mensaje de carga mientras se obtienen los datos
//     return <p>Cargando...</p>;
//   }

//   const handleMouseMove = (e) => {
//     const x = e.nativeEvent.offsetX;
//     const y = e.nativeEvent.offsetY;
//     const transformValue = `scale(2) translate(-50%, -50%) translate(${x}px, ${y}px)`;
//     setTransformStyle(transformValue);
//   };

//   const handleMouseLeave = () => {
//     setTransformStyle("scale(1)");
//   };

//   const btnAddStyle = {
//     justifyContent: "center",
//     display: "flex",
//     alignItems: "center",
//     borderRadius: "10px",
//   };

//   const contButton = {
//     justifyContent: "space-around",
//     display: "flex",
//     alignItems: "center",
//   };

//   const handleAddToCart = () => {
//     const existingItemIndex = cartItems.findIndex(
//       (item) => item.id === product.id
//     );
//     if (existingItemIndex !== -1) {
//       const updatedCartItems = [...cartItems];
//       updatedCartItems[existingItemIndex].quantity += 1;
//       updateCartItem(product.id, updatedCartItems[existingItemIndex].quantity);
//     } else {
//       updateCartItem(product.id, 1);
//     }
//     setIsModalOpen(true);
//   };

//   return (
//     <main>
//       <PageTitle title="Chucherias & Regalos | Detalle del producto" />

//       <h3 className="title-pag fw-bold text-uppercase">Detalle del producto</h3>
//       <hr className="hr-primary" />

//       <section className="content">
//         <div className="card card-solid">
//           <div className="card-body">
//             <div className="row">
//               <div className="col-12 col-sm-6">
//                 <h3 className="d-inline-block d-sm-none">{product.nombre}</h3>
//                 <div
//                   className="col-12"
//                   id="zoom-container"
//                   onMouseMove={handleMouseMove}
//                   onMouseLeave={handleMouseLeave}
//                   style={{ overflow: "hidden" }}
//                 >
//                   <img
//                     src={product.imagen}
//                     className="product-image"
//                     id="zoom-img"
//                     alt="Product Image"
//                     style={{
//                       transform: transformStyle,
//                       transition: "transform 0.5s",
//                     }}
//                   />
//                 </div>
//                 {/* <div className="col-12 product-image-thumbs">
//                   <div className="product-image-thumb">
//                     <img src="/images/icono-producto.jpg" alt="Product Image" />
//                   </div>
//                   <div className="product-image-thumb">
//                     <img src="/images/icono-producto.jpg" alt="Product Image" />
//                   </div>
//                   <div className="product-image-thumb active">
//                     <img src="/images/icono-producto.jpg" alt="Product Image" />
//                   </div>
//                   <div className="product-image-thumb">
//                     <img src="/images/icono-producto.jpg" alt="Product Image" />
//                   </div>
//                   <div className="product-image-thumb">
//                     <img src="/images/icono-producto.jpg" alt="Product Image" />
//                   </div>
//                 </div> */}
//               </div>
//               <div className="col-12 col-sm-6">
//                 <h3 className="my-3">{product.nombre}</h3>
//                 <p>{product.descripcion}</p>
//                 <hr />
//                 <h4>Colores disponibles</h4>
//                 <div
//                   className="btn-group btn-group-toggle"
//                   data-toggle="buttons"
//                 >
//                   <label className="btn btn-default text-center">
//                     <input
//                       type="radio"
//                       name="color_option"
//                       id="color_option_a1"
//                       autoComplete="off"
//                       checked
//                     />
//                     Green
//                     <br />
//                     <i className="fas fa-circle fa-2x text-green"></i>
//                   </label>
//                   <label className="btn btn-default text-center">
//                     <input
//                       type="radio"
//                       name="color_option"
//                       id="color_option_a2"
//                       autoComplete="off"
//                     />
//                     Azul
//                     <br />
//                     <i className="fas fa-circle fa-2x text-blue"></i>
//                   </label>
//                   <label className="btn btn-default text-center">
//                     <input
//                       type="radio"
//                       name="color_option"
//                       id="color_option_a3"
//                       autoComplete="off"
//                     />
//                     Morado
//                     <br />
//                     <i className="fas fa-circle fa-2x text-purple"></i>
//                   </label>
//                   <label className="btn btn-default text-center">
//                     <input
//                       type="radio"
//                       name="color_option"
//                       id="color_option_a4"
//                       autoComplete="off"
//                     />
//                     Rojo
//                     <br />
//                     <i className="fas fa-circle fa-2x text-red"></i>
//                   </label>
//                   <label className="btn btn-default text-center active">
//                     <input
//                       type="radio"
//                       name="color_option"
//                       id="color_option_a5"
//                       autoComplete="off"
//                     />
//                     Anaranjado
//                     <br />
//                     <i className="fas fa-circle fa-2x text-orange"></i>
//                   </label>
//                 </div>
//                 <h4 className="mt-3">
//                   Tamaño <small>Porfavor seleccione uno</small>
//                 </h4>
//                 <div
//                   className="btn-group btn-group-toggle"
//                   data-toggle="buttons"
//                 >
//                   <label className="btn btn-default text-center">
//                     <input
//                       type="radio"
//                       name="color_option"
//                       id="color_option_b1"
//                       autoComplete="off"
//                     />
//                     <span className="text-xl">S</span>
//                     <br />
//                     Small
//                   </label>
//                   <label className="btn btn-default text-center">
//                     <input
//                       type="radio"
//                       name="color_option"
//                       id="color_option_b2"
//                       autoComplete="off"
//                     />
//                     <span className="text-xl">M</span>
//                     <br />
//                     Medium
//                   </label>
//                   <label className="btn btn-default text-center">
//                     <input
//                       type="radio"
//                       name="color_option"
//                       id="color_option_b3"
//                       autoComplete="off"
//                     />
//                     <span className="text-xl">L</span>
//                     <br />
//                     Large
//                   </label>
//                   <label className="btn btn-default text-center active">
//                     <input
//                       type="radio"
//                       name="color_option"
//                       id="color_option_b4"
//                       autoComplete="off"
//                     />
//                     <span className="text-xl">XL</span>
//                     <br />
//                     Xtra-Large
//                   </label>
//                 </div>
//                 <div className="bg-gray py-2 px-3 mt-4">
//                   <h2 className="mb-0">$ {product.precio}.00</h2>
//                   <h4 className="mt-0">
//                     <small>IVA: $2.25 </small>
//                   </h4>
//                 </div>
//                 <div className="mt-4" style={contButton}>
//                   <div
//                     className="btn btn-primary btn-lg btn-flat"
//                     style={btnAddStyle}
//                     onClick={handleAddToCart}
//                   >
//                     <i className="fas fa-cart-plus fa-lg mr-2"></i>
//                     Agregar a carrito
//                   </div>
//                   <div
//                     className="btn btn-default btn-lg btn-flat"
//                     style={btnAddStyle}
//                   >
//                     <i className="fas fa-heart fa-lg mr-2"></i>
//                     Agregar a lista de deseos
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <ComentariosProductos />
//           </div>
//         </div>
//       </section>

//       <CarruselProductos />

//       {/* Renderizar el modal si showCartModal es true */}
//       <CartModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       />
//     </main>
//   );
// };

// export default ProductDetail;
