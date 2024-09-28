import Navbar from "@/components/Navbar";
import PortfolioBalances from "@/components/PortfolioBalances";
import TradeStatus from "@/components/TradeStatus";
import { useState } from "react";

const PortfolioPage = () => {
  const [category, setCategory] = useState("active trades");
  return (
    <div className="w-screen h-screen bg-bg">
      <Navbar />

      <div className="flex justify-center my-20">
        <PortfolioBalances />
      </div>

      <div className="flex justify-center">
        {/* Category Tabs */}
        <div className="flex space-x-4 mb-6 text-white px-8">
          <button
            className={`font-sora text-gray font-semibold ${
              category === "active trades" ? "border-b-2 border-gray" : ""
            }`}
            onClick={() => setCategory("active trades")}
          >
            Active Trades
          </button>
          <button
            className={`font-sora text-gray font-semibold ${
              category === "closed trades" ? "border-b-2 border-gray" : ""
            }`}
            onClick={() => setCategory("closed trades")}
          >
            Closed Trades
          </button>
          <button
            className={`font-sora text-gray font-semibold ${
              category === "transactions" ? "border-b-2 border-gray" : ""
            }`}
            onClick={() => setCategory("transactions")}
          >
            Transactions
          </button>

        </div>
      </div>
      <div className="">
        <div className="flex flex-col gap-5 justify-center w-2/3">
          <TradeStatus image={""} title={""} returns={0} investment={0} />
          <TradeStatus image={""} title={""} returns={0} investment={0} />
          <TradeStatus image={""} title={""} returns={0} investment={0} />
          <TradeStatus image={""} title={""} returns={0} investment={0} />
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
