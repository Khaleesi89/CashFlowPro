import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "2px",
  },
  heading: {
    color: "red",
    fontSize: 16,
    textTransform: "capitalize",
  },
  table: {
    width: "100%",
    marginBottom: 10,
  },
  tableHeader: {
    backgroundColor: "#f5f5f5",
    padding: 5,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    padding: 5,
  },
});

const VerPdf = ({ infoPdf }) => {
  console.log(infoPdf);

  return (
    <Document>
      <Page>
        <View style={styles.container}>
          <View style={styles.table}>
            <Text style={styles.heading}>Ingresos</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.tableCell}>Descripción</Text>
              <Text style={styles.tableCell}>Importe</Text>
            </View>
            {infoPdf.ingresos.map((item) => (
              <View style={styles.tableRow} key={item.id}>
                <Text style={styles.tableCell}>{item.descripcion}</Text>
                <Text style={styles.tableCell}>{item.importe}</Text>
              </View>
            ))}
          </View>

          <View style={styles.table}>
            <Text style={styles.heading}>Ahorros</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.tableCell}>Descripción</Text>
              <Text style={styles.tableCell}>Importe</Text>
            </View>
            {infoPdf.ahorro.map((item) => (
              <View style={styles.tableRow} key={item.id}>
                <Text style={styles.tableCell}>{item.descripcion}</Text>
                <Text style={styles.tableCell}>{item.importe}</Text>
              </View>
            ))}
          </View>

          <View style={styles.table}>
            <Text style={styles.heading}>Inversiones</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.tableCell}>Descripción</Text>
              <Text style={styles.tableCell}>Importe</Text>
              <Text style={styles.tableCell}>Entidad</Text>
            </View>
            {infoPdf.inversiones.map((item) => (
              <View style={styles.tableRow} key={item.id}>
                <Text style={styles.tableCell}>{item.descripcion}</Text>
                <Text style={styles.tableCell}>{item.importe}</Text>
                <Text style={styles.tableCell}>{item.entidad}</Text>
              </View>
            ))}
          </View>

          <View style={styles.table}>
            <Text style={styles.heading}>Gastos</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.tableCell}>Descripción</Text>
              <Text style={styles.tableCell}>Importe</Text>
              <Text style={styles.tableCell}>Fecha de Vencimiento</Text>
            </View>
            {infoPdf.gastos.map((item) => (
              <View style={styles.tableRow} key={item.id}>
                <Text style={styles.tableCell}>{item.descripcion}</Text>
                <Text style={styles.tableCell}>{item.importe}</Text>
                <Text style={styles.tableCell}>{item.fecha_vencimiento}</Text>
              </View>
            ))}
          </View>

          <View style={styles.table}>
            <Text style={styles.heading}>Préstamos</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.tableCell}>Deudor</Text>
              <Text style={styles.tableCell}>Importe</Text>
            </View>
            {infoPdf.prestamos.map((item) => (
              <View style={styles.tableRow} key={item.id}>
                <Text style={styles.tableCell}>{item.deudor}</Text>
                <Text style={styles.tableCell}>{item.importe}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default VerPdf;