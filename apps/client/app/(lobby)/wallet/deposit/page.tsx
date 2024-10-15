"use client";

import React, { useState, useEffect } from "react";

const Page = () => {
  const [amount, setAmount] = useState<string>("");
  const [gst, setGst] = useState<number>(0);
  const [showSummary, setShowSummary] = useState<boolean>(false);

  useEffect(() => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      setGst(numAmount * 0.219);
    } else {
      setGst(0);
    }
    setShowSummary(!isNaN(numAmount) && numAmount >= 5);
  }, [amount]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  return (
    <>
      <div className="flex flex-col px-4 sm:px-10 md:px-24 lg:px-56 py-10 gap-5">
        <div className="text-2xl sm:text-3xl font-bold">Deposit</div>
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Deposit component */}
          <div className="bg-white border rounded-md p-5 w-full lg:w-2/3">
            <div className="font-bold mb-4">Deposit amount</div>
            <div>
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                className="border border-blue-400 w-full rounded-md h-10 px-3"
              />
            </div>
            {!showSummary && (
              <div className="text-right text-red-500 text-xs">
                Please choose an amount ₹ 5 or above
              </div>
            )}
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => handleQuickAmount(250)}
                className="border rounded font-bold text-xs px-3 py-1"
              >
                +250
              </button>
              <button
                onClick={() => handleQuickAmount(500)}
                className="border rounded font-bold text-xs px-3 py-1"
              >
                +500
              </button>
              <button
                onClick={() => handleQuickAmount(1000)}
                className="border rounded font-bold text-xs px-3 py-1"
              >
                +1000
              </button>
            </div>
            <div className="mt-4">
              <button
                className={`${showSummary ? "bg-black" : "bg-gray-400"} text-white w-full rounded-md py-2 font-bold`}
                disabled={!showSummary}
              >
                Recharge
              </button>
            </div>
          </div>

          {/* Summary component */}
          {showSummary && (
            <div className="w-full lg:w-1/3 max-w-md mx-auto rounded-lg overflow-hidden border">
              <div className="px-6 py-4">
                <h2 className="text-sm font-bold text-center text-gray-700 mb-4">
                  SUMMARY
                </h2>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Recharge amount</span>
                    <span className="font-semibold">
                      ₹{parseFloat(amount).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">GST applicable</span>
                    <span className="font-semibold text-red-500">
                      - ₹{gst.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Deposit bal. credit</span>
                    <span className="font-semibold">
                      ₹{(parseFloat(amount) - gst).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      Promotional bal. credit
                    </span>
                    <span className="font-semibold text-green-500">
                      + ₹{gst.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-green-600 flex items-center">
                    <span className="mr-1">🎉</span>
                    <span>Recharge Cashback</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 px-6 py-4 text-xs border-t">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Net Balance</span>
                  <span className="font-bold">
                    ₹{parseFloat(amount).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
