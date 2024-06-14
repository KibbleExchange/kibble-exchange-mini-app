import { Controller } from "react-hook-form";
import {
  ClickMaxAmount,
  DetailButtonHeader,
  RecTag,
  RecText,
  RoutesBottom,
  RoutesHeader,
  RoutesList,
  RoutesName,
  RoutesRecommended,
  RoutesTag,
  SwapChoose,
  SwapChooseDefault,
  SwapContent,
  SwapDetailButton,
  SwapExchangeIcon,
  SwapInput,
  SwapInputTitle,
  SwapInputValue,
  SwapInputWrapper,
  SwapRoutesCheck,
  SwapWrapperButtons,
} from "../../styled";
import { TextResult } from "../../ChooseToken/styled";
import { Checkbox } from "antd";
import {
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import default_token_image from "../../../../assets/Dashboard/Common/default-token-image.png";
import swap_exchange from "../../../../assets/Dashboard/Swap/swap_exchange.png";
import routes_icon from "../../../../assets/Dashboard/Swap/routes_icon.svg";
import routes_icon_light from "../../../../assets/Dashboard/Swap/routes_icon_light.svg";
import routes_icon_check from "../../../../assets/Dashboard/Swap/routes_icon_check.png";
import swap_btn_icon from "../../../../assets/Dashboard/Swap/swap_btn_icon.svg";
import wallet_icon from "../../../../assets/Dashboard/Swap/wallet_icon.svg";
import { useCallback, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import SwapDetails from "../Details";
import Loading from "../../../../components/Loading";
import WebApp from "@twa-dev/sdk";
import { postEvent, on } from "@tma.js/sdk";
import { ButtonCommon, ContextProviderWrapper, InputCommon, convertFixed, toFixedWithoutRounding } from "@kibble-exchange/uikit";


const TON_ADDRESS: any = process.env.REACT_APP_TON_ADDRESS;
const KIBBLE_ADDRESS: any = process.env.REACT_APP_KIBBLE_ADDRESS;
const SwapModal = ({
  fromAssetKey,
  fromAssetBalance,
  assets,
  fromAsset,
  debouncedUpdateFromAmount,
  fromAmount,
  setOpenFromModal,
  control,
  handleSendValue,
  swapFromTo,
  toAssetKey,
  toAssetBalance,
  toAsset,
  debouncedUpdateToAmount,
  toAmount,
  setOpenToModal,
  handleReceiveValue,
  simulateState,
  setOpenConfirmModal,
  isEnoughAssetBalance,
  isEnoughTonBalance,
  realPrice,
  slippageTolerance,
  minReceived,
  setShowDetail,
  showDetail,
  handleResetValueFrom,
  handleResetValueTo,
  checkingToken,
}: any) => {
  const address = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  const [expandRoutes, setExpandRoutes] = useState(true);
  const handleCheckMultiRoutes = (e: any) => {
    setExpandRoutes(e.target.checked);
  };
  const wallet = useTonWallet();
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const { theme } = useContext(ContextProviderWrapper)!;

  const mainBtnClicked = useCallback(() => {
    if (wallet && address) {
      setOpenConfirmModal(true);
      // tonConnectUI.disconnect();
    } else {
      tonConnectUI.openModal();
    }
  }, [
    address,
    isEnoughAssetBalance(),
    isEnoughTonBalance(),
    simulateState,
    fromAmount,
    toAmount,
    slippageTolerance,
  ]);

  const onSettingMainButton = () => {
    let textBtn = "Connect Wallet";
    if (wallet && address) {
      if ("error" in simulateState) {
        textBtn = "Insufficient Pool Liquidity";
      } else if (isEnoughAssetBalance() && isEnoughTonBalance()) {
        if (simulateState.priceImpact > 20) {
          textBtn = "Price Impact Is Too High";
        } else if (fromAmount === 0 && toAmount === 0) {
          textBtn = "Enter Amount";
        } else {
          textBtn = "Swap";
        }
      } else {
        textBtn = "Insufficient Balance";
      }
    } else {
      textBtn = "Connect Wallet";
    }
    postEvent("web_app_setup_main_button", {
      color: "#007AF5",
      text: textBtn,
      is_active:
        (textBtn === "Swap" && fromAmount !== 0 && toAmount !== 0) ||
        (textBtn === "Connect Wallet" && !address),
      is_visible: true,
    });
  };

  useEffect(() => {
    onSettingMainButton();
    WebApp.onEvent("mainButtonClicked", mainBtnClicked);
    return () => {
      WebApp.offEvent("mainButtonClicked", mainBtnClicked);
      postEvent("web_app_setup_main_button", {
        color: "#007AF5",
        text: "",
        is_active: false,
        is_visible: false,
      });
    };
  }, [
    address,
    isEnoughAssetBalance(),
    isEnoughTonBalance(),
    simulateState,
    fromAmount,
    toAmount,
    slippageTolerance,
  ]);

  return (
    <>
      <SwapContent>
        <SwapInput className={`exchange ${theme}`}>
          <SwapInputTitle className={theme}>
            <p>You send:</p>
            <ClickMaxAmount>
              {!isMobile && "Balance:"}{" "}
              {convertFixed(Number(fromAssetBalance.toString()))} |{" "}
              <span
                onClick={() => {
                  const result: any =
                    fromAssetKey ===
                    TON_ADDRESS
                      ? toFixedWithoutRounding(
                          Number(fromAssetBalance.toString()) - 0.31,
                          Number(assets && fromAsset?.decimals)
                        )
                      : toFixedWithoutRounding(
                          Number(fromAssetBalance.toString()),
                          Number(assets && fromAsset?.decimals)
                        );
                  debouncedUpdateFromAmount(parseFloat(result.toString()));
                }}
              >
                MAX
              </span>
            </ClickMaxAmount>
          </SwapInputTitle>
          <SwapInputWrapper
            className={theme}
            style={{
              cursor: address ? "pointer" : "not-allowed",
            }}
            active={fromAmount > 0}
          >
            <SwapChoose
              className={theme}
              onClick={() => {
                setOpenFromModal(true);
              }}
            >
              <SwapChooseDefault className={theme}>
                {fromAsset ? (
                  <>
                    <img
                      src={fromAsset?.image_url}
                      alt="icon"
                      onError={(e) =>
                        (e.currentTarget.src = default_token_image)
                      }
                    />
                    <p>{fromAsset?.symbol}</p>
                  </>
                ) : (
                  <TextResult>Loading...</TextResult>
                )}
              </SwapChooseDefault>
            </SwapChoose>
            {/* Input From */}
            <Controller
              name="fromAmount"
              control={control}
              render={({ field }: any) => (
                <SwapInputValue>
                  <InputCommon
                    {...field}
                    disabled={address && checkingToken ? false : true}
                    onChange={handleSendValue}
                    onFocus={handleResetValueFrom}
                    placeHolder={"0"}
                    mode="decimal"
                  />
                  <RoutesBottom>
                    <p>
                      ≈
                      {true
                        ? (
                            Number(fromAmount) *
                              Number(assets[fromAssetKey].dex_price_usd) || 0
                          ).toFixed(3)
                        : "0"}{" "}
                      USD
                    </p>
                  </RoutesBottom>
                </SwapInputValue>
              )}
            />
            {/* ---------- */}
          </SwapInputWrapper>
        </SwapInput>
        <SwapExchangeIcon
          className={theme}
          onClick={async () => {
            swapFromTo();
          }}
        >
          <img src={swap_exchange} alt="exchange" />
        </SwapExchangeIcon>
        <SwapInput className={`exchange ${theme}`}>
          <SwapInputTitle className={theme}>
            <p>You receive:</p>
            <ClickMaxAmount>
              {!isMobile && "Balance:"}{" "}
              {convertFixed(Number(toAssetBalance.toString()))} |{" "}
              <span
                onClick={() => {
                  const result: any =
                    toAssetKey ===
                    TON_ADDRESS
                      ? toFixedWithoutRounding(
                          Number(toAssetBalance.toString()) - 0.31,
                          Number(assets && toAsset?.decimals)
                        )
                      : toFixedWithoutRounding(
                          Number(toAssetBalance.toString()),
                          Number(assets && toAsset?.decimals)
                        );
                  debouncedUpdateToAmount(parseFloat(result.toString()));
                }}
              >
                MAX
              </span>
            </ClickMaxAmount>
          </SwapInputTitle>
          <SwapInputWrapper
            className={theme}
            style={{
              cursor: address ? "pointer" : "not-allowed",
            }}
            active={toAmount > 0}
          >
            <SwapChoose
              className={theme}
              onClick={() => {
                setOpenToModal(true);
              }}
            >
              <SwapChooseDefault className={theme}>
                {fromAsset ? (
                  <>
                    <img
                      src={toAsset?.image_url}
                      alt="icon"
                      onError={(e) =>
                        (e.currentTarget.src = default_token_image)
                      }
                    />
                    <p>{toAsset?.symbol}</p>
                  </>
                ) : (
                  <TextResult>Loading...</TextResult>
                )}
              </SwapChooseDefault>
            </SwapChoose>
            {/* Input to */}
            <Controller
              name="toAmount"
              control={control}
              render={({ field }: any) => (
                <SwapInputValue>
                  <InputCommon
                    {...field}
                    disabled={address && checkingToken ? false : true}
                    onChange={handleReceiveValue}
                    onFocus={handleResetValueTo}
                    placeHolder={"0"}
                    mode="decimal"
                  />
                  <RoutesBottom>
                    <p>
                      ≈
                      {true
                        ? (
                            Number(toAmount) *
                              Number(assets[toAssetKey].dex_price_usd) || 0
                          ).toFixed(3)
                        : "0"}{" "}
                      USD
                    </p>
                  </RoutesBottom>
                </SwapInputValue>
              )}
            />
            {/* ------- */}
          </SwapInputWrapper>
        </SwapInput>
        <SwapRoutesCheck className={theme}>
          {expandRoutes && (
            <RoutesRecommended>
              <RecTag className={theme}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M8 17.5C8 19.1569 6.65685 20.5 5 20.5C3.34315 20.5 2 19.1569 2 17.5C2 15.8431 3.34315 14.5 5 14.5C6.65685 14.5 8 15.8431 8 17.5ZM8 17.5H10C11.1046 17.5 12 16.6046 12 15.5V9.5C12 8.39543 12.8954 7.5 14 7.5H20M18 4.5L20.8427 7.14645C21.0524 7.34171 21.0524 7.65829 20.8427 7.85355L18 10.5"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </RecTag>
              <RoutesName>
                <h1>Route</h1>
                <RecText className={theme}>
                  <p>{assets && assets[fromAssetKey].symbol}</p>
                  <img
                    src={theme === "light" ? routes_icon_light : routes_icon}
                    alt="icon"
                  />
                  <p>{assets && assets[toAssetKey].symbol}</p>
                </RecText>
              </RoutesName>
            </RoutesRecommended>
          )}
        </SwapRoutesCheck>
        <RoutesList
          className={theme}
          style={{
            height: !expandRoutes ? "155px" : "0",
            marginBottom: !expandRoutes ? "10px" : "0",
          }}
        >
          {routesSelected.map((item, index) => {
            return (
              <li
                key={index}
                style={{
                  pointerEvents: item.id === 2 ? "none" : "auto",
                  opacity: item.id === 2 ? ".5" : "1",
                }}
              >
                <RoutesHeader className={theme}>
                  <div>
                    <figure>
                      <img src={item.icon} alt="icon" />
                    </figure>
                    <p>{item.name}</p>
                  </div>
                  <p>{item.id === 1 ? toAmount : "0.00"}</p>
                </RoutesHeader>
                <RoutesBottom>
                  {item.tag && (
                    <RoutesTag className={theme}>Recommend</RoutesTag>
                  )}
                  <p>
                    ≈
                    {item.id === 1
                      ? (
                          Number(toAmount) *
                            Number(assets[toAssetKey].dex_price_usd) || 0
                        ).toFixed(3)
                      : "0"}{" "}
                    USD
                  </p>
                </RoutesBottom>
              </li>
            );
          })}
        </RoutesList>
        <SwapDetailButton className={showDetail ? `active ${theme}` : theme}>
          <DetailButtonHeader
            className={theme}
            style={{
              marginBottom: showDetail ? "10px" : "0",
            }}
            onClick={() => {
              setShowDetail(!showDetail);
            }}
          >
            <p>Show details</p>
            <p>{showDetail ? "Show less" : "Show more"}</p>
          </DetailButtonHeader>
          <SwapDetails
            showDetail={showDetail}
            realPrice={realPrice}
            fromAsset={fromAsset}
            toAsset={toAsset}
            slippageTolerance={slippageTolerance}
            minReceived={minReceived}
            simulateState={simulateState}
          />
        </SwapDetailButton>
      </SwapContent>
    </>
  );
};

const routesSelected = [
  {
    id: 1,
    icon: routes_icon_check,
    name: "Stonfi",
    tag: true,
    price: "12,322.1108178",
    usd: "~1232,3192 USD",
  },
  {
    id: 2,
    icon: routes_icon_check,
    name: "DeDust",
    tag: false,
    price: "0.00",
    usd: "-- USD",
  },
];

export default SwapModal;
