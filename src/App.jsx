


import React, { useState, useEffect } from 'react';
import CryptoChart from './components/CryptoChart';
import CryptoSelector from './components/CryptoSelector';

const COINS = ['ETHUSDT', 'BNBUSDT', 'DOTUSDT'];
const INTERVALS = ['1m', '3m', '5m'];

const App = () => {
  const [selectedCoin, setSelectedCoin] = useState(COINS[0]);
  const [selectedInterval, setSelectedInterval] = useState(INTERVALS[0]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem(`${selectedCoin}_${selectedInterval}`);
    if (storedData) {
      setChartData(JSON.parse(storedData));
    } else {
      setChartData([]);
    }

    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@kline_${selectedInterval}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const candle = {
        time: data.k.t / 1000,
        open: parseFloat(data.k.o),
        high: parseFloat(data.k.h),
        low: parseFloat(data.k.l),
        close: parseFloat(data.k.c)
      };

      setChartData((prevData) => {
        let newData;
        if (prevData.length > 0 && prevData[prevData.length - 1].time === candle.time) {
          newData = [...prevData.slice(0, -1), candle];
        } else {
          newData = [...prevData, candle];
        }
        localStorage.setItem(`${selectedCoin}_${selectedInterval}`, JSON.stringify(newData));
        return newData;
      });
    };

    return () => {
      ws.close();
    };
  }, [selectedCoin, selectedInterval]);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-bold mb-5 text-center">Cryptocurrency Chart</h1>
          <CryptoSelector
            coins={COINS}
            intervals={INTERVALS}
            selectedCoin={selectedCoin}
            selectedInterval={selectedInterval}
            onCoinChange={setSelectedCoin}
            onIntervalChange={setSelectedInterval}
          />
          <CryptoChart data={chartData} coin={selectedCoin} interval={selectedInterval} />
        </div>
      </div>
    </div>
  );
};

export default App;
