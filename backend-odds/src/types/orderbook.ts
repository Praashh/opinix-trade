export interface Order {
    id: string;
    quantity: number;
    price: number;
    timeStamp: number;
  }
  
 export interface OrderbookType {
    addBuyOrder(): Promise<void>;
    addSellOrder(): Promise<void>;
    getOrderBookState(): object;
    getOrderDepth(levels: number): object;
    getBestBuyPrice(): number | null;
    getBestSellPrice(): number | null ;
    calculateProbabilty(): {
        yesProb: number;
        noProb: number;
    }
    buyOrders:any,
    sellOrders:any
  }