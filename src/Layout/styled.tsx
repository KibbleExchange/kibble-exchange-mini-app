import styled from "styled-components";
import search_icon from "../assets/Dashboard/Common/search_icon.svg";

export const ButtonCommon = styled.button<{
  background?: string;
  textColor?: string;
  disabled?: boolean;
  width?: string;
}>`
  background-color: ${({ disabled, background }) =>
    disabled ? "#0488F5" : background || "#007AF5"};
  opacity: ${({ disabled }) => disabled && "50%"};
  font-family: "Syne";
  color: #fff;
  width: ${({ width }) => (width ? width : "100%")};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  cursor: ${({ disabled }) => (disabled ? "no-drop" : "pointer")};
  transition: all 0.15s linear;
  font-size: 18px;
  border-radius: 6px;
  border: 1px solid #3a3a40;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25),
    0px 3px 0px 0px rgba(186, 186, 186, 0.33) inset;
  &:active {
    transform: translateY(4%);
  }
  p {
    color: ${({ color }) => color};
    font-size: 16px;
  }
  a {
    color: #fff;
  }
  &.light {
    border-color: #f7f7f8;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25),
      0px 3px 0px 0px rgba(186, 186, 186, 0.33) inset;
  }
`;
export const ButtonSubmit = styled.div<{ background: any; color: any }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 8px;
  background: ${({ background }) => background};
  cursor: pointer;
  transition: all 0.15s linear;
  p {
    color: ${({ color }) => color};
    font-size: 16px;
  }
  &:hover {
    opacity: 0.7;
  }
`;
export const AutoCompleteContainer = styled.div<{ value: any }>`
  position: relative;
  margin-bottom: 30px;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    width: 22px;
    height: 22px;
    margin-top: -11px;
    right: 10px;
    background: url(${search_icon}) no-repeat center / 100% auto;
    z-index: 5;
    opacity: ${({ value }) => (value ? "0" : "1")};
    visibility: ${({ value }) => (value ? "hidden" : "visible")};
    transition: all 0.25s linear;
  }
  .ant-select {
    width: 100%;
    height: 52px;
  }
  .ant-select-selector {
    border-radius: 8px;
    background: #434343 !important;
    border-color: transparent !important;
    box-shadow: unset !important;
  }
  .ant-select-selection-placeholder {
    color: #989898;
    font-size: 14px;
  }
  .ant-select-selection-search-input {
    color: #fff !important;
  }
  .ant-select-clear {
    width: 16px;
    height: 16px;
    margin-top: -8px;
    img {
      width: 100%;
    }
  }
  .ant-select-dropdown {
    background-color: #434343;
    .ant-select-item-option {
      color: #fff;
      font-size: 16px;
      &:hover {
        background-color: #0dd5b8 !important;
      }
      &.ant-select-item-option-active {
        background-color: #0dd5b8 !important;
      }
    }
  }
`;
export const SwitchCommon = styled.div`
  .ant-switch {
    background-color: #3a3a40 !important;
  }
  .ant-switch-checked {
    background-color: #1677ff !important;
    &:hover {
      background-color: #1677ff !important;
    }
  }
  .ant-switch-inner {
    border: none;
  }
  &.light {
    .ant-switch {
      background: #3a3a40;
    }
  }
`;
export const LoaderCommon = styled.div`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 8px;
  transition: all 0.15s linear;
`;
