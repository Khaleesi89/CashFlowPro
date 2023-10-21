import React, { forwardRef } from "react";
import { ReactTabulator } from "react-tabulator";

const TablaPresupuesto = forwardRef((props, ref) => {
  const { columns, data, options } = props;

  return (
    <div ref={ref}>
      <ReactTabulator columns={columns} data={data} options={options} />
    </div>
  );
});

export default TablaPresupuesto;