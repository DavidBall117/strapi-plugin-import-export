import React, { memo } from "react";
import { LoadingIndicator } from "strapi-helper-plugin";
import styled from "styled-components";

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000099;
  z-index: 9999;
`;

const LoadingOverlay = () => {
  return (
    <LoadingContainer>
      <LoadingIndicator />
    </LoadingContainer>
  );
};

export default memo(LoadingOverlay);
