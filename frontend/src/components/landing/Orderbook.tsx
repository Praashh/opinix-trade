import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import LineChart from "../ui/line-chart";
import axios from "axios";

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

const OrderBook: React.FC = () => {
  const [orderBookData, setOrderBookData] = useState<OrderBookData | null>(
    null
  );
  const [yesPrice, setYesPrice] = useState<number>(0); 
  const [noPrice, setNoPrice] = useState<number>(0); 
  const [toggle, setToggle] = useState<boolean>(true);
  const [yesProbability, setYesProbability] = useState<number[]>([]);
  const [noProbability, setNoProbability] = useState<number[]>([]);
  const [timeSeries, setTimeSeries] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [side, setSide] = useState<"yes" | "no">("yes");
  const [tradePrice, setTradePrice] = useState<number>(0); 
  const [tradeQuantity, setTradeQuantity] = useState<number>(1); 

  useEffect(() => {
    const newSocket = new WebSocket("wss://3.234.207.188:3000");

    newSocket.onopen = () => {
      console.log("Connected to server");
      setSocket(newSocket);
    };

    newSocket.onmessage = (event: MessageEvent) => {
      const data: WebSocketData = JSON.parse(event.data);
      setOrderBookData(data.orderBook);
      setYesPrice(data.orderBook.topYesPrice);
      setNoPrice(data.orderBook.topNoPrice);

      const yesProbability = data.probability.yesProb;
      const noProbability = data.probability.noProb;

      setYesProbability((prev) => [...prev, yesProbability]);
      setNoProbability((prev) => [...prev, noProbability]);
      setTimeSeries((prev) => [...prev, new Date().toLocaleTimeString()]);
    };

    return () => {
      newSocket.close();
      socket?.close();
    };
  }, []);

  const labels = timeSeries;
  const data_yes = yesProbability;
  const data_no = noProbability;

  const handleTrade = async () => {
    try {
      const dataToSend = {
        side,
        price: tradePrice, 
        quantity: tradeQuantity, 
      };

      const response = await axios.post("http://3.234.207.188:3000/v1/order", dataToSend);
      console.log(response.data);

    } catch (err: any) {
      console.error(err);
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="w-full md:w-2/3">
          <Tabs defaultValue="orderbook">
            <TabsContent value="orderbook">
              <Card>
                <CardContent className="p-4">
                  <Tabs defaultValue="order_book">
                    <TabsList>
                      <TabsTrigger value="order_book">Order Book</TabsTrigger>
                    </TabsList>
                    <TabsContent value="order_book">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>PRICE</TableHead>
                            <TableHead>QTY AT YES</TableHead>
                            <TableHead>PRICE</TableHead>
                            <TableHead>QTY AT NO</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orderBookData &&
                            orderBookData.yes
                              .filter(item => item.price <= orderBookData.topYesPrice)
                              .sort((a, b) => b.price - a.price) 
                              .slice(0, 5)
                              .map((yesItem, index) => {
                                const noItem = orderBookData.no
                                  .filter(item => item.price <= orderBookData.topNoPrice)
                                  .sort((a, b) => b.price - a.price) 
                                  .slice(0, 5)[index];

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
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-full md:w-1/3">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between mb-4">
                <Button
                  variant={side === "yes" ? "default" : "outline"}
                  onClick={() => setSide("yes")}
                  className={`bg-blue-500 text-white ${
                    side === "yes" ? "active" : ""
                  }`}
                >
                  Yes ₹{yesPrice}
                </Button>
                <Button
                  variant={side === "no" ? "default" : "outline"}
                  onClick={() => setSide("no")}
                  className={`bg-red-500 text-white ${
                    side === "no" ? "active" : ""
                  }`}
                >
                  No ₹{noPrice}
                </Button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <Input
                  type="number"
                  value={tradePrice}
                  onChange={(e) => setTradePrice(Number(e.target.value))} 
                  className="mt-1"
                />
                <p className="text-sm text-gray-500">0 qty available</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <Input
                  type="number"
                  value={tradeQuantity} 
                  onChange={(e) => setTradeQuantity(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-lg font-bold">₹{yesPrice}</p>
                  <p className="text-sm text-gray-500">You put</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-green-500">
                    ₹{yesPrice + noPrice - yesPrice}
                  </p>
                  <p className="text-sm text-gray-500">You get</p>
                </div>
              </div>
              <Button
                onClick={handleTrade}
                className={`w-full text-white ${
                  side === "yes"
                    ? "bg-blue-500"
                    : side === "no"
                    ? "bg-red-500"
                    : "bg-gray-500"
                }`}
              >
                Place order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-center my-4">
        <Button
          onClick={() => setToggle(!toggle)}
          className={toggle ? "bg-red-500" : "bg-blue-500"}
        >
          {toggle ? "Show No Data" : "Show Yes Data"}
        </Button>
      </div>

      <LineChart
        labels={labels}
        data={toggle ? data_yes : data_no}
        borderColor={toggle ? "rgba(255, 99, 77, 1)" : "rgba(85, 142, 255, 1)"}
      />
    </div>
  );
};

export default OrderBook;