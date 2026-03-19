import React, { useEffect, useState } from "react";
import axios from "axios";

const Summary = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [holdings, setHoldings] = useState([]);

  // 🔥 Fetch holdings
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/allHoldings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setHoldings(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 🔥 Calculations
  let investment = 0;
  let currentValue = 0;

  holdings.forEach((stock) => {
    investment += stock.avg * stock.qty;
    currentValue += stock.price * stock.qty;
  });

  const pnl = currentValue - investment;
  const pnlPercent = investment
    ? ((pnl / investment) * 100).toFixed(2)
    : 0;

  // simple formatter (1.5k style)
  const format = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(2) + "k";
    return num.toFixed(2);
  };

  return (
    <>
      {/* USER NAME */}
      <div className="username">
        <h6>Hi, {user ? user.name : "User"}!</h6>
        <hr className="divider" />
      </div>

      {/* EQUITY */}
      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{format(currentValue)}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>
            </p>
            <p>
              Opening balance <span>{format(investment)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      {/* HOLDINGS */}
      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={pnl >= 0 ? "profit" : "loss"}>
              {format(pnl)}{" "}
              <small>
                {pnlPercent}%
              </small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{format(currentValue)}</span>
            </p>
            <p>
              Investment <span>{format(investment)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;