import Footer from "./components/Footer";
import { AppContainer } from "./styled";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import { ContextProvider } from "@kibble-exchange/uikit";
import { Toaster } from "react-hot-toast";
import { useCallback, useEffect, useMemo } from "react";
import LayoutDashboard from "./Layout/Dashboard";
import Swap from "./page/Swap";
import Farm from "./page/Farm";
import Launchpad from "./page/Launchpad";
import Liquidity from "./page/Liquidity";
import Community from "./page/Community";
import { store } from "./store/store";
import { Provider } from "react-redux";
import IDODetail from "./page/Launchpad/Detail";
import AddLiquidity from "./page/Liquidity/Add";
import CreatePoolLiquidity from "./page/Liquidity/CreatePool";
import LiquidityDetails from "./page/Liquidity/Details";
import LayoutLiquidity from "./Layout/Liquidity";
import WebApp from "@twa-dev/sdk";
import GlobalStyle from "./GlobalStyle";
import Kibble from "./page/Kibble";
import {
  createNavigator,
  useBackButtonIntegration,
  useNavigatorIntegration,
} from "@tma.js/react-router-integration";
import { BackButton, postEvent } from "@tma.js/sdk";
import eruda from "eruda";
import Portfolio from "./page/Portfolio";
// eruda.init();

const App = () => {
  const tmaNavigator = useMemo(createNavigator, []);
  const [location, navigator] = useNavigatorIntegration(tmaNavigator);
  const backButton = new BackButton(false, "6.3", postEvent);

  const goBack = useCallback(() => {
    navigator.go(-1);
  }, []);

  // useBackButtonIntegration(tmaNavigator, backButton);

  const settingDefaultMiniApp = () => {
    WebApp.setHeaderColor("#1B1B1B");
    WebApp.setBackgroundColor("#1B1B1B");
    WebApp.ready();
  };

  useEffect(() => {
    settingDefaultMiniApp();
  }, []);

  useEffect(() => {
    const { pathname }: any = location;
    postEvent("web_app_setup_back_button", {
      is_visible:
        pathname !== "/staking" &&
        pathname !== "/launchpad" &&
        pathname !== "/kibble" &&
        pathname !== "/liquidity" &&
        pathname !== "/",
    });
    WebApp.onEvent("backButtonClicked", goBack);
    return () => {
      WebApp.offEvent("backButtonClicked", goBack);
    };
  }, [location]);

  return (
    <Router location={location} navigator={navigator}>
      <ContextProvider>
        <Provider store={store}>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              style: {
                fontFamily: "Syne",
              },
            }}
          />
          <GlobalStyle />
          <Routes>
            <Route element={<LayoutDashboard />}>
              <Route index path="" element={<Swap />} />
              <Route path="staking" element={<Farm />} />
              <Route path="launchpad" element={<Launchpad />} />
              <Route path="kibble" element={<Portfolio />} />
              <Route path="launchpad/:id" element={<IDODetail />} />
              <Route path="liquidity" element={<LayoutLiquidity />}>
                <Route index element={<Liquidity />} />
                <Route path="provide" element={<AddLiquidity />} />
                <Route path="details/:id" element={<LiquidityDetails />} />
                <Route path="init" element={<CreatePoolLiquidity />} />
              </Route>
              <Route path="community-tool" element={<Community />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Provider>
      </ContextProvider>
    </Router>
  );
};

export default App;
