import { setDebug } from "@tma.js/sdk";
import { DisplayGate, SDKProvider, useLaunchParams } from "@tma.js/sdk-react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { type FC, useEffect, useMemo } from "react";
import App from "../App";
import { ErrorBoundary } from "./ErrorBoundary";

const DisplayError: FC<{ error: unknown }> = ({ error }) => (
  <blockquote>
    <code>
      {error instanceof Error ? error.message : JSON.stringify(error)}
    </code>
  </blockquote>
);

const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div>
    <p>An unhandled error occurred:</p>
    <DisplayError error={error} />
  </div>
);

const Inner: FC = () => {
  const launchParams = useLaunchParams();

  const manifestUrl = useMemo(() => {
    return new URL(
      "https://app.kibble.exchange/static/tonconnect-manifest.json",
      window.location.href
    ).toString();
  }, []);

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    if (launchParams.startParam === "debug") {
      setDebug(true);
      import("eruda").then((lib) => lib.default.init());
    }
  }, [launchParams]);

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <SDKProvider
        options={{ acceptCustomStyles: true, cssVars: true, complete: true }}
      >
        <App />
      </SDKProvider>
    </TonConnectUIProvider>
  );
};

export const Root: FC = () => (
  <ErrorBoundary fallback={ErrorBoundaryError}>
    <Inner />
  </ErrorBoundary>
);
