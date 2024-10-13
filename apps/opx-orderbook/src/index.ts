import { redisClient } from "@repo/order-queue";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import orderRouter from "./routes/orderBookRoutes";
import { setupWebSocket } from "./routes/webSockets";
import { startWorker } from "./services/initializeWorker";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/v1/orderbook", orderRouter);

app.get("/", (req, res) => {
  redisClient.connect().then(() => {
    console.log("Connected to Redis");
  });
  
});
startWorker()
const wss = setupWebSocket();
app.listen(3002, () => {
  console.log(`Server_2 is running at http://localhost:3002`);
});
