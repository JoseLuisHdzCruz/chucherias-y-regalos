import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import {
  MdFilterAlt,
  MdRemove,
  MdFilterAltOff,
  MdProductionQuantityLimits,
} from "react-icons/md";
import PageTitle from "../../components/Public/PageTitle";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useAlert } from "../../context/AlertContext";
import { Calendar } from "primereact/calendar";
import PurchaseCard from "../../components/Public/PurchaseCard";
import PurchaseDetailModal from "../../components/Public/PurchaseDetailModal";
import CancelPurchaseModal from "../../components/Public/CancelPurchaseModal";
import { Paginator } from "primereact/paginator";
import FeedbackSurvey from "../../components/Public/FeedbackSurvey";

const PurchaseHistory = () => {
  const { token } = useAuth();
  const showAlert = useAlert();
  const [user, setUser ] = useState(0);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [first, setFirst] = useState(0); // Para PrimeReact Paginator
  const purchasesPerPage = 8;
  const [dataHistory, setDataHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [venta, setVenta] = useState(null);
  const [folioVenta, setFolioVenta] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    fechaInicial: "",
    fechaFinal: "",
  });
  // Nuevo estado para manejar la visibilidad del FeedbackSurvey modal
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded.customerId);

      // Verificar si el usuario ya ha sido encuestado
      const fetchUserSurveyStatus = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/users/${decoded.customerId}`);
          const userData = response.data;
          
          // Mostrar el modal si el usuario no ha sido encuestado
          if (userData.encuestado === "no") {
            setShowFeedbackModal(true);
          }
        } catch (error) {
          console.error("Error fetching user survey status:", error);
        }
      };

      fetchUserSurveyStatus();
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      const fetchPurchaseHistory = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/ventas/cliente/${user}`
          );
          const historyData = response.data;

          const purchaseDetailsPromises = historyData.map(async (purchase) => {
            const detailResponse = await axios.get(
              `http://localhost:5000/ventas/detalle/${purchase.ventaId}`
            );
            return {
              ...purchase,
              detalleVenta: detailResponse.data,
            };
          });

          const purchaseDetails = await Promise.all(purchaseDetailsPromises);

          setPurchaseHistory(purchaseDetails);
          setDataHistory(purchaseDetails);
          setLoading(false);
          setFirst(0); // Resetear a la primera página cuando hay resultados de búsqueda
        } catch (error) {
          console.error("Error fetching purchase history:", error);
          setLoading(false);
        }
      };

      fetchPurchaseHistory();
    }
  }, [user]);

  const openModal = async (purchase, ventaId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/ventas/${ventaId}`
      );
      setSelectedPurchase(purchase);
      setVenta(response.data);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching purchase details:", error);
    }
  };

  const handleClearFilter = () => {
    setPurchaseHistory(dataHistory);
    showAlert("info", "Se limpio el filtro de busqueda.");
    setFilterValues({
      fechaInicial: "",
      fechaFinal: "",
    });
  };

  // Función para cerrar el modal de cancelación
  const closeCancelModal = () => {
    setCancelModalOpen(false);
  };

  // Función para manejar la cancelación de la compra
  const handleCancelPurchase = async () => {
    try {
      console.log(folioVenta, cancelReason);
      // Aquí consumes la API para cambiar el estado de la venta al cancelarla
      await axios.post(`http://localhost:5000/ventas/cancelar-venta`, {
        folio: folioVenta, // Folio de la venta
        reason: cancelReason, // Razón de la cancelación
      });

      // Aquí puedes manejar la respuesta de la API, como mostrar un mensaje de éxito
      showAlert("success", "La compra ha sido cancelada correctamente.");

      // Actualizar el estado de purchaseHistory para reflejar el cambio de estado de la venta cancelada
      setPurchaseHistory((prevPurchaseHistory) =>
        prevPurchaseHistory.map((purchase) => {
          if (purchase.folio === folioVenta) {
            // Actualizar el estado de la compra cancelada
            return {
              ...purchase,
              statusVentaId: 5, // 5 representa el estado de venta cancelada
            };
          } else {
            // Mantener el estado de las compras que no se han cancelado
            return purchase;
          }
        })
      );

      // Aquí puedes cerrar el modal después de cancelar la compra
      closeCancelModal();
    } catch (error) {
      // Aquí puedes manejar los errores, como mostrar un mensaje de error
      console.error("Error canceling purchase:", error);
      showAlert("error", "Ha ocurrido un error al cancelar la compra.");
    }
  };

  // Función para abrir el modal de cancelación
  const openCancelModal = async (folio) => {
    setCancelModalOpen(true);
    setFolioVenta(folio);
  };

  const onPageChange = (event) => {
    setFirst(event.first);
  };

  const totalRecords = purchaseHistory.length;

  if (totalRecords === 0) {
    return (
      <main>
        <div className="d-flex ml-4 text-center">
          <h2 className="text-center">
            No se han realizado compras por el momento
          </h2>
        </div>

        <hr className="hr-primary" />
        <div className="text-center">
          <MdProductionQuantityLimits size={250} color="gray" />
        </div>
      </main>
    );
  }

  const CalendarField = ({ field, form, ...props }) => {
    return (
      <Calendar
        {...field}
        {...props}
        value={field.value || null}
        onChange={(e) => form.setFieldValue(field.name, e.value)}
        dateFormat="yy-mm-dd"
        placeholder="yyyy-mm-dd"
        className="w-100"
      />
    );
  };

  return (
    <main>
      <PageTitle title="Chucherias & Regalos | Historial de compra" />
      <h3 className="title-pag fw-bold text-uppercase">Historial de compras</h3>
      <hr className="hr-primary" />

      {showFeedbackModal && <FeedbackSurvey />}
      
      <div className="row item-filter">
        <div className="col-lg-10 mt-4">
          <Formik
            initialValues={filterValues}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await axios.post(
                  "http://localhost:5000/ventas/filtroVentas",
                  {
                    fechaInicial: values.fechaInicial,
                    fechaFinal: values.fechaFinal,
                    customerId: user,
                  }
                );

                const filterHistory = response.data;

                const purchaseDetailsPromises = filterHistory.map(
                  async (purchase) => {
                    const detailResponse = await axios.get(
                      `http://localhost:5000/ventas/detalle/${purchase.ventaId}`
                    );
                    return { ...purchase, detalleVenta: detailResponse.data };
                  }
                );

                const purchaseDetails = await Promise.all(
                  purchaseDetailsPromises
                );

                setPurchaseHistory(purchaseDetails);
                showAlert(
                  "success",
                  "Se aplico el filtro de historial de compra."
                );
              } catch (error) {
                console.error(
                  "Error fetching filtered purchase history:",
                  error
                );
              }
              setSubmitting(false);
            }}
            validate={(values) => {
              const errors = {};
              const currentDate = new Date();
              const minDate = new Date("2000-01-01");

              if (values.fechaInicial < minDate) {
                errors.fechaInicial =
                  "La fecha inicial no puede ser menor a 2000";
                showAlert(
                  "error",
                  "La fecha inicial no puede ser menor a 2000"
                );
              }

              if (values.fechaFinal > currentDate.toISOString().split("T")[0]) {
                errors.fechaFinal =
                  "La fecha final no puede ser mayor a la fecha actual";
                showAlert(
                  "error",
                  "La fecha final no puede ser mayor a la fecha actual"
                );
              }

              if (values.fechaFinal < values.fechaInicial) {
                errors.fechaFinal =
                  "La fecha final no puede ser menor a la fecha inicial";
                showAlert(
                  "error",
                  "La fecha final no puede ser menor a la fecha inicial"
                );
              }

              return errors;
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="d-flex flex-column flex-sm-row align-items-center">
                  <h5 className="me-3">Filtrar por fecha:</h5>
                  <div className="d-flex flex-grow-1 mb-2 mb-sm-0">
                    <Field
                      name="fechaInicial"
                      component={CalendarField}
                      className="form-control m-2"
                    />
                    <span className=" item-cente m-2">
                      <MdRemove size={20} />
                    </span>
                    <Field
                      name="fechaFinal"
                      component={CalendarField}
                      className="form-control m-2"
                    />
                  </div>

                  <div className="cont-btn-filter item-center">
                    <button
                      type="submit"
                      className="btn btn-info m-2"
                      disabled={isSubmitting}
                    >
                      <MdFilterAlt size={25} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleClearFilter}
                    >
                      <MdFilterAltOff size={25} />
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      
      <div className="row">
        <div className="col-lg-12">
          {purchaseHistory && purchaseHistory.length > 0 ? (
            loading ? (
              <p>Cargando historial de compras...</p>
            ) : (
              purchaseHistory
                .slice(first, first + purchasesPerPage)
                .map((purchase) => (
                  <PurchaseCard 
                    key={purchase.ventaId} 
                    purchase={purchase} 
                    openModal={openModal} 
                    openCancelModal={openCancelModal} 
                  />
                ))
            )
          ) : (
            <div className="d-flex ml-4 text-center">
              <h2 className="text-center">No hay compras aun</h2>
            </div>
          )}
        </div>
      </div>

      <PurchaseDetailModal 
        show={modalOpen} 
        onHide={() => setModalOpen(false)} 
        venta={venta} 
        selectedPurchase={selectedPurchase} 
      />

      <CancelPurchaseModal 
        show={cancelModalOpen} 
        onHide={closeCancelModal} 
        folioVenta={folioVenta} 
        handleCancelPurchase={handleCancelPurchase} 
      />

      {/* Agregar paginación con PrimeReact */}
      <Paginator
        first={first}
        rows={purchasesPerPage}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        className="my-custom-paginator"
        currentPageReportTemplate={`Mostrando {first} a {last} de {totalRecords} compras`}
      />
    </main>
  );
};

export default PurchaseHistory;