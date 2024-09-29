import React from "react";
import {
  HeroSection,
  TransactionInfo,
  TradingOpportunity,
  TradingTool,
  CustomerReview,
  Footer,
  LandingNavbar,
} from "../components/LandingPageComps";
import bgGradient from "../assets/image.svg";
import dashboard from "../assets/dashboard.png";
import transaction from "../assets/transaction.png";
import sports from "../assets/sports.png";
import socialMedia from "../assets/socialMedia.png";
import economy from "../assets/economy.png";
import politics from "../assets/politics.png";
import orderBook from "../assets/orderBook.png";
import graph from "../assets/graph.png";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-bg">
      <LandingNavbar />
      <HeroSection />

      {/* <div className="relative flex justify-center items-center ">
        <img
          src={bgGradient}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="relative z-10 p-6 border border-gray shadow-xl rounded-2xl w-[70%]">
          <img
            src={dashboard}
            alt="dashboard"
            className="rounded-xl w-full h-auto"
          />
        </div>
      </div> */}

<div className="relative flex justify-center items-center ">
        <img
          src={bgGradient}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="relative z-10 p-6 border border-gray shadow-xl rounded-2xl w-[70%]">
          <img
            src={dashboard}
            alt="dashboard"
            className="rounded-xl w-full h-auto"
          />
        </div>
      </div>




      {/* Transactions info */}
      <div className="flex p-6 mt-52 gap-20">
        <div className="pr-10 mt-5">
          <div className="text-white text-4xl font-sora">
            Lightning-Fast transactions
          </div>
          <div className="text-gray font-sora mt-3 pr-24">
            Say goodbye to waiting! With instant deposits, you can fund your
            account and start trading immediately.
          </div>
        </div>
        <TransactionInfo
          icon={transaction}
          title="Instant Deposits"
          description="Immediate transfer of funds into user's account, allowing them to start trading or investing without delay"
        />
        <TransactionInfo
          icon={transaction}
          title="Instant Withdrawals"
          description="Rapid processing of fund withdrawals, enabling users to access their money almost instantly after requesting a transfer."
        />
      </div>

      {/* Explore trading opportunities */}
      <div className="mt-20 w-screen">
        <div className="flex justify-center">
          <div className="text-white font-sora text-5xl text-center mt-14 w-1/2 ">
            Explore a World of Trading Opportunities
          </div>
        </div>
        <div className="flex justify-center">
          <div className="text-gray font-sora text-sm text-center mt-4 w-1/2 ">
            Whether you're into sports, politics, or global events, we have the
            perfect market for you to trade and win. Dive in and trade where
            your knowledge thrives!
          </div>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-2 px-52 gap-10 mt-20 ">
            <TradingOpportunity
              title="Sports"
              description="Trade on your predictions for major sporting events, from team performances to individual athlete achievements."
              image={sports}
            />
            <TradingOpportunity
              title="Entertainment"
              description="Predict outcomes in the world of TV, movies, and celebrity trends as they unfold in real time."
              image={socialMedia}
            />
            <TradingOpportunity
              title="Economy"
              description="Make informed trades based on key economic indicators, financial trends, and market movements shaping the global landscape."
              image={economy}
            />
            <TradingOpportunity
              title="Politics"
              description="Engage in markets centered around political events, elections, and policy developments worldwide."
              image={politics}
            />
          </div>
        </div>
      </div>

      {/* Maximize Your Trading Success */}
      <div className="mt-20 w-screen">
        <div className="flex justify-center">
          <div className="text-white font-sora text-5xl text-center mt-14 w-1/2 ">
            Maximize Your Trading Success with Cutting-Edge Tools!
          </div>
        </div>
        <div className="flex justify-center">
          <div className="text-gray font-sora text-sm text-center mt-4 w-1/2 ">
            Elevate your trading game with our powerful Orderbook and
            Probability Graph.
          </div>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-2 px-52 gap-10 mt-20 ">
            <TradingTool
              title="Orderbook"
              description="A real-time display of all buy and sell orders, providing transparency into market activity and liquidity."
              image={orderBook}
              isReversed={false}
            />
            <TradingTool
              title="Probability Graph"
              description="A visual representation of changing probabilities over time, helping you track and analyze trends in event outcomes."
              image={graph}
              isReversed={true}
            />
          </div>
        </div>
      </div>

      {/* Customer reviews */}
      <div className="mt-20 w-screen">
        <div className="flex justify-center">
          <div className="text-white font-sora text-5xl text-center mt-14 w-1/2 ">
            Trusted by 14,000+ users
          </div>
        </div>
        <div className="flex justify-center">
          <div className="text-gray font-sora text-sm text-center mt-4 w-1/2 ">
            Sharing Their Trading Experiences
          </div>
        </div>
        <div className="grid grid-cols-3 gap-10 px-32">
          {[...Array(5)].map((_, index) => (
            <CustomerReview
              key={index}
              review="I love using this platform! The user interface is intuitive, and the real-time updates keep me engaged. The advanced tools, especially the Probability Graph, have significantly improved my trading strategies. Highly recommend it to anyone serious about trading!"
              name="Sarah Taranian"
              position="Creative Director"
              image={sports}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
