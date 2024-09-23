import express, { Request, Response } from 'express';
import http from 'http';
import WebSocket, { Server as WebSocketServer } from 'ws';
import cors from "cors"
import { Orderbook } from './orderbook';
import { OrderbookType } from './types/orderbook';

const app = express();
app.use(express.json())
app.use(cors())
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

function getRandomPrice(): number {
  return parseFloat((Math.random() * 10).toFixed(2) + 1);
}
function getQuantity():number{
  return Math.floor(Math.random() * 10) + 1;

}

function placeRandomOrders(orderbook: OrderbookType) {
  let buyId = 1;
  let sellId = 1;

  setInterval(() => {
    let buyPrice = getRandomPrice();
    let sellPrice = getRandomPrice();
    let buyQuantity = getQuantity();
    let sellQuantity = getQuantity();
    console.log(" buyPrice " + buyPrice + " buyQuantity " + buyQuantity + " sellPrice " + sellPrice + " sellQuantity " + sellQuantity);

    if (buyPrice > 10) {
      buyPrice = 6.5;
    }
    if (sellPrice > 10) {
      sellPrice = 6.3;
    }
  
    orderbook.addBuyOrder({
      id: `buy${buyId}`,
      quantity: buyQuantity,
      price: buyPrice,
      timeStamp: Date.now()
    });

    orderbook.addSellOrder({
      id: `sell${sellId}`,
      quantity: sellQuantity,
      price: sellPrice,
      timeStamp: Date.now()
    });

    console.log("\n--- Order Book State ---");
    console.log(orderbook.getOrderBookState());

    console.log("\n--- Order Depth (5 levels) ---");
    console.log(orderbook.getOrderDepth(5));

    console.log("\n--- Best Prices ---");
    console.log("Best Buy Price:", orderbook.getBestBuyPrice());
    console.log("Best Sell Price:", orderbook.getBestSellPrice());
    console.log("Probability:", orderbook.calculateProbabilty());
    
    let topYesPrice = orderbook.buyOrders.findMin()
    let topNoPrice = orderbook.sellOrders.findMax();
    if(topYesPrice != null && topNoPrice != null){
      console.log("topYesPrice ", topYesPrice[0].price);
      console.log("topNoPrice ", topNoPrice[0].price);
    }
    // Broadcast data after updating the orderbook
    broadcastData(orderbook);

    buyId++;
    sellId++;
  }, 10000);
}

function broadcastData(orderbook:any) {
  const data = {
    orderbook: orderbook.getOrderBookState(),
    orderbookDepth: orderbook.getOrderDepth(5),
    bestBuyPrice: orderbook.getBestBuyPrice(),
    bestSellPrice: orderbook.getBestSellPrice(),
    probability: orderbook.calculateProbabilty()
  };

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

wss.on('connection', (ws: WebSocket) => {
  const orderbook = new Orderbook()
  placeRandomOrders(orderbook); 

  ws.on('message', (message: string) => {
    // Handle incoming messages from clients if needed
  });
});


app.get('/initiate-market', (req: Request, res: Response) => {
  const orderbook = new Orderbook();
  
  
  const data  = orderbook.initiateEvent();
  console.log(data);
  let topYesPrice = orderbook.buyOrders.findMin()
  let topNoPrice = orderbook.sellOrders.findMax();
  if(topYesPrice != null && topNoPrice != null){
    console.log("topYesPrice ", topYesPrice[0].price);
    console.log("topNoPrice ", topNoPrice[0].price);
  }
  
  placeRandomOrders(orderbook);
  res.json(data);
});

app.get('/', (req: Request, res: Response) => {
  res.send('WebSocket server running.');
});

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});
