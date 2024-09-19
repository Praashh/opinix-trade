import http from 'http';
import WebSocket from 'ws';
import { calculateProbabilty, marketMakerOrders, orderbook } from '../utils/marketMaker';

export function setupwebsocket(server : http.Server){
   const wss = new WebSocket.Server({server});

   wss.on('connection',(ws:WebSocket)=>{
    console.log("client connected")

    const intialState = JSON.stringify({
        orderbook,
        probabilites : calculateProbabilty()
    })
    ws.send(intialState)

    
   })
   marketMakerOrders(wss);
   return wss
}