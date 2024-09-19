import { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle } from "@/components/ui/alert";

const client = new W3CWebSocket('ws://localhost:8080');

export default function Home() {
  const [yesBet, setYesBet] = useState(0);
  const [noBet, setNoBet] = useState(0);
  const [oddsYes, setOddsYes] = useState(1);
  const [oddsNo, setOddsNo] = useState(1);
  const [traders, setTraders] = useState(0);
  const [winner, setWinner] = useState(null);  

  useEffect(() => {
    client.onmessage = (message: any) => {
      const data = JSON.parse(message.data);
      setYesBet(data.yes);
      setNoBet(data.no);
      setOddsYes(data.oddsYes);
      setOddsNo(data.oddsNo);
      setTraders(data.traders);
      setWinner(data.winner);  
    };
  }, []);

  const placeBet = (opinion: 'yes' | 'no') => {
    if (winner) {
      alert("Betting is closed. The event has ended.");  
      return;
    }
    const amount = prompt(`How much do you want to bet on ${opinion}?`);
    if (amount && !isNaN(parseInt(amount))) {
      client.send(JSON.stringify({ opinion, amount: parseInt(amount) }));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">is Dhoni greatest captain ever?</h1>
      
      <Badge variant="secondary" className="mb-4 text-lg">Traders: {traders}</Badge>

      {winner && (
        <Alert variant={'default'} className="mb-6">
          <AlertTitle className="text-2xl font-bold text-cyan-400">The winner is: {winner}</AlertTitle>
          <p>Betting has closed. Thank you for participating!</p>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className={`${winner === 'yes' ? 'bg-green-100 text-black' : ''}`}>
          <CardHeader>
            <CardTitle>Yes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold mb-4">Odds: {oddsYes}</p>
            <Button 
              onClick={() => placeBet('yes')} 
              className="w-full"
              disabled={!!winner}  
            >
              Bet on Yes
            </Button>
          </CardContent>
        </Card>
        <Card className={`${winner === 'no' ? 'bg-red-100 text-black' : ''}`}>
          <CardHeader>
            <CardTitle>No</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold mb-4">Odds: {oddsNo}</p>
            <Button 
              onClick={() => placeBet('no')} 
              className="w-full"
              disabled={!!winner}  
            >
              Bet on No
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <Card>
          <CardContent className="pt-6">
            <p className="text-lg font-medium">Total Yes Bets</p>
            <p className="text-3xl font-bold">{yesBet}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-lg font-medium">Total No Bets</p>
            <p className="text-3xl font-bold">{noBet}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

