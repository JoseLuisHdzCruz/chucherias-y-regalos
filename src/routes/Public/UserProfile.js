import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { MdAccountCircle,  MdAdminPanelSettings, MdHome } from "react-icons/md";

const UserProfile = () => {

  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <div className="sidebar bg-light">
            <h3 className="mt-4 mb-3 ml-4 fw-bold">PERFIL DE USUARIO</h3>
            <ul className="list-unstyled mt-4">
              <li>
                <div className="row item-sidebar">
                  <div className="col-md-9">
                    <a className="text-dark ml-4">Información Personal</a>
                  </div>
                  <div className="col-md-3 text-center">
                    <MdAccountCircle color="gray" size={50} />
                  </div>
                </div>
              </li>
              <li>
                <div className="row item-sidebar">
                  <div className="col-md-9">
                    <a className="text-dark ml-4">Direcciones de envio</a>
                  </div>
                  <div className="col-md-3 text-center">
                    <MdHome color="gray" size={50} />
                  </div>
                </div>
              </li>
              <li>
                <div className="row item-sidebar">
                  <div className="col-md-9">
                    <a className="text-dark ml-4">Seguridad</a>
                  </div>
                  <div className="col-md-3 text-center">
                    <MdAdminPanelSettings color="gray" size={50} />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-9">
          <Profile />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
