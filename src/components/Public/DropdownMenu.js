import React, { useState, useEffect, useRef  } from 'react';
import '../../styles/DropdownMenu.css'; // Archivo de estilos para el menú
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { Link } from 'react-router-dom';

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <a onClick={toggleMenu}>
      Categoría {isOpen ? <MdExpandLess size={25} className="icon-align" /> : <MdExpandMore size={25} className="icon-align" />}
      </a>
      <ul className={`dropdown-list ${isOpen ? 'show' : ''}`}>
        <Link><li>Peluches</li></Link>
        <Link><li>Juguetes</li></Link>
        <Link><li>Pelotas</li></Link>
        {/* Agrega más opciones según sea necesario */}
      </ul>
    </div>
  );
}

export default DropdownMenu;

