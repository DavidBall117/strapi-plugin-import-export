import React, { memo } from "react";
import Navigation from "./Navigation";

const MasterLayout = (props) => {
  return (
    <div style={{ padding: "18px 30px" }}>
      <Navigation />
      <div>{props.children}</div>
    </div>
  );
};

export default memo(MasterLayout);
