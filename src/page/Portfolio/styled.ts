import { styled } from "styled-components";
import { WalletParent } from "../../components/Header/Wallet/styled";

export const PortfolioStyle = styled.div`
  position: relative;
  height: calc(100vh - 100px);
  background-color: #1b1b1b;
  padding: 0 20px;
  ${WalletParent} {
    height: calc(100vh - 300px);
  }
  p {
    color: var(--Icon, #fff);
    text-align: center;
    font-family: Syne;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: 19.2px; /* 112.941% */
  }
`;

export const PortfolioTotalBalance = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  h2 {
    color: var(--Icon, #fff);
    font-family: Syne;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 129.412% */
    letter-spacing: -0.4px;
  }
`;

export const PortfolioItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  padding-bottom: 8px;
  border-radius: 10.12px;
  background: #28272c;
  h2 {
    color: var(--navigation-not-active, #92929e);
    text-align: right;
    font-family: DMMono-500;
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: 20px; /* 142.857% */
    letter-spacing: -0.23px;
  }
  h1 {
    color: var(--Icon, #fff);
    font-family: Syne;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 129.412% */
    letter-spacing: -0.4px;
  }
`;

export const PortfolioItemLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  .img-token {
    max-width: 40px;
    img {
      width: 100%;
      border-radius: 8px;
    }
  }
`;

export const PortfolioItemRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;
