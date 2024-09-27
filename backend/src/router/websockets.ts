import WebSocket from "ws";
import { Server } from "http";
import { getOrderBookForEvent } from "../services/getOrderBookForEvent";

let clients: { ws: WebSocket; eventId: string }[] = [];

export const setupwebsocket = (server: Server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws: WebSocket) => {
    ws.on("message", async (message: string) => {
      const parsedMessage = JSON.parse(message);

      if (parsedMessage && parsedMessage.eventId) {
        const existingClient = clients.find(
          (client) =>
            client.ws === ws && client.eventId === parsedMessage.eventId
        );

        if (!existingClient) {
          clients.push({ ws, eventId: parsedMessage.eventId });
          console.log(`Client subscribed to event ${parsedMessage.eventId}`);
        }

        const orderbook = await getOrderBookForEvent(parsedMessage.eventId);
        ws.send(JSON.stringify({ orderbook }));
      }
    });

    ws.on("close", () => {
      clients = clients.filter((client) => client.ws !== ws);
      console.log("Client disconnected.");
    });
  });
  return wss;
};

export const WebsocketServer = {
  broadcast: (eventId: string, data: any) => {
    clients.forEach((client) => {
      if (
        client.eventId === eventId &&
        client.ws.readyState === WebSocket.OPEN
      ) {
        client.ws.send(JSON.stringify(data));
      }
    });
  },
};
