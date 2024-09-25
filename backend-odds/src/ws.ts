import WebSocket, { Server as WebSocketServer } from 'ws';
import { Orderbook } from './classes/orderbook';
import { OrderbookType } from './types/orderbook';
import http from 'http';
import { pushTradeInQueue } from './utils/pushTradeInQueue';
import redis from './services/redis';

function getRandomPrice(): number {
    return parseFloat((Math.random() * 10).toFixed(1));
  }
  
function getQuantity(): number {
    return Math.floor(Math.random() * 10) + 1;
}
  

async function placeRandomOrders(orderbook: OrderbookType, wss: WebSocketServer) {
  let buyId = 1;
  let sellId = 1;

  setInterval(async() => {
    let buyPrice = getRandomPrice();
    let sellPrice = getRandomPrice();
    let buyQuantity = getQuantity();
    let sellQuantity = getQuantity();
    console.log("-------------------------------------------------------------");
    console.log("buyPrice " + buyPrice + " buyQuantity " + buyQuantity + " sellPrice " + sellPrice + " sellQuantity " + sellQuantity);
    console.log("-------------------------------------------------------------");
    if (buyPrice > 10) {
      buyPrice = 6.5;
    }
    if (sellPrice > 10) {
      sellPrice = 6.3;
    }

    orderbook.addBuyOrder({
      id: `buy${buyId}`,
      side:"yes",
      quantity: buyQuantity,
      price: buyPrice,
      timeStamp: Date.now(),
    });
    // await pushTradeInQueue({key:"Trade", Trade:{ id: `buy${buyId}`, quantity: buyQuantity, price: buyPrice, timeStamp: Date.now()}})

    orderbook.addSellOrder({
      id: `sell${sellId}`,
      side:"no",
      quantity: sellQuantity,
      price: sellPrice,
      timeStamp: Date.now(),
    });
    // await pushTradeInQueue({key:"Trade", Trade:{ id: `sell${sellId}`, quantity: sellQuantity, price: sellPrice, timeStamp: Date.now()}})

    console.log("\n--- Order Book State ---");
    console.log(orderbook.getOrderBookState());

    console.log("\n--- Order Depth (5 levels) ---");
    console.log(orderbook.getOrderDepth(5));

    console.log("\n--- Best Prices ---");
    console.log("Best Buy Price:", orderbook.getBestBuyPrice());
    console.log("Best Sell Price:", orderbook.getBestSellPrice());
    console.log("Probability:", orderbook.calculateProbabilty());

    let topYesPrice = orderbook.buyOrders.findMin();
    let topNoPrice = orderbook.sellOrders.findMax();
    if (topYesPrice != null && topNoPrice != null) {
      console.log("topYesPrice ", topYesPrice[0].price);
      console.log("topNoPrice ", topNoPrice[0].price);
    }

    // Broadcasting orderbook
    broadcastData(orderbook, wss);

    buyId++;
    sellId++;
  }, 30000);
}

function broadcastData(orderbook: OrderbookType, wss: WebSocketServer) {
  const data = {
    orderbook: orderbook.getOrderBookState(),
    orderbookDepth: orderbook.getOrderDepth(5),
    bestBuyPrice: orderbook.getBestBuyPrice(),
    bestSellPrice: orderbook.getBestSellPrice(),
    probability: orderbook.calculateProbabilty(),
  };

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

export function setupWebSocketServer(server: http.Server) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws: WebSocket) => {
    const orderbook = new Orderbook();
    placeRandomOrders(orderbook, wss);

    ws.on('message', (message: string) => {
      // incoming messages if needed
    });
  });
}
