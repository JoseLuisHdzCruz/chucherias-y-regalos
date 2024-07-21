import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdFilterAlt, MdDeleteForever } from "react-icons/md";
import { Line, Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";

const SalesStatistics = ({ title }) => {
  const [monthlySales, setMonthlySales] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [leastProducts, setLeastProducts] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchMonthlySales();
    fetchProductDetails();
  }, []);

  const fetchMonthlySales = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/ventas/",
        {
          params: {
            startDate,
            endDate,
          },
        }
      );
      setMonthlySales(response.data);
    } catch (error) {
      console.error("Error fetching monthly sales:", error);
    }
  };

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/ventas/getAllDetailSale"
      );
      const productDetails = response.data;

      const productSales = productDetails.reduce((acc, detail) => {
        const { producto, cantidad } = detail;
        acc[producto] = (acc[producto] || 0) + cantidad;
        return acc;
      }, {});

      const sortedProducts = Object.entries(productSales).sort(
        ([, a], [, b]) => b - a
      );
      const topProducts = sortedProducts
        .slice(0, 10)
        .map(([name, sales]) => ({ name, sales }));
      const leastProducts = sortedProducts
        .slice(-10)
        .map(([name, sales]) => ({ name, sales }));

      setTopProducts(topProducts);
      setLeastProducts(leastProducts);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleFilter = () => {
    fetchMonthlySales();
  };

  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    fetchMonthlySales();
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const monthlySalesData = {
    labels: monthlySales.map((sale) =>
      new Date(sale.fecha).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Ventas Mensuales",
        data: monthlySales.map((sale) => sale.total),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const topProductsData = {
    labels: topProducts.map((product) => product.name),
    datasets: [
      {
        label: "Top 10 Productos Más Vendidos",
        data: topProducts.map((product) => product.sales),
        backgroundColor: "rgba(153,102,255,0.2)",
        borderColor: "rgba(153,102,255,1)",
        borderWidth: 1,
      },
    ],
  };

  const leastProductsData = {
    labels: leastProducts.map(product => product.name), // Nombre del producto
    datasets: [
      {
        label: 'Top 10 Productos Menos Vendidos',
        data: leastProducts.map(product => product.sales), // Cantidad vendida
        backgroundColor: leastProducts.map(() => getRandomColor()), // Colores aleatorios
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>
                {title} |<small> Estadísticas de Ventas</small>
              </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">{title}</a>
                </li>
                <li className="breadcrumb-item active">
                  Estadísticas de Ventas
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Ventas Mensuales</h3>
            <div className="card-tools">
              <div className="row">
                <div className="col-md-9">
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="date"
                        className="form-control"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="date"
                        className="form-control"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={handleFilter}
                      className="btn btn-success"
                      title="Filtrar"
                    >
                      <MdFilterAlt size={25} />
                    </button>
                    <button
                      onClick={handleClear}
                      className="btn btn-danger"
                      title="Limpiar campos"
                    >
                      <MdDeleteForever size={25} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <Line data={monthlySalesData} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Top 10 Productos Más Vendidos</h3>
          </div>
          <div className="card-body">
            <Bar data={topProductsData} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Top 10 Productos Menos Vendidos</h3>
          </div>
          <div className="card-body mb-4 text-center" style={{height:600}}>
            <Pie data={leastProductsData} style={{marginBottom:50}}/>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SalesStatistics;
