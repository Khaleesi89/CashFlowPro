import React, { forwardRef, useImperativeHandle } from "react";
import { ReactTabulator } from "react-tabulator";

const Referencia = forwardRef((props, ref) => {
  const tabulatorRef = React.createRef();

  // Utiliza useImperativeHandle para exponer métodos específicos o la instancia de la tabla
  useImperativeHandle(ref, () => ({
    getTableInstance: () => tabulatorRef.current.table,
  }));

  return <ReactTabulator {...props} ref={tabulatorRef} />;
});

export default Referencia;
