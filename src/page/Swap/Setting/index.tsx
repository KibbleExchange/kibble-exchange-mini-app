import { Switch } from "antd";
import {
  SettingBody,
  SettingSwapContainer,
  SettingSwapHeader,
  SettingSwapLimit,
  SettingSwapList,
  SettingSwapWrapper,
} from "./styled";
import { ButtonCommon, SwitchCommon } from "../../../Layout/styled";
import percent from "../../../assets/Dashboard/Common/percent.svg";
import { useCallback, useContext, useEffect } from "react";
import { ContextProviderWrapper,InputCommon } from "@kibble-exchange/uikit";
import { ConfirmSwapButtons } from "../Confirm/styled";
import { postEvent } from "@tma.js/sdk";
import WebApp from "@twa-dev/sdk";

const SettingSwap = ({
  slippageTolerance,
  setSlippageTolerance,
  setActiveFilter,
  setSwitchState,
  switchState,
  setActiveTab,
}: any) => {
  const { theme, isMobile } = useContext(ContextProviderWrapper)!;
  const optionData = [0.1, 0.5, 1];
  const handleSwitch = (value: any) => {
    setSwitchState(value);
    if (switchState) {
      setSlippageTolerance(optionData[0]);
    }
  };
  const handleChangeImpact = (e: any) => {
    setSlippageTolerance(e.target.value);
  };

  const mainBtnClicked = useCallback(() => {
    setActiveTab(1);
    setActiveFilter(1);
  }, []);

  useEffect(() => {
    let textBtn = "Save Changes";
    postEvent("web_app_setup_main_button", {
      color: "#007AF5",
      text: textBtn,
      is_active: true,
      is_visible: true,
    });
    WebApp.onEvent("mainButtonClicked", mainBtnClicked);
    return () => {
      WebApp.offEvent("mainButtonClicked", mainBtnClicked);
    };
  }, []);

  return (
    <SettingSwapContainer>
      <SettingSwapWrapper className={theme}>
        <SettingSwapHeader className={theme}>
          <p>Slippage Tolerance</p>
        </SettingSwapHeader>
        <SettingBody>
          <InputCommon
            value={slippageTolerance}
            defaultValue={slippageTolerance}
            disabled={switchState ? false : true}
            suffix={<img src={percent} alt="percent" />}
            onChange={handleChangeImpact}
          />
          <SettingSwapList className={theme}>
            {optionData.map((item, index) => {
              return (
                <li
                  className={slippageTolerance === item ? "active" : ""}
                  onClick={() => {
                    setSlippageTolerance(item);
                  }}
                  key={index}
                >
                  {item}%
                </li>
              );
            })}
          </SettingSwapList>
        </SettingBody>
        <SettingSwapLimit className={theme}>
          <p>Custom price impact limit</p>
          <SwitchCommon className={theme}>
            <Switch checked={switchState} onChange={handleSwitch} />
          </SwitchCommon>
        </SettingSwapLimit>
        <p>
          By enabling this feature, you’ll see the candlestick chart instead of
          a line chart
        </p>
      </SettingSwapWrapper>
    </SettingSwapContainer>
  );
};

export default SettingSwap;
