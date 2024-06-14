import { useEffect, useState } from "react";
import { useBalance } from "../../hooks/useBalance";
import {
  PortfolioItem,
  PortfolioItemLeft,
  PortfolioItemRight,
  PortfolioStyle,
  PortfolioTotalBalance,
} from "./styled";
import {
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import {
  useGetAssetsQuery,
  useGetBalancesQuery,
} from "../../store/api/dexApiSlice";
import axios from "axios";
import TextBalance from "../../components/Common/TextBalance";
import {convertFixed} from "@kibble-exchange/uikit";

import {
  WalletAssetItem,
  WalletAssetToken,
  WalletAssets,
  WalletList,
  WalletParent,
} from "../../components/Header/Wallet/styled";
import { Coins } from "ton3-core";
import { NoData } from "../Farm/Finished/styled";
import { postEvent } from "@tma.js/sdk";
import WebApp from "@twa-dev/sdk";

const BACKEND_URL: any = process.env.REACT_APP_BACKEND_URL;
export default function Portfolio() {
  const address: any = useTonAddress();
  const wallet = useTonWallet();
  const { tonBalance } = useBalance();
  const [listAsset, setListAsset] = useState([]);
  const [tonConnectUI] = useTonConnectUI();
  const { data: balances }: any = useGetBalancesQuery(address, {
    pollingInterval: 1000 * 20,
    skip: !wallet,
  });
  const { data: assets }: any = useGetAssetsQuery(address?.toString() || "", {
    pollingInterval: 1000 * 60 * 10,
  });

  const handleGetTokenInWallet = async () => {
    try {
      if (!address) {
        setListAsset([]);
        return;
      }
      const { data }: any = await axios.get(
        `${BACKEND_URL}/api/v1/wallet/${address}/balances_info`
      );

      const updatedDisplayAssets = data.balances.map((item: any) => {
        return {
          decimals: Number(item.jetton ? item.jetton?.decimals : 9),
          display_name: item.jetton ? item.jetton?.name : "TON",
          symbol: item.jetton ? item.jetton?.symbol : "TON",
          contract_address: item.jetton
            ? item.jetton?.address.__root__
            : item.address,
          balance: item.balance,
          image_url: item.jetton ? item.jetton?.image : "",
        };
      });
      setListAsset(updatedDisplayAssets);
    } catch (error) {
      console.log("err in wallet", error);
    }
  };

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
        text: "Disconnect Wallet",
        is_active: true,
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
    handleGetTokenInWallet();
    onSettingMainButton(address);
    WebApp.onEvent("mainButtonClicked", mainBtnClicked);
    return () => {
      WebApp.offEvent("mainButtonClicked", mainBtnClicked);
    };
  }, [address, balances]);

  return (
    <PortfolioStyle>
      <PortfolioTotalBalance>
        <h2>Total Balance</h2>
        {address && tonBalance ? (
          <TextBalance
            unit={"KIB"}
            balance={convertFixed(Number(tonBalance))}
          />
        ) : (
          <TextBalance unit={"KIB"} balance={"0.0"} />
        )}
      </PortfolioTotalBalance>
      <WalletAssets>
        <WalletParent>
          <WalletList>
            {listAsset.length > 0 ? (
              listAsset.map((item: any, index: number) => {
                return (
                  <PortfolioItem key={index}>
                    <PortfolioItemLeft>
                      <div className="img-token">
                        <img src={item.image_url} alt="image_url" />
                      </div>
                      <div>
                        <h1>{item.symbol}</h1>
                      </div>
                    </PortfolioItemLeft>

                    <PortfolioItemRight>
                      <h2>
                        {convertFixed(
                          Number(Coins.fromNano(item.balance, item?.decimals))
                        )}
                      </h2>
                    </PortfolioItemRight>
                  </PortfolioItem>
                );
              })
            ) : (
              <NoData>
                <img src="/no-token.gif" alt="No Data" />
                <p>No assets found</p>
              </NoData>
            )}
          </WalletList>
        </WalletParent>
      </WalletAssets>
    </PortfolioStyle>
  );
}
