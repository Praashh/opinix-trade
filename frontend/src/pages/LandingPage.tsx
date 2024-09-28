const LandingPage = () => {
  return (
    <div className="bg-bg">
      <div className="flex flex-col w-screen h-screen items-center justify-center">
        <div className="text-white font-extralight font-sora text-center">
          Mobile app available. Download now.
        </div>
        <div className="text-white font-sora text-6xl text-center mt-14">
          Trade Your Opinion using <br /> OpiniX
        </div>
        <div className="text-gray font-sora mt-3 w-1/2 text-center">
          Join a dynamic platform where you can predict outcomes, buy and sell
          shares on various events, and profit from your insights. Turn your
          opinions into real value and engage in real-time markets today!
        </div>
      </div>

      <div className="flex p-6">
        <div className="pr-24">
          <div className="text-white text-4xl font-sora">
            Lightning-Fast transactions
          </div>
          <div className="text-gray font-sora mt-3 pr-24">
            Say goodbye to waiting! With instant deposits, you can fund your
            account and start trading immediately.
          </div>
        </div>

        <div className="p-5">
          <div></div>
          <div className="text-white text-2xl font-sora text-center">
            Instant Deposits
          </div>
          <div className="text-gray text-center font-sora">
            Immediate transfer of funds into user's account, allowing them to
            start trading or investing without delay
          </div>
        </div>

        <div className="p-5">
          <div className="text-white text-2xl font-sora text-center">
            Instant Withdrawals
          </div>
          <div className="text-gray text-center font-sora">
            Rapid processing of fund withdrawals, enabling users to access their
            money almost instantly after requesting a transfer.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
