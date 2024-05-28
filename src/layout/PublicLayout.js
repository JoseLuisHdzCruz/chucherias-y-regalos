import React, { useState } from "react";
import PublicHeader from "../components/Public/PublicHeader";
import PublicFooter from "../components/Public/PublicFooter";
import ScrollButton from "../components/Public/ScrollButton";
import Breadcrumbs from "../components/Public/Breadcrumbs";
import { useAuth } from "../context/AuthContext";
import NotificationButton from "../components/Public/NotificationButton";

const PublicLayout = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { token } = useAuth();

  const handleSearch = async (searchTerm) => {
    if (searchTerm !== "") {
      try {
        const response = await fetch(
          `https://backend-c-r-production.up.railway.app/products/search`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ search: searchTerm }),
          }
        );
        const data = await response.json();
        console.log(data);
        setSearchResults(data);
        setSearchTerm(searchTerm);
      } catch (error) {
        console.error("Error searching products:", error);
      }
    } else {
      setSearchResults([]); // Si el término de búsqueda está vacío, establecer los resultados como vacíos
      setSearchTerm(null); // O podrías establecer searchTerm como null o 0 según lo necesites
    }
  };

  return (
    <>
      <PublicHeader onSearch={handleSearch} />
      <Breadcrumbs />

      {React.Children.map(
        children,
        (child) =>
          React.cloneElement(child, {
            searchResults: searchResults,
            searchTerm: searchTerm || null,
          }) // Pasar searchTerm
      )}
      <ScrollButton />
      {token && <NotificationButton />}
      <PublicFooter />
    </>
  );
};

export default PublicLayout;
