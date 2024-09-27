import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
//import orderRouter from "./router/order";
import eventRouter from "./router/event";
import userRouter from "./router/user"

import http from "http";
import { setupwebsocket } from "./router/websockets";
import { updateOrderBook } from "./services/orderBookService";

const app = express();

app.use(cors());
app.use(bodyParser.json());
//app.use("/v1", orderRouter);
app.use("/v1/", eventRouter);
app.use("/v1/user", userRouter);
const server = http.createServer(app);
export const WebsocketServer = setupwebsocket(server);
server.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
setInterval(async () => {
  await updateOrderBook();
}, 30000);
