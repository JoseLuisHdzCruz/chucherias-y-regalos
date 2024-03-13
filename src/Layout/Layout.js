import React, { useState } from "react";
import PublicHeader from "../components/Public/PublicHeader";
import PublicFooter from "../components/Public/PublicFooter";
import ScrollButton from "../components/Public/ScrollButton";
import Breadcrumbs from "../components/Breadcrumbs";


const Layout = ({ children }) => {
    const [searchResults, setSearchResults] = useState([]);
    const handleSearch = async (searchTerm) => {
        // Verificar si el término de búsqueda no está vacío
        if (searchTerm.trim() !== "") {
          try {
            const response = await fetch(`https://backend-c-r-production.up.railway.app/products/search`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ search: searchTerm })
            });
            const data = await response.json();
            console.log(data);
            setSearchResults(data);
          } catch (error) {
            console.error("Error searching products:", error);
          }
        }
      };
    return (
      <>
        <PublicHeader onSearch={handleSearch} />
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { searchResults: searchResults })
        )}
        <ScrollButton />
        <Breadcrumbs />
        <PublicFooter />
      </>
    );
  };
  
  export default Layout;