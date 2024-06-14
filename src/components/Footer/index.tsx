import {
  CommunityList,
  FooterContainer,
  FooterLogo,
  FooterMain,
  FooterNav,
  FooterSocial,
  FooterSubscribe,
  FooterWrapper,
  FormInput,
  LabelForm,
  SubscribeForm,
  SubscribeWrapper,
} from "./styled";
import footer_logo from "../../assets/Header/logo.svg";
import footer_logo_light from "../../assets/Header/logo_light.svg";
import { Link } from "react-router-dom";
import community_1 from "../../assets/Footer/community_1.svg";
import community_2 from "../../assets/Footer/community_2.svg";
import community_3 from "../../assets/Footer/community_3.svg";
import community_4 from "../../assets/Footer/community_4.svg";
import { ButtonReset } from "../../page/Swap/styled";
import arrow from "../../assets/Footer/arrow.svg";
import arrow_light from "../../assets/Footer/arrow_light.svg";
import email from "../../assets/Footer/email.svg";
import { useContext } from "react";
import { ContextProviderWrapper } from "@kibble-exchange/uikit";

const Footer = () => {
  const { theme } = useContext(ContextProviderWrapper)!;
  return (
    <>
      {/* <FooterSubscribe className={theme}>
        <SubscribeWrapper className={theme}>
          <p>SUBSCRIBE</p>
          <SubscribeForm className={theme}>
            <p>
              Enter your email to receive latest new,
              <br className="sm" /> relevant messaging tips and examples.
            </p>
            <FormInput>
              <LabelForm className={theme}>
                <span>Your email</span>
              </LabelForm>
              <InputCommon
                prefix={<img src={email} alt="icon" />}
                placeHolder="Please input your email"
              />
            </FormInput>
            <ButtonReset className={theme}>
              <p>Subscribe</p>
              <img src={theme === "light" ? arrow_light : arrow} alt="icon" />
            </ButtonReset>
          </SubscribeForm>
        </SubscribeWrapper>
      </FooterSubscribe> */}
      <FooterContainer className={theme}>
        <FooterWrapper>
          <FooterMain>
            <FooterLogo to={"/"}>
              <img
                src={theme === "light" ? footer_logo_light : footer_logo}
                alt="logo"
              />
            </FooterLogo>
            <p>
              We are here to provide all you need for the best trading
              experience and optimal advances on TON blockchain.
            </p>
          </FooterMain>
          <FooterNav className={theme}>
            {navData.map((item, index) => {
              return (
                <li key={index}>
                  <h2>{item.title}</h2>
                  <ul>
                    {item.subLinks.map((link, i) => {
                      return (
                        <li key={i}>
                          <Link to={link.href}>{link.title}</Link>
                        </li>
                      );
                    })}
                    {item.title === "Community" && (
                      <CommunityList>
                        <li>
                          <Link
                            to={"https://twitter.com/KibbleExchange"}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img src={community_1} alt="icon" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"https://t.me/KibbleOfficial"}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img src={community_2} alt="icon" />
                          </Link>
                        </li>
                        <li>
                          <Link to={"#"} target="_blank" rel="noreferrer">
                            <img src={community_3} alt="icon" />
                          </Link>
                        </li>
                        <li>
                          <Link to={"#"} target="_blank" rel="noreferrer">
                            <img src={community_4} alt="icon" />
                          </Link>
                        </li>
                      </CommunityList>
                    )}
                  </ul>
                </li>
              );
            })}
          </FooterNav>
          <FooterSocial className={theme}>
            {socialData.map((item, index) => {
              return (
                <li>
                  <Link
                    to={item.href}
                    key={index}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p>{item.text}</p>
                  </Link>
                </li>
              );
            })}
          </FooterSocial>
        </FooterWrapper>
      </FooterContainer>
    </>
  );
};

const navData = [
  {
    title: "Product",
    subLinks: [
      {
        title: "Swap",
        href: "#",
      },
      {
        title: "Add Liquidity",
        href: "#",
      },
      {
        title: "Farming",
        href: "#",
      },
      {
        title: "Staking",
        href: "#",
      },
    ],
  },
  {
    title: "About",
    subLinks: [
      {
        title: "Team",
        href: "#",
      },
      {
        title: "Contract",
        href: "#",
      },
    ],
  },
];

const socialData = [
  {
    text: "TELEGRAM",
    href: "https://t.me/KibbleOfficial",
  },
  {
    text: "TWITTER",
    href: "https://twitter.com/KibbleExchange",
  },
  {
    text: "MEDIUM",
    href: "https://medium.com/@kibble.exchange",
  },
  {
    text: "DISCORD",
    href: "https://discord.gg/GGgE67XcbJ",
  },
  {
    text: "YOUTUBE",
    href: "https://www.youtube.com/@KibbleExchange",
  },
];

export default Footer;
