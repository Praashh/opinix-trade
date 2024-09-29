import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LineChart from "../components/ui/line-chart";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";

interface OrderBookItem {
  price: number;
  quantity: number;
}

interface OrderBookData {
  yes: OrderBookItem[];
  no: OrderBookItem[];
  topYesPrice: number;
  topNoPrice: number;
}

interface WebSocketData {
  orderBook: OrderBookData;
  probability: {
    yesProb: number;
    noProb: number;
  };
}

const EventOverview = () => {
  const [orderBookData, setOrderBookData] = useState<OrderBookData | null>(
    null
  );
  const [yesPrice, setYesPrice] = useState<number>(0);
  const [noPrice, setNoPrice] = useState<number>(0);
  const [yesProbability, setYesProbability] = useState<number[]>([]);
  const [noProbability, setNoProbability] = useState<number[]>([]);
  const [timeSeries, setTimeSeries] = useState<string[]>([]);
  const [toggle, setToggle] = useState<boolean>(true);
  const [side, setSide] = useState<"yes" | "no">("yes");
  const [tradePrice, setTradePrice] = useState<number>();
  const [tradeQuantity, setTradeQuantity] = useState<number>(1);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://3.234.207.188:3000");

    newSocket.onopen = () => {
      console.log("Connected to server");
      setSocket(newSocket);
    };

    newSocket.onmessage = (event: MessageEvent) => {
      try {
        const data: WebSocketData = JSON.parse(event.data);
        setOrderBookData(data.orderBook);
        setYesPrice(data.orderBook.topYesPrice);
        setNoPrice(data.orderBook.topNoPrice);

        setTradePrice(data.orderBook.topYesPrice);
        handlePriceChange(data.orderBook.topYesPrice);

        const yesProbability = data.probability.yesProb;
        const noProbability = data.probability.noProb;

        setYesProbability((prev) => [...prev, yesProbability]);
        setNoProbability((prev) => [...prev, noProbability]);
        setTimeSeries((prev) => [...prev, new Date().toLocaleTimeString()]);
      } catch (error) {
        console.error("Error parsing WebSocket data:", error);
      }
    };

    return () => {
      newSocket.close();
      socket?.close();
    };
  }, []);

  const handleTrade = async () => {
    try {
      const dataToSend = {
        side,
        price: tradePrice,
        quantity: tradeQuantity,
      };

      const response = await axios.post(
        "http://3.234.207.188:3000/v1/order",
        dataToSend
      );
      console.log(response.data);
    } catch (err: any) {
      console.error(err);
    }
  };

  const handlePriceChange = (newPrice: number) => {
    setTradePrice(newPrice);
  
    if (orderBookData) {
      let availableQuantity = 0;
  
      // Find available quantity based on the selected side and new price
      if (side === "yes") {
        const orderAtPrice = orderBookData.yes.find(
          (order) => order.price === newPrice
        );
        availableQuantity = orderAtPrice ? orderAtPrice.quantity : 0;
      } else if (side === "no") {
        const orderAtPrice = orderBookData.no.find(
          (order) => order.price === newPrice
        );
        availableQuantity = orderAtPrice ? orderAtPrice.quantity : 0;
      }
  
      // Update the trade quantity based on available orders
      setTradeQuantity(availableQuantity > 0 ? availableQuantity : 0);
    }
  };
  

  const handleQuantityChange = (newQuantity: number) => {
    setTradeQuantity(newQuantity);
  };

  const labels = timeSeries;
  const data_yes = yesProbability;
  const data_no = noProbability;

  const sortedYesOrders = useMemo(() => {
    return orderBookData
      ? orderBookData.yes
          .filter((item) => item.price <= orderBookData.topYesPrice)
          .sort((a, b) => b.price - a.price)
          .slice(0, 5)
      : [];
  }, [orderBookData]);

  const sortedNoOrders = useMemo(() => {
    return orderBookData
      ? orderBookData.no
          .filter((item) => item.price <= orderBookData.topNoPrice)
          .sort((a, b) => b.price - a.price)
          .slice(0, 5)
      : [];
  }, [orderBookData]);

  return (
    <div className="w-screen h-screen bg-bg p-5">
      <Navbar />
      <div className="flex">
        <div className="w-2/3">
          <div className="flex gap-6">
            <img
              src="https://via.placeholder.com/150"
              alt=""
              className="w-32 h-32"
            />
            <p className="font-sora text-gray text-2xl">
              Will India win the 2nd test against Bangladesh
            </p>
          </div>
          <div className="mt-10">
            <p className="font-sora text-gray text-lg">Order Book</p>
            <div className="p-5 bg-bg">
              <Table className="text-white">
                <TableHeader>
                  <TableRow>
                    <TableHead>PRICE</TableHead>
                    <TableHead>QTY AT YES</TableHead>
                    <TableHead>PRICE</TableHead>
                    <TableHead>QTY AT NO</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedYesOrders.map((yesItem, index) => {
                    const noItem = sortedNoOrders[index];

                    return (
                      <TableRow key={index}>
                        <TableCell>{yesItem.price}</TableCell>
                        <TableCell>{yesItem.quantity}</TableCell>
                        {noItem && (
                          <>
                            <TableCell>{noItem.price}</TableCell>
                            <TableCell>{noItem.quantity}</TableCell>
                          </>
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <p className="font-sora text-gray text-lg">
              Probabilities Timeline
            </p>
            <div>
              <div className="flex justify-center my-4">
                <Button
                  onClick={() => setToggle(!toggle)}
                  className={`text-white ${
                    toggle ? "bg-[#FF426E]" : "bg-blue-600"
                  }`}
                >
                  {toggle ? "Show No Data" : "Show Yes Data"}
                </Button>
              </div>
              <LineChart
                labels={labels}
                data={toggle ? data_yes : data_no}
                borderColor={
                  toggle ? "rgba(255, 66, 110, 1)" : "rgba(85, 142, 255, 1)"
                }
              />
            </div>
            <p className="font-sora text-gray text-lg">About the Event</p>
          </div>
        </div>

        <div className="w-1/3 pr-10">
          <div
            className="p-10 rounded-[20px]
            shadow-[inset_-10px_-10px_30px_rgba(28,36,76,0.5),_inset_10px_10px_40px_rgba(28,36,76,0.5)]"
          >
            {/* Yes and No Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setSide("yes");
                  setTradePrice(yesPrice);
                }}
                className="bg-blue-600 text-white font-semibold w-48 h-10 font-sora"
              >
                Yes - ₹{yesPrice}
              </button>

              <button
                onClick={() => {
                  setSide("no");
                  setTradePrice(noPrice);
                }}
                className="bg-[#FF426E] text-white font-semibold w-48 h-10 font-sora"
              >
                No - ₹{noPrice}
              </button>
            </div>

            {/* Price and Available Quantity */}
            <div className="flex justify-between my-5">
              <p className="text-white font-sora">Price: {tradePrice}</p>
              <p className="text-white font-sora">
                Available Qty: {tradeQuantity}
              </p>
            </div>

            {/* Price Input */}
            <div className="my-5">
              <p className="text-white font-sora mb-2">Price</p>
              <Input
                type="number"
                value={tradePrice}
                onChange={(e) => handlePriceChange(Number(e.target.value))}
                className="w-full border border-gray text-white"
                placeholder="Enter Price"
              />
            </div>

            {/* Quantity Input */}
            <div className="my-5">
              <p className="text-white font-sora mb-2">Quantity</p>
              <Input
                type="number"
                value={tradeQuantity}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                className="w-full border border-gray text-white"
                placeholder="Enter Quantity"
              />
            </div>
            {/* Investment and Returns Calculation */}
            <div className="text-white font-sora my-5">
              Total Investment: {tradePrice} x {tradeQuantity} = ₹
              {tradePrice! * tradeQuantity}
            </div>

            <div className="text-white font-sora my-5">
              Maximum Returns: {tradePrice} x {tradeQuantity} = ₹
              {tradePrice! * tradeQuantity}
            </div>

            {/* Place Order Button */}
            <button
              className={` text-white font-semibold w-full h-10 font-sora ${
                side == "yes" ? "bg-blue-600" : "bg-[#FF426E]"
              }`}
              onClick={handleTrade}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventOverview;
