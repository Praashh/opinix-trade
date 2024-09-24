import React from "react";

interface PortfolioProps {
  side: "yes" | "no";
  initialPrice: number;
  currentPrice: number;
  quantity: number;
  gainLoss: string;
}

const Portfolio: React.FC<PortfolioProps> = ({
  side,
  initialPrice,
  currentPrice,
  quantity,
}) => {
  const investment = (initialPrice * quantity) / 100;
  const returns = (currentPrice * quantity) / 100;

  return (
    <div className="flex items-center justify-between border border-gray-300 rounded-lg p-4 my-4 bg-gray-900 shadow-sm">
      {/* Side (Yes/No) */}
      <div
        className={`px-4 py-2 rounded-lg font-bold ${
          side === "yes"
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {side === "yes" ? "Yes" : "No"}
      </div>

      {/* Investment and Returns */}
      <div className="flex justify-between w-2/3">
        <div className="text-center mx-6">
          <span className="block text-lg font-semibold">
            ₹{investment.toFixed(1)}
          </span>
          <p className="text-sm text-gray-500">Investment</p>
        </div>
        <div className="text-center mx-6">
          <span
            className={`block text-lg font-semibold ${
              returns >= investment ? "text-green-600" : "text-red-600"
            }`}
          >
            ₹{returns.toFixed(1)}
          </span>
          <p className="text-sm text-gray-500">Returns</p>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
