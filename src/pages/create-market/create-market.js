import React, { useState, useEffect } from "react";
import AddMarket from "../../components/add-market/add-market"

const MarketCreate = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    return function cleanup() {
        setShow(false);
    }
  }, []);

  return (
    <>
        <h3>Create Market</h3>
        {show && <AddMarket data={{mode: "add", market: null}} />}
    </>
  );
};

export default MarketCreate;
