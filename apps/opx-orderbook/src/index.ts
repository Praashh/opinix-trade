import { redisClient } from "@repo/order-queue";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import orderRouter from "./routes/orderBookRoutes";
import { setupWebSocket } from "./routes/webSockets";
import { startWorker } from "./services/initializeWorker";
import { snapshot } from "./services/snapshot";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/v1/orderbook", orderRouter);

app.get("/", (req, res) => {
  redisClient.connect().then(() => {
    console.log("Connected to Redis");
  });
});
startWorker();
const wss = setupWebSocket();
setInterval(async () => {
  await snapshot();
}, 30 * 1000);
app.listen(3002, () => {
  console.log(`Server_2 is running at http://localhost:3002`);
});
