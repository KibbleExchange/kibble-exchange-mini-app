import styled from "styled-components";
// Image
import icnInfo from '../../../../assets/liquidity/InfoCircle.svg'

export const BlockInfo = styled.div`
  border-radius: 8px;
  background: #3A3A40;
  padding: 8px;
  margin-bottom: 24px;
  p {
    color: #92929E;
    font-size: 12px;
    &:before {
      display: inline-block;
      content: '';
      background: url(${icnInfo}) center / 13px auto no-repeat;
      margin-right: 5px;
      width: 13px;
      height: 13px;
      position: relative;
      top: 3px;
    }
  }
`