import React, { useState, useEffect } from "react";
import axios from "axios";
import PageTitle from "../../components/Public/PageTitle";

function AcercaDe() {
  const [data, setData] = useState({
    descripcion: "",
    mision: "",
    vision: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backend-c-r-production.up.railway.app/admin/getNosotros/1');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-3 mb-4">
      <PageTitle title="Chucherias & Regalos | Acerca De" />
      <h3 className="title-pag fw-bold text-uppercase">Acerca de nosotros</h3>
      <hr className="hr-primary" />

      <div className="row justify-content-center">
        <div className="col-md-11 text-center mb-4">
          <img
            src="/images/Chucherias.png"
            className="img-fluid rounded-start mt-4"
            alt="Chucherias & Regalos"
            style={{ height: "100px" }}
          />
        </div>
        <div className="col-md-11">
          <p className="text-justify">
            {data.descripcion}
          </p>
        </div>
      </div>
      <hr className="hr-primary" />

      <div className="row ml-4 align-items-center">
        <div className="col-md-5 text-center">
          <img
            src="/images/empresa1.png"
            className="img-fluid rounded-start mt-4"
            alt="Chucherias & Regalos"
            style={{ height: "300px" }}
          />
        </div>
        <div className="col-md-6">
          <h3 className="title-pag fw-bold text-uppercase mt-4 text-center">
            Misión
          </h3>
          <p className="ml-4 text-justify">
            {data.mision}
          </p>
        </div>
      </div>

      <div className="row ml-4 align-items-center">
        <div className="col-md-6">
          <h3 className="title-pag fw-bold text-uppercase mt-4 text-center">
            Visión
          </h3>
          <p className="ml-4 text-justify">
            {data.vision}
          </p>
        </div>
        <div className="col-md-5 text-center">
          <img
            src="/images/empresa2.png"
            className="img-fluid rounded-start mt-4"
            alt="Chucherias & Regalos"
            style={{ height: "300px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default AcercaDe;
