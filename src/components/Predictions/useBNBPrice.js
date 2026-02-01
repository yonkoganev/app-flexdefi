import { useEffect, useState } from "react";

export function useBNBPrice() {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/bnbusdt@trade");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrice(parseFloat(data.p));
    };

    ws.onerror = console.error;

    return () => ws.close();
  }, []);

  return price;
}
