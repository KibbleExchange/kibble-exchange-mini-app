import styled from "styled-components";

export const DashboardContainer = styled.div`
  position: relative;
  min-height: calc(100vh - 250px);
  padding-top: 50px;
  background-color: #1b1b1b;
  // z-index: 201;
  @media screen and (max-width: 1023px) {
    min-height: calc(100vh - 500px);
    padding-top: 25px;
  }
`;
