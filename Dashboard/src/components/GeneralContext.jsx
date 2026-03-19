import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},
  openSellWindow: (uid) => {},
  closeSellWindow: () => {},
  triggerRefresh: () => {},
  refreshCount: 0,
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);

  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [refreshCount, setRefreshCount] = useState(0);

  // ✅ BUY
  const handleOpenBuyWindow = (uid) => {
    setSelectedStockUID(uid);
    setIsBuyWindowOpen(true);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  // ✅ SELL
  const handleOpenSellWindow = (uid) => {
    setSelectedStockUID(uid);
    setIsSellWindowOpen(true);
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
  };

  // ✅ REFRESH — increments counter so consumers can re-fetch data
  const handleTriggerRefresh = () => {
    setRefreshCount((prev) => prev + 1);
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
        triggerRefresh: handleTriggerRefresh,
        refreshCount,
      }}
    >
      {props.children}

      {/* ✅ Buy Window */}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}

      {/* ✅ Sell Window */}
      {isSellWindowOpen && <SellActionWindow uid={selectedStockUID} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
