import { WebsocketServer } from "../router/websockets";

interface Order {
  price: number;
  quantity: number;
}
type OrderBook = {
  yes: Order[];
  no: Order[];
  topYesPrice: number;
  topNoPrice: number;
};
interface UserPortfolio {
  side: "yes" | "no" | null;
  initialPrice: number | null;
  initialQuantity: number | null;
}

let userPortfolio: UserPortfolio = {
  side: null,
  initialPrice: null,
  initialQuantity: null,
};

const initializeOrderBook = (): OrderBook => {
  const orderBook: OrderBook = {
    yes: [],
    no: [],
    topYesPrice: 5,
    topNoPrice: 5,
  };

  for (let price = 0.5; price <= 9.5; price += 0.5) {
    orderBook.yes.push({
      price,
      quantity: Math.floor(Math.random() * 100) + 1,
    });
    orderBook.no.push({ price, quantity: Math.floor(Math.random() * 100) + 1 });
  }
  orderBook.topYesPrice = 5;
  orderBook.topNoPrice = 5;

  return orderBook;
};
export let orderBook = initializeOrderBook();

export const processOrder = (
  side: "yes" | "no",
  quantity: number,
  price: number,
  orderBook: OrderBook
) => {
  const topYes = orderBook.yes.find(
    (order) => order.price === orderBook.topYesPrice
  );
  const topNo = orderBook.no.find(
    (order) => order.price === orderBook.topNoPrice
  );

  if (side === "yes") {
    if (price < orderBook.topYesPrice) {
      return {
        success: false,
        message: "Invalid request: Price is lower than the top price for Yes.",
      };
    }
    if (topYes && topYes.quantity < quantity) {
      return {
        success: false,
        message: "Invalid request: Not enough quantity available.",
      };
    }
    if (!userPortfolio.initialPrice && !userPortfolio.side) {
      userPortfolio.side = "yes";
      userPortfolio.initialPrice = orderBook.topYesPrice;
      userPortfolio.initialQuantity = quantity;
    }

    if (topYes && topNo && topYes.quantity >= quantity) {
      topYes.quantity -= quantity;

      if (topYes.quantity === 0) {
        orderBook.topYesPrice += 0.5;
        orderBook.topNoPrice -= 0.5;
        broadcastPortfolio()
      }

      broadcastOrderBook(orderBook);
      return { success: true };
    } else {
      return { success: false, message: "Not enough quantity available." };
    }
  } else {
    if (price < orderBook.topNoPrice) {
      return {
        success: false,
        message: "Invalid request: Price is lower than the top price for No.",
      };
    }
    if (topNo && topNo.quantity < quantity) {
      return {
        success: false,
        message: "Invalid request: Not enough quantity available.",
      };
    }
    if (!userPortfolio.initialPrice && !userPortfolio.side) {
      userPortfolio.side = "no";
      userPortfolio.initialPrice = orderBook.topNoPrice;
      userPortfolio.initialQuantity = quantity;
    }

    if (topNo && topYes && topNo.quantity >= quantity) {
      topNo.quantity -= quantity;

      if (topNo.quantity === 0) {
        orderBook.topNoPrice += 0.5;
        orderBook.topYesPrice -= 0.5;
        broadcastPortfolio()
      }

      broadcastOrderBook(orderBook);
      return { success: true };
    } else {
      return { success: false, message: "Not enough quantity available." };
    }
  }
};
export const calculateProbabilty = (orderBook: OrderBook) => {
  const yesProb = (orderBook.topYesPrice / 10) * 100;
  const noProb = 100 - yesProb;

  return {
    yesProb,
    noProb,
  };
};


/*setInterval(() => {
  orderBook.yes.forEach((order) => {
    const change = Math.floor(Math.random() * 5) - 2;
    order.quantity = Math.max(0, order.quantity + change);
  });

  orderBook.no.forEach((order) => {
    const change = Math.floor(Math.random() * 5) - 2;
    order.quantity = Math.max(0, order.quantity + change);
  });

  broadcastOrderBook(orderBook);
}, 30000);
*/

export const getPortfolio = () => {
  if (!userPortfolio.side || userPortfolio.initialPrice === null) {
    return { success: false, message: "No orders placed yet." };
  }

  const currentPrice =
    userPortfolio.side === "yes" ? orderBook.topYesPrice : orderBook.topNoPrice;
  const gainLoss =
    (currentPrice - userPortfolio.initialPrice) *
    userPortfolio.initialQuantity!;

  return {
    success: true,
    side: userPortfolio.side,
    initialPrice: userPortfolio.initialPrice,
    currentPrice,
    quantity: userPortfolio.initialQuantity,
    gainLoss: `${gainLoss.toFixed(2)} Rs`,
  };
};
const broadcastOrderBook = (orderBook: OrderBook) => {
  const probability = calculateProbabilty(orderBook);

  WebsocketServer.broadcast({
    orderBook,
    probability,
  });
};
const broadcastPortfolio = ()=>{
  const portfolio = getPortfolio();
  WebsocketServer.broadcast({
    portfolio
  })
}