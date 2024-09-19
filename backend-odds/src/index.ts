import express, { Request, Response } from 'express';
import http from 'http';
import WebSocket, { Server as WebSocketServer } from 'ws';
import cors from "cors"

const app = express();
app.use(express.json())
app.use(cors())
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

interface Bets {
  yes: number;
  no: number;
  traders: number;
}

let bets: Bets = {
  yes: 0,
  no: 0,
  traders: 0,
};

let winner: 'yes' | 'no' | null = null;  

function broadcastData() {
  const oddsYes = bets.no === 0 ? 1 : (bets.no / bets.yes).toFixed(2);
  const oddsNo = bets.yes === 0 ? 1 : (bets.yes / bets.no).toFixed(2);

  const data = {
    yes: bets.yes,
    no: bets.no,
    traders: bets.traders,
    oddsYes,
    oddsNo,
    winner,  
  };

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

wss.on('connection', (ws: WebSocket) => {
  ws.on('message', (message: string) => {
    if (winner) {
      ws.send(JSON.stringify({ error: 'Betting is closed. The event has ended.' }));
      return;
    }

    const { opinion, amount }: { opinion: 'yes' | 'no'; amount: number } = JSON.parse(message);

    // Update bets based on opinion
    if (opinion === 'yes') {
      bets.yes += amount;
    } else if (opinion === 'no') {
      bets.no += amount;
    }

    bets.traders += 1;
    broadcastData();
  });

  ws.send(JSON.stringify({
    yes: bets.yes,
    no: bets.no,
    traders: bets.traders,
    oddsYes: (bets.no / (bets.yes || 1)).toFixed(2),
    oddsNo: (bets.yes / (bets.no || 1)).toFixed(2),
    winner,  
  }));
});

app.post('/end-event', (req: Request, res: Response) => {
  console.log(req.body);
  
  const { result }: { result: 'yes' | 'no' } = req.body;

  if (winner) {
    return res.status(400).send('The event has already ended.');
  }

  winner = result; 

  broadcastData();

  res.send(`The event has ended. Winner: ${winner}`);
});

app.get('/', (req: Request, res: Response) => {
  res.send('WebSocket server running.');
});

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});
