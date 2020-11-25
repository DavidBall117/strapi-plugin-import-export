import React, { memo } from "react";

const Row = (props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        margin: "1rem 0",
      }}
    >
      {props.children}
    </div>
  );
};

export default memo(Row);
