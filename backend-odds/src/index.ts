import express, { Request, Response } from 'express';
import http from 'http';
import cors from "cors"
import { Orderbook } from './classes/orderbook';
import { setupWebSocketServer } from './ws';
import rootRouter from "./routes/index"
import { config } from 'dotenv';
config();

const app = express();
app.use(express.json())
app.use(cors())
const server = http.createServer(app);

setupWebSocketServer(server);

app.get('/initiate-market', (req: Request, res: Response) => {
  const orderbook = new Orderbook();
  const data = orderbook.initiateEvent();
  console.log(data);
  try {
    let topYesPrice = orderbook.buyOrders.findMin()
    let topNoPrice = orderbook.sellOrders.findMax();
    if (topYesPrice != null && topNoPrice != null) {
      console.log("-------------------------------------------------------------");
      console.log("topYesPrice ", topYesPrice[0].price);
      console.log("topNoPrice ", topNoPrice[0].price);
      console.log("-------------------------------------------------------------");
    }

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong!" })
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send('WebSocket server running.');
});

app.use('/api/v1', rootRouter);

console.log(process.env.PORT);

server.listen(process.env.PORT, () => {
  console.log('Server running on http://localhost:3000');
});
