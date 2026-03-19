import React, { useEffect, useState, useContext } from "react";
import api from "../utils/api";

import GeneralContext from "./GeneralContext";
import "./SellActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);
  const [holdings, setHoldings] = useState([]);
  const [error, setError] = useState("");

  // Fetch holdings
  useEffect(() => {
    api
      .get("/allHoldings")
      .then((res) => setHoldings(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Find current stock
  const stockHolding = holdings.find((item) => item.name === uid);

  const handleSellClick = async () => {
    setError("");

    if (!stockHolding) {
      setError("You don't own this stock");
      return;
    }

    if (stockQuantity > stockHolding.qty) {
      setError(`Only ${stockHolding.qty} shares available`);
      return;
    }

    try {
      const res = await api.post("/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "SELL",
      });

      if (res.status === 200) {
        generalContext.triggerRefresh();
        generalContext.closeSellWindow();
      }
    } catch (err) {
      console.error(err);
      const backendMsg = err.response?.data?.error;
      setError(backendMsg || "Failed to place sell order");
    }
  };

  return (
    <div className="container" id="sell-window" draggable="true">

      {/* HEADER */}
      <div className="header">
        <h3>
          Sell {uid} <span>• NSE</span>
        </h3>
        <div className="market-options">
          <label>
            <input type="radio" defaultChecked />
            Market
          </label>
          <label>
            <input type="radio" />
            Limit
          </label>
        </div>
      </div>

      {/* TAB */}
      <div className="tab">
        <button>Regular</button>
      </div>

      {/* FORM */}
      <div className="regular-order">
        <div className="inputs">

          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              value={stockQuantity}
              onChange={(e) => {
                setStockQuantity(Number(e.target.value));
                setError("");
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              step="0.05"
              value={stockPrice}
              onChange={(e) => setStockPrice(Number(e.target.value))}
            />
          </fieldset>

        </div>
      </div>

      {/* ERROR */}
      {error && <p className="error">{error}</p>}

      {/* BUTTONS */}
      <div className="buttons">
        <span>
          Available: {stockHolding ? stockHolding.qty : 0}
        </span>

        <div>
          <button className="btn btn-red" onClick={handleSellClick}>
            Sell
          </button>

          <button
            className="btn btn-grey"
            onClick={generalContext.closeSellWindow}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;