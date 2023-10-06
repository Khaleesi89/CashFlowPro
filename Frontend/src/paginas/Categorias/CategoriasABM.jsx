import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import './CategoriasABM.css';

export const CategoriasABM = () => {

  const [categorias, setCategorias] = useState([]);
  const tableRef = useRef(null);

  const fetchData = useCallback(async () => {
    let usuario = localStorage.getItem('auth_usuario');
    let usuarioObjeto = JSON.parse(usuario);
    let id = usuarioObjeto.id;
    console.log(id);
    const response = await fetch("http://localhost:8000/api/categorias/"+id);
    const data = await response.json();
    setCategorias(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (tableRef.current && categorias.length > 0) {
      const table = new Tabulator(tableRef.current, {
        data: categorias,
        height: "90%",
       /*  layout: "fitColumns",
        autoResize: true, */
        groupBy: "tipo_categoria",
        placeholder: "No existen categorías para este usuario.",
        columns: [
          { title: "Descripción", field: "descripcion", width: 400,headerHozAlign: "center", hozAlign: "center",widthGrow: 1, minWidth: 250, responsive: 1 },
          { title: "Tipo de categoría", field: "tipo_categoria",headerHozAlign: "center", width: 400, hozAlign: "center",widthGrow: 1, minWidth: 250, responsive: 1 },
          { title: "Acción", field: "",headerHozAlign: "center", width: 400, hozAlign: "center", widthGrow: 1, minWidth: 250, responsive: 1,formatter: function (cell, formatterParams) {
            let id_categoria = cell.getRow().getData().id;
            let descripcion_categoria = cell.getRow().getData().descripcion;
            let tipo_categoria = cell.getRow().getData().tipo_categoria; 
            let boton = `<a href="/categorias-editar/${id_categoria}/${descripcion_categoria}/${tipo_categoria}" class="botonedit btn btn-primary">Editar</a>`;
            return boton;
        },},
        ],
      });
    }
  }, [categorias]);

  const handleDownloadCSV = () => {
    console.log("Downloading csv");
    if (tableRef.current && tableRef.current.table) {
      tableRef.current.table.download("csv", "data.csv");
    }
  };

  const handleDownloadXLSX = useCallback(() => {
    console.log("Downloading xlsx");
    if (tableRef.current && tableRef.current.table) {
      tableRef.current.table.download("xlsx", "data.xlsx", { sheetName: "My Data" });
    }
  }, []);

  const handleDownloadPDF = useCallback(() => {
    console.log("Downloading PDF");
    if (tableRef.current && tableRef.current.table) {
      tableRef.current.table.download("pdf", "data.pdf", {
        orientation: "portrait",
        title: "Example Report",
      });
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="categorias m-5">
        <div className="titulo-seccion">
          <h2>Listado de categorías</h2>
        </div>
        <a href="/categorias-crear" className='cateBoton'> <button className='btn-dark'>Alta Categoría</button></a>
        <div className="generar">
          <button id="download-csv" onClick={handleDownloadCSV}>CSV</button>
          <button id="download-xlsx" onClick={handleDownloadXLSX}>XLSX</button>
          <button id="download-pdf" onClick={handleDownloadPDF}>PDF</button>
        </div>
        <div ref={tableRef} id="example-table"></div>
      </div>
      <Footer />
    </>
  )
}

export default CategoriasABM;