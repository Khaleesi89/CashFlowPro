import React, { forwardRef } from "react";
import { ReactTabulator } from "react-tabulator";

const TablaPresupuesto = forwardRef((props, ref) => {
  const { columns, data, options } = props;

  return (
    
      <ReactTabulator ref={ref} columns={columns} data={data} options={options} />
    
  );
});

export default TablaPresupuesto;