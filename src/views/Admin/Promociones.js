import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdEdit, MdSave, MdCancel } from "react-icons/md";

const Promociones = ({ title }) => {
  const [promocionesData, setPromocionesData] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchPromociones();
  }, []);

  const fetchPromociones = async () => {
    try {
      const response = await axios.get("https://backend-c-r-production.up.railway.app/admin/getPromociones");
      setPromocionesData(response.data);
    } catch (error) {
      console.error("Error fetching promociones:", error);
    }
  };

  const handleSave = async (promocionId) => {
    try {
      const promocion = promocionesData.find(p => p.promocionId === promocionId);
      await axios.put(`https://backend-c-r-production.up.railway.app/admin/updatePromocion/${promocionId}`, promocion);
      fetchPromociones();
      setEditing(false);
      toast.success("Promoción actualizada exitosamente.");
    } catch (error) {
      console.error("Error updating promocion:", error);
      alert("Error al actualizar la promoción.");
    }
  };

  const handleCancel = () => {
    setEditing(false);
    fetchPromociones(); // Re-fetch data to reset form
  };

  const handleChange = (e, promocionId) => {
    const { name, value } = e.target;
    setPromocionesData((prevData) =>
      prevData.map((promocion) =>
        promocion.promocionId === promocionId ? { ...promocion, [name]: value } : promocion
      )
    );
  };

  return (
    <div className="content-wrapper">
      {/* Content Header */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>
                {title} |<small> Promociones</small>
              </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">{title}</a>
                </li>
                <li className="breadcrumb-item active">Promociones</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="content">
        <div className="card mb-4">
          <div className="card-header">
            <h3 className="card-title">Gestor de promociones</h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group text-right">
                {editing ? (
                  <>
                    <button
                      type="button"
                      className="mb-4 btn btn-success mr-4"
                      onClick={() => handleSave(editing)}
                    >
                      Guardar <MdSave scale={25} />
                    </button>
                    <button
                      type="button"
                      className="mb-4 btn btn-secondary"
                      onClick={handleCancel}
                    >
                      Cancelar <MdCancel scale={25} />
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="mb-4 btn btn-warning"
                    onClick={() => setEditing(true)}
                  >
                    Editar <MdEdit scale={25} />
                  </button>
                )}
              </div>

              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Evento</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Final</th>
                    <th>Descuento</th>
                    <th>Categoria ID</th>
                  </tr>
                </thead>
                <tbody>
                  {promocionesData.map((promocion) => (
                    <tr key={promocion.promocionId}>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="evento"
                          value={promocion.evento}
                          onChange={(e) => handleChange(e, promocion.promocionId)}
                          readOnly={!editing}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="fecha_inicio"
                          value={new Date(promocion.fecha_inicio).toISOString().split("T")[0]}
                          onChange={(e) => handleChange(e, promocion.promocionId)}
                          readOnly={!editing}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="fecha_final"
                          value={new Date(promocion.fecha_final).toISOString().split("T")[0]}
                          onChange={(e) => handleChange(e, promocion.promocionId)}
                          readOnly={!editing}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          name="descuento"
                          value={promocion.descuento}
                          onChange={(e) => handleChange(e, promocion.promocionId)}
                          readOnly={!editing}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          name="categoriaId"
                          value={promocion.categoriaId}
                          onChange={(e) => handleChange(e, promocion.promocionId)}
                          readOnly={!editing}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </section>
      {/* /.content */}
    </div>
  );
};

export default Promociones;
