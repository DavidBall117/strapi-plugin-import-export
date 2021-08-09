import React, { memo } from "react";
import styled from "styled-components";

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 1rem 0;
`;

const Row = (props) => {
  return (
    <RowContainer>
      {props.children}
    </RowContainer>
  );
};

export default memo(Row);
