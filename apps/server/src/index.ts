import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import orderRouter from "./router/order";
import eventRouter from "./router/event";

import http from "http";
import { setupwebsocket } from "./router/websockets";
import { updateOrderBook } from "./services/orderBookService";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/v1/order", orderRouter);
app.use("/v1/events", eventRouter);

//export const WebsocketServer = setupwebsocket();
app.listen(3001, () => {
  console.log(`Server is running on http://localhost:3001`);
});
//  setInterval(async () => {
//    await updateOrderBook();
//  }, 30000);
