import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Navbar } from "../../components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "tabulator-tables/dist/css/tabulator.min.css";
import { ReactTabulator } from "react-tabulator";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { useCurrency } from "../../components/CurrencyContext/CurrencyContext";

const Presupuestos = (() => {
  const [userId, setUserId] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    new Date().toJSON().slice(0, 10)//obtine la fecha actual en formato de cadena de texto en formato JSON y utiliza solo los 10 caracteres primeros YYYY-MM-DD (Año-Mes-Día)
  );
  const [presupuesto, setPresupuesto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movimientos, setMovimientos] = useState({});
  const [totales, setTotales] = useState({});
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const tableRef = useRef(null);


  //importo la funcion para obtener el valor que se eligió en el componente de Moneda
  const { selectedCurrency } = useCurrency();
 
  //traigo el valor desde el localstorage
  let valorMoneda = localStorage.getItem(selectedCurrency);
  if(valorMoneda === undefined || valorMoneda === null){
    valorMoneda = 1;
  }
  //console.log(valorMoneda)

  //FUNCION PARA TRAER LOS ASIENTOS DEL USUARIO PARA FILTRADO DE FECHAS

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = `/api/presupuestos/${encodeURIComponent(//se utiliza para escapar cualquier carácter especial que pueda causar problemas en una URL, como espacios o caracteres no permitidos
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
    // console.log(url);
    // console.log(fechaSeleccionada);//la fecha de hoy
    // console.log(fechaDesde);
    // console.log(fechaHasta);
    const { data, error } = await axios.get(url);
    const {
        ingresos,ahorros,inversiones,gastos,prestamos,totalIngresos,totalAhorros,totalInversiones,
        totalGastos,totalPrestamos,totalHistorial,
    } = data;
    
    setPresupuesto({ingresos,ahorros,inversiones,gastos,prestamos, });
    setMovimientos({totalIngresos,totalAhorros,totalInversiones,totalGastos,totalPrestamos,});
    setTotales({totalIngresos,totalAhorros,totalInversiones,totalGastos,totalPrestamos,
        totalHistorial,});
    console.log(data);
  }; 

  //TRAE LA INFORMACION DEL USUARIO
  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("auth_usuario"));
    if (!authUser || !fechaSeleccionada) {
      console.error("user_id y/o fechaSeleccionada no están definidos");
      setLoading(false);
      return;
    }
    setUserId(authUser.id);
    //console.log(authUser.id)
    //console.log(fechaSeleccionada)
    axios
      .get(`/api/presupuestos/${authUser.id}/${fechaSeleccionada}`)
      .then((response) => {
        
        const {
          ingresos,ahorros,inversiones,gastos,prestamos,totalIngresos,totalAhorros,totalInversiones,
          totalGastos,totalPrestamos,totalHistorial,} = response.data;
        setPresupuesto({ingresos,ahorros,inversiones,gastos,prestamos});
        setMovimientos({totalIngresos,totalAhorros,totalInversiones,totalGastos,totalPrestamos,});
        setTotales({totalIngresos,totalAhorros,totalInversiones,totalGastos,totalPrestamos,
          totalHistorial,});
        setLoading(false);
        
      })
      .catch((error) => {
        console.error("Error al obtener el presupuesto:", error);
        setLoading(false);

      });
  }, [valorMoneda]);

  //COLUMNAS PARA PODER HACER LAS TABLAS
  const columns = [
    { title: "Descripción", field: "descripcion",hozAlign: "center",headerHozAlign: "center" },
    { title: "Importe", field: "importe", hozAlign: "center",headerHozAlign: "center", formatter: function(cell, formatterParams, onRendered) {
      const value = cell.getRow().getData().importe;
      const totalMultiplicado = (value * valorMoneda).toFixed(2);
      //console.log(totalMultiplicado);
      return totalMultiplicado;
    } },
    { title: "Entidad", field: "entidad", formatter: function(cell, formatterParams, onRendered) {
        // Obtén el valor de la celda
        const value = cell.getRow().getData().entidad;
        //console.log(value);
        // Verifica si el valor es nulo o vacío
        if (value === null || value === "" || value === undefined) {
            return "-"; // Muestra un guion
        }
        return value; // Muestra el valor original
      }},
  ];


  useEffect(() => {
    if (tableRef.current && Object.entries(presupuesto).length > 0) {
      tableRef.current.table = new Tabulator(tableRef.current, {
        data: presupuesto.prestamos,
        layout: "fitColumns",
        columns: [
          { title: "Categoría", field: "categoria",hozAlign: "center",headerHozAlign: "center", headerFilter: true, visible : false , download : true }, 
          { title: "Descripción", field: "descripcion",hozAlign: "center",headerHozAlign: "center",download : true },
          { title: "Importe", field: "importe",hozAlign: "center",headerHozAlign: "center",download : true , formatter: function(cell, formatterParams, onRendered) {
            const value = cell.getRow().getData().importe;
            const totalMultiplicado = (value * valorMoneda).toFixed(2);
            return totalMultiplicado;
          } },
          { title: "Entidad", field: "entidad",hozAlign: "center",headerHozAlign: "center", download : true, formatter: function(cell, formatterParams, onRendered) {
            // Obtén el valor de la celda
            const value = cell.getRow().getData().entidad;
            //console.log(value);
            // Verifica si el valor es nulo o vacío
            if (value === null || value === "" || value === undefined) {
                return "-"; // Muestra un guion
            }
            return value; // Muestra el valor original
          }
        },
        ],
      });
    }
  }, [presupuesto]);

console.log(presupuesto)

  //FUNCION PARA DESCARGAR EL PDF
  const handleDownloadPDF = () => {
    if (tableRef.current && tableRef.current.table) {
    const tableData = Object.entries(presupuesto).flatMap(([categoria, data]) =>
      data.map((item) => ({
        categoria: categoria,
        descripcion: item.descripcion,
        importe: (item.importe * valorMoneda).toFixed(2),
        entidad: item.entidad,
      }))
    );

    let temp =  tableRef.current.table
    tableRef.current.table.setData(tableData);
    tableRef.current.table.download("pdf", "tabla.pdf", {
      orientation: "portrait",
      title: "Tabla de Presupuestos",
    });

    tableRef.current.table.setData(presupuesto.prestamos);
  }
  };
  

  //FUNCION PARA DESCARGAR EL EXCEL
  const handleDownloadExcel = () => {
    if (tableRef.current && tableRef.current.table) {
         const tableData = Object.entries(presupuesto).flatMap(([categoria, data]) =>
           data.map((item) => ({
             categoria: categoria,
             descripcion: item.descripcion,
             importe: (item.importe * valorMoneda).toFixed(2),
             entidad: item.entidad,
           }))
         );
     tableRef.current.table.setData(tableData);
    tableRef.current.table.download("xlsx", "tabla.xlsx", {
        sheetName: "Presupuestos",
      });
    }
  };
  
  //console.log(presupuesto);

  return (
    <>
      <Navbar />
      <div className="body-presupuestos">
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
              id="fechaDesde"
              name="fechaDesde"
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.currentTarget.value)}
            />
          </div>
          <div className="col-12">
            <label>Fecha Hasta</label>
            <input
              className="form-control"
              id="fechaHasta"
              name="fechaHasta"
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.currentTarget.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary col-12"
            style={{ marginTop: "2.5rem" }}
          >
            Buscar
          </button>
        </form>
        {loading && <p>Cargando datos...</p>}
        <button className="btn btn-primary" onClick={handleDownloadPDF}>PDF</button>
        <button className="btn btn-primary" onClick={handleDownloadExcel}>Excel</button>
        {!loading && presupuesto && (
          <div className="row d-flex gap-2 justify-content-center">
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
                  {data[0] === "ahorros" && (
                    <h2 className="text-danger text-capitalize">{data[0]}</h2>
                  )}
                  
                
                 <div ref={tableRef}>
                    <ReactTabulator
                       /* ref={tableRef} */ 
                      columns={columns}
                      data={data[1]}
                      options={{
                        layout: "fitColumns",
                      }}
                    /> 
                   </div>
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
                      <td style={categoria === "totalHistorial" ? { backgroundColor: '#593196', color: 'white' } : {}}>
                          {categoria.includes('l') ? categoria.split('l').join('l ') : categoria}
                      </td>
                      <td style={categoria === "totalHistorial" ? { backgroundColor: '#593196',color:'white'  } : {}}>
                      {total === "totalHistorial" ? "$ " + (total * valorMoneda).toFixed(2) : "$ " + (total * valorMoneda).toFixed(2) }
                      </td>
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
});

export default Presupuestos;





