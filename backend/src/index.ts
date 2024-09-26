import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import orderRouter from "./router/order";
import eventRouter from "./router/event";

import http from "http";
import { setupwebsocket } from "./router/websockets";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/v1", orderRouter);
app.use("/v1", eventRouter);
const server = http.createServer(app);
export const WebsocketServer = setupwebsocket(server);
server.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

