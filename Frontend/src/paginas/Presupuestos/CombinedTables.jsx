import React, { useRef } from "react";
import { ReactTabulator } from "react-tabulator";
import "tabulator-tables/dist/css/tabulator.min.css";

const CombinedTables = ({ presupuesto }) => {

  console.log(presupuesto);
  /* const combinedData = [
    ...presupuesto.ingresos,
    ...presupuesto.ahorros,
    ...presupuesto.gastos,
    ...presupuesto.prestamos,
    ...presupuesto.inversiones,
  ]; */

  // COLUMNAS PARA LAS TABLAS
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

  const options = {
    layout: "fitColumns",
  };

  const tableRef = useRef(null);

  const handleDownloadPDF = () => {
    if (tableRef && tableRef.current) {
      const tabulatorTable = tableRef.current.table;
      const { document } = window;

      if (tabulatorTable) {
        const pdfFileName = "movimientos.pdf";
        const pdfOptions = {
          orientation: "portrait",
          title: "Movimientos",
        };
        tabulatorTable.download("pdf", pdfFileName, pdfOptions);

        // Simular clic para descargar el archivo PDF
        const pdfLink = document.createElement("a");
        pdfLink.href = tabulatorTable.downloadToURL("pdf", pdfFileName, pdfOptions);
        pdfLink.setAttribute("download", pdfFileName);
        document.body.appendChild(pdfLink);
        pdfLink.click();
        document.body.removeChild(pdfLink);
      }
    }
  };

  const handleDownloadExcel = () => {
    if (tableRef && tableRef.current) {
      const tabulatorTable = tableRef.current.table;
      const { document } = window;

      if (tabulatorTable) {
        const excelFileName = "movimientos.xlsx";
        const excelOptions = {
          sheetName: "Movimientos",
        };
        tabulatorTable.download("xlsx", excelFileName, excelOptions);

        // Simular clic para descargar el archivo Excel
        const excelLink = document.createElement("a");
        excelLink.href = tabulatorTable.downloadToURL("xlsx", excelFileName, excelOptions);
        excelLink.setAttribute("download", excelFileName);
        document.body.appendChild(excelLink);
        excelLink.click();
        document.body.removeChild(excelLink);
      }
    }
  };

  return (
    <div>
      <ReactTabulator
        ref={tableRef}
        columns={columns}
        data={presupuesto}
        options={options}
      />
      {/* Botones de descarga */}
      <button className="btn btn-primary" onClick={handleDownloadPDF}>PDF</button>
      <button className="btn btn-primary" onClick={handleDownloadExcel}>Excel</button>
    </div>
  );
};

export default CombinedTables;










/* import React from "react";
import { ReactTabulator } from "react-tabulator";
import "tabulator-tables/dist/css/tabulator.min.css";



const CombinedTables = ({ presupuesto }) => {
  // Combinar todos los datos en una sola estructura
  const combinedData = [
    ...presupuesto.ingresos,
    ...presupuesto.ahorros,
    ...presupuesto.gastos,
    ...presupuesto.prestamos,
    ...presupuesto.inversiones,
    // ... otros conjuntos de datos
  ];

  let valorMoneda = localStorage.getItem(selectedCurrency);
  if(valorMoneda === undefined || valorMoneda === null){
    valorMoneda = 1;
  }
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

  const options = {
    layout: "fitColumns",
  };

  const handleDownloadPDF = () => {
    // Descargar en PDF
    table.download("pdf", "movimientos.pdf", {
      orientation: "portrait",
      title: "Movimientos",
    });
  };

  const handleDownloadExcel = () => {
    // Descargar en Excel
    table.download("xlsx", "movimientos.xlsx", {
      sheetName: "Movimientos",
    });
  };

  let table;
  return (
    <div>
      <ReactTabulator
        columns={columns}
        data={combinedData}
        options={options}
        ref={(ref) => (table = ref)}
      />
      
        <button className="btn btn-primary" onClick={handleDownloadPDF}>PDF</button>
        <button className="btn btn-primary" onClick={handleDownloadExcel}>Excel</button>
    </div>
  );
};

export default CombinedTables;
 */