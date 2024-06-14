import {
  BlockCommingLeft,
  BlockCommingRight,
  BlockCommingSoon,
  BlockCommingTextBig,
  BlockCommingTextSmall,
  FarmContainer,
  RightTitle,
  RightTitleText,
} from "./styled";
import { useContext, useEffect, useState } from "react";
import MyStake from "./MyStake";
import { ContextProviderWrapper, ModalOverlay } from "@kibble-exchange/uikit";
import {
  ContentCaontainer,
  ContentLeft,
  ContentRight,
  LiquidityDetailsWrapper,
  TitleBox,
} from "../Liquidity/Details/styled";
import TabsSelector from "./TabsSelector";
import { Summary, KibTokent } from "./Summary";
import Stake from "./NewStake";
import Finished from "./Finished";
import ModalClaim from "./Finished/ModalClaim";
import Gift from "../../assets/gif/staking.gif";
import Comming from "../../assets/gif/comming.gif";
import { postEvent } from "@tma.js/sdk";
import WebApp from "@twa-dev/sdk";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";

const Farm = () => {
  const address: any = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  const [leftSelected, setLeftSelected] = useState(1);
  const [rightSelected, setRightSelected] = useState(1);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [dataModal, setDataModal] = useState<any>();
  const { isMobile, theme }: any = useContext(ContextProviderWrapper);

  const mainBtnClicked = () => {
    if (address) {
      tonConnectUI.disconnect();
    } else {
      tonConnectUI.openModal();
    }
  };

  const onSettingMainButton = (address: any) => {
    if (address) {
      postEvent("web_app_setup_main_button", {
        color: "#007AF5",
        text: "Enter amount",
        is_active: false,
        is_visible: true,
      });
    } else {
      postEvent("web_app_setup_main_button", {
        color: "#007AF5",
        text: "Connect Wallet",
        is_active: true,
        is_visible: true,
      });
    }
  };

  useEffect(() => {
    onSettingMainButton(address);
    WebApp.onEvent("mainButtonClicked", mainBtnClicked);
    return () => {
      WebApp.offEvent("mainButtonClicked", mainBtnClicked);
    };
  }, [address]);

  return (
    <FarmContainer>
      <LiquidityDetailsWrapper>
        <ContentCaontainer>
          {/* ---------Box-left---------------- */}
          <div className="content-left-main">
            <ContentLeft>
              <TabsSelector
                data={TabsListLeft}
                callBack={(item: any) => {
                  setLeftSelected(item.value);
                }}
                active={leftSelected}
              />
              {leftSelected === 1 ? (
                <Summary></Summary>
              ) : (
                <KibTokent></KibTokent>
              )}
            </ContentLeft>
            {!isMobile && (
              <BlockCommingSoon className={theme}>
                <BlockCommingLeft>
                  <img src={Comming} alt="" />
                </BlockCommingLeft>
                <BlockCommingRight>
                  <BlockCommingTextBig className={theme}>
                    Waiting for our amazing staking feature.
                  </BlockCommingTextBig>
                  <BlockCommingTextSmall>Coming soon</BlockCommingTextSmall>
                </BlockCommingRight>
              </BlockCommingSoon>
            )}
          </div>

          {/* ---------Box-Right---------------- */}
          <ContentRight>
            <RightTitle>
              {!isMobile && (
                <RightTitleText className={theme}>EARN</RightTitleText>
              )}
              <div className="TabsBox">
                {!isMobile && (
                  <TabsSelector
                    data={TabsListRight}
                    disabled
                    // callBack={(item: any) => {
                    //   setRightSelected(item.value);
                    // }}
                    active={rightSelected}
                  />
                )}
              </div>
            </RightTitle>
            {rightSelected === 1 && <Stake />}
            {rightSelected === 2 && (
              <MyStake
                setOpenConfirmModal={setOpenConfirmModal}
                setDataModal={setDataModal}
              />
            )}
            {rightSelected === 3 && <Finished />}
          </ContentRight>
          {isMobile && (
            <BlockCommingSoon className={theme}>
              <BlockCommingLeft>
                <img src={Comming} alt="" />
              </BlockCommingLeft>
              <BlockCommingRight>
                <BlockCommingTextBig className={theme}>
                  Waiting for our amazing staking feature.
                </BlockCommingTextBig>
                <BlockCommingTextSmall>Coming soon</BlockCommingTextSmall>
              </BlockCommingRight>
            </BlockCommingSoon>
          )}
          {isMobile && (
            <TabsSelector
              data={TabsListRight}
              // callBack={(item: any) => {
              //   setRightSelected(item.value);
              // }}
              active={rightSelected}
            />
          )}
        </ContentCaontainer>
      </LiquidityDetailsWrapper>
      <ModalOverlay
        component={<ModalClaim />}
        onClickParent={() => {
          setOpenConfirmModal(false);
        }}
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        title={"claim rewards"}
        width="500px"
      />
    </FarmContainer>
  );
};

export default Farm;

const TabsListLeft = [
  {
    title: "My summary",
    value: 1,
  },
];
const TabsListRight = [
  {
    title: "New stake",
    value: 1,
  },
  {
    title: "My stakes",
    value: 2,
  },
  {
    title: "Finished",
    value: 3,
  },
];
