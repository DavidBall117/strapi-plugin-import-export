import React, { memo } from "react";
import Navigation from "./Navigation";
import styled from "styled-components";

const MasterLayout = (props) => {
  const MasterLayoutContainer = styled.div`
    padding: 18px 30px;
  `;

  return (
    <MasterLayoutContainer>
      <Navigation />
      {props.children}
    </MasterLayoutContainer>
  );
};

export default memo(MasterLayout);
