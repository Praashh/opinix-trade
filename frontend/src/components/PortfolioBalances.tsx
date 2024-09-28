const PortfolioBalances = () => {
  return (
    <div
      className="w-3/4 p-10 rounded-[20px] flex justify-between
    shadow-[inset_-10px_-10px_30px_rgba(28,36,76,0.5),_inset_10px_10px_40px_rgba(28,36,76,0.5)]"
    >
      <div className="flex">
        <div>
          <div className="font-sora font-semibold text-xl text-white">
            Portfolio
          </div>
          <div className="font-sora font-semibold text-xl text-white text-center">
            ₹0.0
          </div>
        </div>

        <div className="w-[80px] h-0 border-t-4 mt-7 border-white transform rotate-90"></div>

        <div className="flex">
          <div>
            <div className="font-sora font-semibold text-xl text-white">
              Wallet
            </div>
            <div className="font-sora font-semibold text-xl text-white text-center">
              ₹0.0
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-5 mt-2">
        <button className="w-[160px] h-[40px] bg-gradient-to-r from-[#212635] to-[#191B25] rounded font-sora font-semibold text-xl text-white">
          Deposit
        </button>
        <button className="w-[160px] h-[40px] bg-gradient-to-r from-[#212635] to-[#191B25] rounded font-sora font-semibold text-xl text-white">
          Withdrawal
        </button>
      </div>
    </div>
  );
};

export default PortfolioBalances;
