import express, { Request, Response } from 'express';
import http from 'http';
import WebSocket, { Server as WebSocketServer } from 'ws';
import cors from "cors"
import { Orderbook } from './orderbook';

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

function initiateMarket() {
  const orderbook = new Orderbook();
  let buyId = 1;
  let sellId = 1;

  setInterval(() => {
      let buyPrice = getRandomPrice();
      let sellPrice = getRandomPrice();
      let buyQuantity = getQuantity();
      let sellQuantity = getQuantity();
      console.log(" buyPrice " + buyPrice + " buyQuantity " + buyQuantity + " sellPrice " + sellPrice +  " sellQuantity " + sellQuantity);
      
      if(buyPrice >10){
        buyPrice = 9.5;
      }
      if(sellPrice > 10){
        sellPrice=7.3
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
      console.log("Probablity:", orderbook.calculateProbabilty());
      buyId++;
      sellId++;
  }, 10000);
  return orderbook.getOrderBookState();
}


function broadcastData() {
  return initiateMarket()
} 

wss.on('connection', (ws: WebSocket) => {
  ws.on('message', (message: string) => {
    broadcastData();
  });

});

app.post('/initiate-market', (req: Request, res: Response) => {
  console.log(req.body);
  initiateMarket()
  res.json({msg:"market initiated"});
});

app.get('/', (req: Request, res: Response) => {
  res.send('WebSocket server running.');
});

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});
