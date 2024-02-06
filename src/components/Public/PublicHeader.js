 import React, { useState, useEffect } from "react";
 import { MdSearch, MdShoppingCart } from "react-icons/md";
 import { Link } from "react-router-dom";
 import DropdownMenu from "./DropdownMenu";
 import ModalComponent from "./Modal";
 import "../../styles/styles.css";
 
 function PublicHeader() {
   const [token, setToken] = useState({});
 
   useEffect(() => {
     const storedToken = localStorage.getItem("token");
 
     if (storedToken) {
       setToken(JSON.parse(storedToken));
     }
   }, []);
 
   const CustomerId = token && token.customerId;

    // modal iniciar sesion
    const [mostrarModal, setMostrarModal] = useState(false);

    const activarModal = () => setMostrarModal(true);
    const cerrarModal = () => setMostrarModal(false);
    
   return (
     <header className="d-flex">
       <div className="columna-1">
         <Link to="/">
           <img
             className="logo-app"
             src="/images/Chucherias.png"
             alt="Chucherias & Regalos"
           />
         </Link>
       </div>
       <div className="columna-2">
         <div className="search-bar">
           <input
             type="text"
             placeholder="¿Qué productos buscas el día de hoy?"
           />
           <Link to="/search">
             <MdSearch size={25} />
           </Link>
         </div>
         <nav className="mt-3">
           <ul>
             <li className="cinta-opciones">
               <DropdownMenu />
             </li>
             <li className="cinta-opciones">
               <Link to="/purchase-history">Historial</Link>
             </li>
             <li className="cinta-opciones">
               <Link to="">Compras</Link>
             </li>
             <li className="cinta-opciones">
               <Link to="">Ofertas</Link>
             </li>
             {CustomerId ? null : (
               <li className="cinta-opciones">
                 <Link onClick={() => setMostrarModal(true)}>Iniciar sesión</Link>
                 {mostrarModal && (
                   <ModalComponent
                     show={mostrarModal}
                     onClose={() => setMostrarModal(false)}
                   />
                 )}
               </li>
             )}
           </ul>
         </nav>
       </div>
       <div className="columna" style={{ width: "25%" }}>
         <div className="profile">
           <img
             className="logo-user"
             src="/images/user.png"
             alt="Banner de Usuario"
           />
           <h3>Nombre de Usuario</h3>
         </div>
         <div className="cart">
           <Link to="/checkup">
             <MdShoppingCart size={40} />
           </Link>
         </div>
       </div>
     </header>
   );
 }
 
 export default PublicHeader;
 