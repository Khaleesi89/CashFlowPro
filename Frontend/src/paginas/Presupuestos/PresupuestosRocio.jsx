import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "../../components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import VerPdf from "./VerPdf";
import { PDFViewer } from "@react-pdf/renderer";

function Presupuestos() {
  const [userId, setUserId] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    new Date().toJSON().slice(0, 10)//obtener la fecha actual en formato json y luego recortarla para tener solo la fecha y no la hora
  );
  const [presupuesto, setPresupuesto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movimientos, setMovimientos] = useState({});
  const [totales, setTotales] = useState({});
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [infoPdf, setInfoPdf] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = `/api/presupuestos/${encodeURIComponent(
      userId
    )}/${encodeURIComponent(fechaSeleccionada)}/`;

    if (fechaDesde !== "") {
      url += `?fechaDesde=${encodeURI(fechaDesde)}`;
    }

    if (fechaHasta !== "") {
      if (fechaDesde !== "") {
        url += `&fechaHasta=${encodeURI(fechaHasta)}`;
      } else {
        url += `?fechaHasta=${encodeURI(fechaHasta)}`;
      }
    }

    const { data, error } = await axios.get(url);

    const {
      ingresos,
      ahorro,
      inversiones,
      gastos,
      prestamos,
      totalIngresos,
      totalAhorros,
      totalInversiones,
      totalGastos,
      totalPrestamos,
      totalHistorial,
    } = data;

    setPresupuesto({
      ingresos,
      ahorro,
      inversiones,
      gastos,
      prestamos,
    });
    setMovimientos({
      totalIngresos,
      totalAhorros,
      totalInversiones,
      totalGastos,
      totalPrestamos,
    });
    setTotales({
      totalIngresos,
      totalAhorros,
      totalInversiones,
      totalGastos,
      totalPrestamos,
      totalHistorial,
    });

    console.log(data);
  };

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("auth_usuario"));
    // Verificar si user_id y fechaSeleccionada están definidos
    if (!authUser && !fechaSeleccionada) {
      console.error("user_id y/o fechaSeleccionada no están definidos");
      setLoading(false);
      return;
    }

    setUserId(authUser.id);

    // Hacer una solicitud GET a la API de Laravel para obtener los datos del presupuesto del mes actual
    axios
      .get(`/api/presupuestos/${authUser.id}/${fechaSeleccionada}`)
      .then((response) => {
        console.log(response.data);
        const {
          ingresos,
          ahorro,
          inversiones,
          gastos,
          prestamos,
          totalIngresos,
          totalAhorros,
          totalInversiones,
          totalGastos,
          totalPrestamos,
          totalHistorial,
        } = response.data;
        setPresupuesto({
          ingresos,
          ahorro,
          inversiones,
          gastos,
          prestamos,
        });
        setMovimientos({
          totalIngresos,
          totalAhorros,
          totalInversiones,
          totalGastos,
          totalPrestamos,
        });
        setTotales({
          totalIngresos,
          totalAhorros,
          totalInversiones,
          totalGastos,
          totalPrestamos,
          totalHistorial,
        });
        setLoading(false);
        setInfoPdf(response.data)
      })
      .catch((error) => {
        console.error("Error al obtener el presupuesto:", error);
        setLoading(false);
      });
  }, []);


  //FUNCION PARA GENERAR PDF
  const generarPDF =(infoPdf) => {
    <PDFViewer style={{ width: "100%", height: "500px" }}>
        <VerPdf infoPdf={infoPdf} />
      </PDFViewer>
  }

  return (
    <>
      <Navbar />

      <div className="body-presupuestos ">
        <div className="titulo-seccion">
          <h2>Listado de presupuestos</h2>
        </div>
        <form
          className="row col-6 offset-3 row-cols-lg-auto gap-3 d-flex justify-content-center align-items-center"
          onSubmit={handleSubmit}
        >
          <div className="col-12">
            <label>Fecha Desde</label>
            <input
              className="form-control"
              id="fecha_desde"
              name="fecha_desde"
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.currentTarget.value)}
            />
          </div>
          <div className="col-12">
            <label>Fecha Hasta</label>
            <input
              className="form-control"
              id="fecha_hasta"
              name="fecha_hasta"
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.currentTarget.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-danger col-12"
            style={{ marginTop: "2.5rem" }}
          >
            Buscar
          </button>
        </form>
        {loading && <p>Cargando datos...</p>}
        {!loading && presupuesto && (
          <div className="row d-flex gap-2 justify-content-center">
            <button className="btn btn-primary" onClick={()=>generarPDF(infoPdf)}>PDF</button>
            {Object.entries(presupuesto).map((data, index) => {
              return (
                <div className="col col-6" key={index}>
                  {data[0] === "ingresos" && (
                    <h2 className="text-success text-capitalize">{data[0]}</h2>
                  )}
                  {data[0] === "inversiones" && (
                    <h2 className="text-danger text-capitalize">{data[0]}</h2>
                  )}
                  {data[0] === "gastos" && (
                    <h2 className="text-danger text-capitalize">{data[0]}</h2>
                  )}
                  {data[0] === "prestamos" && (
                    <h2 className="text-danger text-capitalize">{data[0]}</h2>
                  )}
                  {data[0] === "ahorro" && (
                    <h2 className="text-danger text-capitalize">{data[0]}</h2>
                  )}
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Descripción</th>
                        <th>Importe</th>
                        <th>Entidad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data[1].map((item,index) => (
                        <tr key={index}>
                          <td>{item.descripcion ?? item.deudor}</td>
                          <td>{item.importe}</td>
                          <td>
                            {item.entidad === "" || !item.entidad
                              ? "-"
                              : item.entidad}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        )}
        {!loading && totales && (
          <div className="row d-flex gap-2 justify-content-center">
            <div className="titulo-seccion row">
              <h2>Totales</h2>
            </div>
            <div className="col col-6">
              <table className="table">
                <thead>
                  <tr>
                    <th>Categoría</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(totales).map(([categoria, total], index) => (
                    <tr key={index}>
                      <td>{categoria}</td>
                      <td>{total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Presupuestos;