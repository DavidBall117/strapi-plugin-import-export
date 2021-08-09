import React, { memo } from "react";
import Navigation from "./Navigation";
import styled from "styled-components";

const MasterLayoutContainer = styled.div`
  padding: 18px 30px;
`;

const MasterLayout = (props) => {
  return (
    <MasterLayoutContainer>
      <Navigation />
      {props.children}
    </MasterLayoutContainer>
  );
};

export default memo(MasterLayout);
