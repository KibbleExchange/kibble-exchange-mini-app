import { createGlobalStyle } from "styled-components";
import bgDetaileBlack from "./assets/Staking/BgDetail.svg";
import bgDetaileW from "./assets/Staking/BgDetailW.svg";

const GlobalStyle = createGlobalStyle<{ theme?: any }>`
:root {
    --Stake-Title:${({ theme }) => (theme !== "light" ? "#fff" : "#43424A")};
    --Stake-Bg:${({ theme }) => (theme !== "light" ? "#1C1C1E" : "#fff")};
    --Stake-Bg1:${({ theme }) => (theme !== "light" ? "#1C1C1E" : "#F7F8FF")};
    --tabsBtn:${({ theme }) => (theme !== "light" ? "#43424A" : "#007AF5")};
    --tabsBar:${({ theme }) => (theme !== "light" ? "#141518" : "#F3F4F8")};
    --tabsBar2:${({ theme }) => (theme !== "light" ? "#141518" : "#fff")};
    --tabsTitle:${({ theme }) => (theme !== "light" ? "#D9D9DE" : "#92929E")};
    --tabsTitleActive:${({ theme }) =>
      theme !== "light" ? "#D9D9DE" : "#fff"};
    --Stake-border:${({ theme }) =>
      theme !== "light" ? "#43424A" : "#B8B8C1"};
    --Stake-Box:${({ theme }) => (theme !== "light" ? "#3a3a40" : "#F3F4F8")};
    --Stake-Box-affter:${({ theme }) =>
      theme !== "light" ? "#3a3a40" : "#3A3A40"};
    --Stake-Text:${({ theme }) => (theme !== "light" ? "#fff" : "#43424A")};
    --Stake-Text-countDown:${({ theme }) =>
      theme !== "light" ? "#eeeef0" : "#4D4D57"};
    --Stake-Text-Day:${({ theme }) =>
      theme !== "light" ? "#f7f7f8" : "#43424A"};
    --Stake-Text-Value:${({ theme }) =>
      theme !== "light" ? "#f7f7f8" : "#141518"};
    --Stake-Bg-countDown:${({ theme }) =>
      theme !== "light" ? "#43424a" : "#B8B8C1"};
    --Stake-Text-Emtry:${({ theme }) =>
      theme !== "light" ? "#EEEEF0" : "#43424A"};
    --Stake-Btn-Boder:${({ theme }) =>
      theme !== "light" ? "#f7f7f8" : "#3A3A40"};
    --Stake-Btn-Text-detail:${({ theme }) =>
      theme !== "light" ? "#fff" : "#3A3A40"};
    --StakeText-des:${({ theme }) =>
      theme !== "light" ? "#f7f7f8" : "#43424A"};
    --Stake-duration-Bg:${({ theme }) =>
      theme !== "light" ? "#141518" : "#F3F4F8"};
    --Stake-duration-Bg-active:${({ theme }) =>
      theme !== "light" ? "#28272C" : "#F3F4F8"};
    --Stake-rewar-Bg:${({ theme }) =>
      theme !== "light" ? "#00341D" : "#EEFFF6"};
    --Stake-rewar-Text:${({ theme }) =>
      theme !== "light" ? "#0FF586" : "#05904E"};
    --Stake-noti:${({ theme }) => (theme !== "light" ? "#52565b" : "#fff")};
    --Stake-noti-Bg:${({ theme }) => (theme !== "light" ? "#52565b" : "#fff")};
    --Stake-Amount-Bg:${({ theme }) =>
      theme !== "light" ? "#28272c" : "#F0F2F8"};
    --Launchpad-Panner-Bg:${({ theme }) =>
      theme !== "light" ? "#090715" : "#ffffff"};
    --Launchpad-Panner-Bg-radian:${({ theme }) =>
      theme !== "light" ? "#5452c6" : "#2697FF"};
    --tabsBar2:${({ theme }) => (theme !== "light" ? "#141518" : "#fff")};
    --Ido-Cart-Boder: ${({ theme }) =>
      theme !== "light" ? "#4d4d57" : "#92929E"};
    --Ido-Cart-Boder-hover: ${({ theme }) =>
      theme !== "light" ? "#f7f7f8" : "#000"};
    --Sale-live-Bg: ${({ theme }) =>
      theme !== "light" ? "#1F4C40" : "#D0F6E3"};
    --Sale-live-text: ${({ theme }) =>
      theme !== "light" ? "#83D3B0" : "#306959"};
    --LP-fee-text: ${({ theme }) => (theme !== "light" ? "#dddedf" : "#000")};
    --LP-fee-Bg: ${({ theme }) => (theme !== "light" ? "#52565B" : "#EEEEF0")};
    --Fair-Box: ${({ theme }) => (theme !== "light" ? "#000" : "#F3F4F8")};
    --Progress-Text: ${({ theme }) => (theme !== "light" ? "#fff" : "#141518")};
    --Progress-Thumnail: ${({ theme }) =>
      theme !== "light"
        ? `linear-gradient(
      90deg,
      rgba(105, 105, 105, 0.25) 0%,
      #48ceff 100%
    )`
        : "#007AF5"};
    --Progress-Blur: ${({ theme }) =>
      theme !== "light" ? `#007af5` : "rgba(255, 255, 255, 0)"};
    --Progress-Price: ${({ theme }) => (theme !== "light" ? "#141518" : "#EEFFF6")};
    --Progress-Compare: ${({ theme }) => (theme !== "light" ? "#92929E" : "#43424A")};
    --Btn-LP: ${({ theme }) => (theme !== "light" ? "#3A3A40" : "#EEEEF0")};
    --Gift-Bg: ${({theme }) => (theme !== "light" ? "#141518":"#F3F4F8")};
    --Gift-Border: ${({theme }) => (theme !== "light" ? "#43424A":"#92929E")};
    --Search-Input-Bg: ${({theme }) => (theme !== "light" ? `#28272c`:`linear-gradient(180deg, #F7F7F8 0%, #ECECF7 77.43%)`)};
    --Search-Input-Boder: ${({theme }) => (theme !== "light" ? `#28272c`:`#F7F7F8`)};
    --Barkbucks-Lp-Bg: ${({theme }) => (theme !== "light" ? `#121212`:`#fff`)};
    --Stake-Border-Style2:${({ theme }) =>
      theme !== "light" ? "#4d4d57" : "#B8B8C1"};
    --Input-Amout-style2 : ${({ theme }) => (theme !== "light" ? `#28272c`:`#fff`)};
    --Total-Raise : ${({ theme }) => (theme !== "light" ? `#43424a`:`#f3f4f8`)};
    --Total-Raise-Text : ${({ theme }) => (theme !== "light" ? `#d9d9de`:`#1e1e1e`)};
    --detail-Liquidity : ${({ theme }) => (theme !== "light" ? `#fff` : `#92929e`)}
  }
`;

export default GlobalStyle;
