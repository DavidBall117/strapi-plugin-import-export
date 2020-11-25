import React, { memo } from "react";
import { LoadingIndicator } from "strapi-helper-plugin";

const LoadingOverlay = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000099",
        zIndex: 9999,
      }}
    >
      <LoadingIndicator />
    </div>
  );
};

export default memo(LoadingOverlay);
