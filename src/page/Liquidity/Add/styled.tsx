import styled from "styled-components";
import { SwapContainer } from "../../Swap/styled";

export const SeparateBlock = styled.div`
  border-top: 2px solid #6b6b6b;
  padding-top: 10px;
  margin-top: 10px;
`;
export const CreatePoolHint = styled.div`
  color: #92929e;
  font-size: 16px;
  line-height: 1.6;
  letter-spacing: 0.02em;
  padding: 8px;
  border-radius: 15px;
  margin-bottom: 10px;
  background-color: #28272c;
  padding-left: 40px;
  text-indent: -26px;
  &.light {
    background-color: #eeeef0;
    color: #6e6e7c;
  }
  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
`;
export const LiquidityBg = styled.div`
  position: relative;
  min-height: calc(100vh - 100px);
  background-color: #1b1b1b;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    /* background-color: #7377ff; */
    width: 378px;
    height: 317px;
    mix-blend-mode: plus-lighter;
    filter: blur(173px);
  }
  ${SwapContainer} {
    max-width: 420px;
    padding-bottom: 100px;
  }
`;
export const LiquidityHeader = styled.div`
  margin-bottom: 20px;
  &.light {
    h2 {
      color: #43424a;
    }
    p {
      color: #92929e;
    }
  }
  h2 {
    color: #fff;
    text-align: center;
    font-family: DirtyLine;
    font-size: 32px;
    font-weight: 400;
    text-transform: lowercase;
    margin-bottom: 5px;
  }
  p {
    color: #c2c4ff;
    text-align: center;
    font-size: 16px;
  }
`;
