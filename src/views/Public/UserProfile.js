import React, { useState } from "react";
import Profile from "./Profile";
import ProfileAddress from "./ProfileAddress";
import ProfileSecurity from "./ProfileSecurity";
import { MdAccountCircle, MdAdminPanelSettings, MdHome } from "react-icons/md";

const UserProfile = () => {
  const [selectedItem, setSelectedItem] = useState("Información Personal");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const getItemStyle = (item) => {
    return selectedItem === item
      ? { color: "#332e40", backgroundColor: "rgb(219 211 248)"}
      : { color: "black", backgroundColor: "transparent" };
  };

  // Renderizar el componente seleccionado
  const renderComponent = () => {
    switch (selectedItem) {
      case "Información Personal":
        return <Profile />;
      case "Direcciones de envio":
        return <ProfileAddress />;
      case "Seguridad":
        return <ProfileSecurity />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <div className="sidebar bg-light">
            <h3 className="mt-4 mb-3 ml-4 fw-bold">PERFIL DE USUARIO</h3>
            <ul className="list-unstyled mt-4">
              <li>
                <div
                  className="row item-sidebar"
                  onClick={() => handleItemClick("Información Personal")}
                  style={getItemStyle("Información Personal")}
                >
                  <div className="col-md-9">
                    <a className="text-dark ml-4">Información Personal</a>
                  </div>
                  <div className="col-md-3 text-center">
                    <MdAccountCircle size={50} />
                  </div>
                </div>
              </li>
              <li>
                <div
                  className="row item-sidebar"
                  onClick={() => handleItemClick("Direcciones de envio")}
                  style={getItemStyle("Direcciones de envio")}
                >
                  <div className="col-md-9">
                    <a className="text-dark ml-4">Direcciones de envio</a>
                  </div>
                  <div className="col-md-3 text-center">
                    <MdHome size={50} />
                  </div>
                </div>
              </li>
              <li>
                <div
                  className="row item-sidebar"
                  onClick={() => handleItemClick("Seguridad")}
                  style={getItemStyle("Seguridad")}
                >
                  <div className="col-md-9">
                    <a className="text-dark ml-4">Seguridad</a>
                  </div>
                  <div className="col-md-3 text-center">
                    <MdAdminPanelSettings size={50} />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-9">
        {renderComponent()}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
