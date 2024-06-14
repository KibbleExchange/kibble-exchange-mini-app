import { Coins } from "ton3-core";
import { SwapDetail, SwapDetailBlock, SwapDetailRow } from "../../styled";
import { useContext, useEffect, useRef, useState } from "react";
import { ContextProviderWrapper,InputCommon } from "@kibble-exchange/uikit";


const SwapDetails = ({
  realPrice,
  fromAsset,
  toAsset,
  slippageTolerance,
  minReceived,
  simulateState,
  showDetail,
}: any) => {
  const divRef = useRef<any>(null);
  const [height, setHeight] = useState(0);
  const { theme } = useContext(ContextProviderWrapper)!;

  useEffect(() => {
    if (showDetail && divRef.current) {
      const updateHeight = () => {
        const newHeight = divRef.current.offsetHeight;
        if (newHeight !== height) {
          setHeight(newHeight);
        }
      };
      updateHeight();
    }
  }, [showDetail]);

  return (
    <SwapDetail
      style={{
        height: showDetail ? `${height}px` : "0px",
      }}
    >
      <SwapDetailBlock ref={divRef}>
        <SwapDetailRow className={theme}>
          <p>Min. receive:</p>
          <p>{`${(minReceived ?? "0").toString()}`}</p>
        </SwapDetailRow>
        <SwapDetailRow className={theme}>
          <p>Price impact:</p>
          <PriceImpact priceImpact={simulateState.priceImpact} />
        </SwapDetailRow>
        <SwapDetailRow className={theme}>
          <p>Slippage:</p>
          <p>{slippageTolerance}%</p>
        </SwapDetailRow>
        <SwapDetailRow className={theme}>
          <p>Blockchain fee:</p>
          <p>0.08-0.3 TON</p>
        </SwapDetailRow>
        <SwapDetailRow className={theme}>
          <p>Trading fee:</p>
          <p>{Coins.fromNano(simulateState.tonFeeUnits, 9).toString()} TON</p>
        </SwapDetailRow>
        <SwapDetailRow className={theme}>
          <p>Route:</p>
          <p>{`${fromAsset?.symbol} > ${toAsset?.symbol}`}</p>
        </SwapDetailRow>
      </SwapDetailBlock>
    </SwapDetail>
  );
};

const PriceImpact = ({ priceImpact }: { priceImpact: number }) => {
  const strValue = priceImpact.toFixed(2);
  const formatValue =
    priceImpact === 0
      ? `0%`
      : priceImpact <= 0.01
      ? `<0.01%`
      : priceImpact >= 99.9
      ? `>99.99%`
      : `${strValue}%`;
  const color = priceImpact <= 10 ? "#01B85F" : "red";

  return <p style={{ color }}>{formatValue}</p>;
};

export default SwapDetails;
