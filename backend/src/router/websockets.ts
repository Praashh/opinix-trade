import WebSocket from "ws";
import { Server } from "http";
import { calculateProbabilty, orderBook } from "../utils/marketMaker";

let clients: WebSocket[] = [];

export const setupwebsocket = (server: Server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws: WebSocket) => {
    clients.push(ws);
    console.log("New client connected!");

    ws.send(
      JSON.stringify({
        orderBook,
        probability: calculateProbabilty(orderBook),
      })
    );
    ws.on("close", () => {
      clients = clients.filter((client) => client !== ws);
      console.log("Client disconnected.");
    });
  });

  return wss;
};

export const WebsocketServer = {
  broadcast: (data: any) => {
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  },
};
