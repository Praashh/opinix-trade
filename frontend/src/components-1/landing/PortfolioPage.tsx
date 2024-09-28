import axios from "axios";
import { useEffect, useState } from "react";

interface Portfolio {
  success: boolean;
  side: "yes" | "no";
  initialPrice: number;
  currentPrice: number;
  quantity: number;
  gainLoss: string;
}
const PortfolioPage = () => {
  const [portfolio, setPortfolio] = useState<Portfolio>();

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get(
          "http://3.234.207.188:3000/v1/portfolio"
        );
        setPortfolio(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPortfolio();
  });
  return (
    <div>
      <div>
        <h1 className="text-center font-semibold text-3xl my-5">Portfolio</h1>
        <div className="flex m-4 p-4 items-center justify-between border-2 rounded-2xl">
          <p
            className={
              portfolio?.side === "yes" ? "text-green-500 text-2xl" : "text-red-500 text-2xl" 
            }
          >
            {portfolio?.side}
          </p>
          <div>
            <p className="text-center text-xl">{portfolio?.initialPrice}</p>
            <p className="text-center text-sm">Initial Price</p>
          </div>
          <div>
            <p className="text-center text-xl">{portfolio?.currentPrice}</p>
            <p className="text-center text-sm">Current Price</p>
          </div>
          <div>
            <p className="text-center text-xl">{portfolio?.quantity}</p>
            <p className="text-center text-sm">Quantity</p>
          </div>
          <div>
            <p className="text-center text-xl">{portfolio?.gainLoss}</p>
            <p className="text-center text-sm">Gain/Loss</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
