import { MdArrowOutward } from "react-icons/md";
import bgGradient from "../assets/bgGradient.png";
import dashboard from "../assets/dashboard.png";
import transaction from "../assets/transaction.png";
import sports from "../assets/sports.png";
import socialMedia from "../assets/socialMedia.png";
import economy from "../assets/economy.png";
import politics from "../assets/politics.png";
import orderBook from "../assets/orderBook.png";
import graph from "../assets/graph.png";

const LandingPage = () => {
  return (
    <div className="bg-bg">
      {/* Hero Section */}
      <div className="flex flex-col pt-[150px] items-center justify-center w-screen h-screen">
        <div
          className="text-gray font-extralight font-sora text-center px-3 py-1 rounded-full
        shadow-[inset_-10px_-10px_30px_rgba(28,36,76,0.5),_inset_10px_10px_40px_rgba(28,36,76,0.5)]"
        >
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
        <button
          onClick={() => {}}
          className="bg-blue-500 text-white font-semibold rounded-[10px] font-sora px-5 py-3 m-8"
        >
          <span className="flex gap-2">
            Get Started <MdArrowOutward className="text-xl" />
          </span>
        </button>
      </div>

      {/* Image with gradient */}
      <div className="w-screen h-screen">
        <img src={bgGradient} alt="" className="w-full absolute" />
        <div className="relative flex justify-center top-[335px]">
          <div className="p-3 border border-gray rounded-xl inline-block w-[1000px]">
            <img src={dashboard} alt="" className="rounded-xl" />
          </div>
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

        <div
          className="p-5 rounded-xl
        shadow-[inset_-10px_-10px_30px_rgba(28,36,76,0.5),_inset_10px_10px_40px_rgba(28,36,76,0.5)]"
        >
          <div className="flex justify-center mt-5">
            <div className="w-14 h-14 bg-[#101636] rounded-full">
              <img src={transaction} alt="" className="w-10 h-10 mt-2 ml-2" />
            </div>
          </div>

          <div className="text-white text-xl font-sora text-center my-3">
            Instant Deposits
          </div>
          <div className="text-gray text-center text-xs font-sora mb-5">
            Immediate transfer of funds into user's account, allowing them to
            start trading or investing without delay
          </div>
        </div>

        <div
          className="p-5 rounded-xl
        shadow-[inset_-10px_-10px_30px_rgba(28,36,76,0.5),_inset_10px_10px_40px_rgba(28,36,76,0.5)]"
        >
          <div className="flex justify-center mt-5">
            <div className="w-14 h-14 bg-[#101636] rounded-full">
              <img src={transaction} alt="" className="w-10 h-10 mt-2 ml-2" />
            </div>
          </div>

          <div className="text-white text-xl font-sora text-center my-3">
            Instant Withdrawals
          </div>
          <div className="text-gray text-center text-xs font-sora mb-5">
            Rapid processing of fund withdrawals, enabling users to access their
            money almost instantly after requesting a transfer.
          </div>
        </div>
      </div>

      {/* Explore trading oppurtunities */}
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
          <div className="grid grid-cols-2 w-1/2 gap-10 mt-20 ">
            <div
              className="rounded-xl  p-10
            shadow-[inset_-10px_-10px_30px_rgba(28,36,76,0.5),_inset_10px_10px_40px_rgba(28,36,76,0.5)]"
            >
              <div className="text-white text-2xl font-sora my-5">Sports</div>
              <div className="text-gray font-sora text-xs mb-10">
                Trade on your predictions for major sporting events, from team
                performances to individual athlete achievements.
              </div>
              <div>
                <img src={sports} alt="" className="h-52 w-52 mb-5" />
              </div>
            </div>

            <div
              className="rounded-xl p-10
            shadow-[inset_-10px_-10px_30px_rgba(28,36,76,0.5),_inset_10px_10px_40px_rgba(28,36,76,0.5)]"
            >
              <div className="text-white text-2xl font-sora my-5 ml-5">
                Entertainment
              </div>
              <div className="text-gray font-sora text-xs mb-10">
                Predict outcomes in the world of TV, movies, and celebrity
                trends as they unfold in real time.
              </div>
              <div>
                <img src={socialMedia} alt="" className="h-52 w-52 mb-5 ml-5" />
              </div>
            </div>

            <div
              className="rounded-xl  p-10
            shadow-[inset_-10px_-10px_30px_rgba(28,36,76,0.5),_inset_10px_10px_40px_rgba(28,36,76,0.5)]"
            >
              <div className="text-white text-2xl font-sora my-5">Economy</div>
              <div className="text-gray font-sora text-xs mb-10">
                Make informed trades based on key economic indicators, financial
                trends, and market movements shaping the global landscape.
              </div>
              <div>
                <img src={economy} alt="" className="h-52 w-52 mb-5" />
              </div>
            </div>

            <div
              className="rounded-xl p-10
            shadow-[inset_-10px_-10px_30px_rgba(28,36,76,0.5),_inset_10px_10px_40px_rgba(28,36,76,0.5)]"
            >
              <div className="text-white text-2xl font-sora my-5">Politics</div>
              <div className="text-gray font-sora text-xs mb-10">
                Engage in markets centered around political events, elections,
                and policy developments worldwide.
              </div>
              <div>
                <img src={politics} alt="" className="h-52 w-52 mb-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Explore trading oppurtunities */}
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
          <div className="grid grid-cols-2 w-1/2 gap-10 mt-20 ">
            <div
              className="rounded-xl  p-10
            shadow-[inset_-10px_-10px_30px_rgba(28,36,76,0.5),_inset_10px_10px_40px_rgba(28,36,76,0.5)]"
            >
              <img src={orderBook} alt="" className="h-52 w-52 mb-5" />
            </div>

            <div>
              <div className="text-white text-2xl font-sora my-5 mt-10">
                Orderbook
              </div>
              <div className="text-gray font-sora text-xs mb-10">
                A real-time display of all buy and sell orders, providing
                transparency into market activity and liquidity.
              </div>
              <div>
                <button
                  onClick={() => {}}
                  className="bg-blue-500 text-white font-semibold rounded-[10px] font-sora px-5 py-3"
                >
                  <span className="flex gap-2">
                    Learn more <MdArrowOutward className="text-xl" />
                  </span>
                </button>
              </div>
            </div>

            <div>
              <div className="text-white text-2xl font-sora my-5 mt-10">
                Probability Graph
              </div>
              <div className="text-gray font-sora text-xs mb-10">
                A visual representation of changing probabilities over time,
                helping you track and analyze trends in event outcomes.
              </div>
              <div>
                <button
                  onClick={() => {}}
                  className="bg-blue-500 text-white font-semibold rounded-[10px] font-sora px-5 py-3"
                >
                  <span className="flex gap-2">
                    Learn more <MdArrowOutward className="text-xl" />
                  </span>
                </button>
              </div>
            </div>

            <div
              className="rounded-xl  p-10
            shadow-[inset_-10px_-10px_30px_rgba(28,36,76,0.5),_inset_10px_10px_40px_rgba(28,36,76,0.5)]"
            >
              <img src={graph} alt="" className="h-52 w-52 mb-5" />
            </div>
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
          <div className="border-2 border-white mt-10 rounded-[30px] ">
            <div className="text-white font-gray font-sora py-10 px-5">
              "I love using this platform! The user interface is intuitive, and
              the real-time updates keep me engaged. The advanced tools,
              especially the Probability Graph, have significantly improved my
              trading strategies. Highly recommend it to anyone serious about
              trading!"
            </div>

            <div className="flex justify-between">
              <div>
                <div className="text-white font-gray font-sora px-5 mt-2">
                  Sarah Taranian
                </div>
                <div className="text-gray font-gray font-sora px-5">
                  Creative Director
                </div>
              </div>

              <div>
                <img src={sports} alt="" className="h-20 w-20 rounded-[20px]" />
              </div>
            </div>
          </div>

          <div className="border-2 border-white mt-10 rounded-[30px] ">
            <div className="text-white font-gray font-sora py-10 px-5">
              "I love using this platform! The user interface is intuitive, and
              the real-time updates keep me engaged. The advanced tools,
              especially the Probability Graph, have significantly improved my
              trading strategies. Highly recommend it to anyone serious about
              trading!"
            </div>

            <div className="flex justify-between">
              <div>
                <div className="text-white font-gray font-sora px-5 mt-2">
                  Sarah Taranian
                </div>
                <div className="text-gray font-gray font-sora px-5">
                  Creative Director
                </div>
              </div>

              <div>
                <img src={sports} alt="" className="h-20 w-20 rounded-[20px]" />
              </div>
            </div>
          </div>

          <div className="border-2 border-white mt-10 rounded-[30px] ">
            <div className="text-white font-gray font-sora py-10 px-5">
              "I love using this platform! The user interface is intuitive, and
              the real-time updates keep me engaged. The advanced tools,
              especially the Probability Graph, have significantly improved my
              trading strategies. Highly recommend it to anyone serious about
              trading!"
            </div>

            <div className="flex justify-between">
              <div>
                <div className="text-white font-gray font-sora px-5 mt-2">
                  Sarah Taranian
                </div>
                <div className="text-gray font-gray font-sora px-5">
                  Creative Director
                </div>
              </div>

              <div>
                <img src={sports} alt="" className="h-20 w-20 rounded-[20px]" />
              </div>
            </div>
          </div>

          <div className="border-2 border-white mt-10 rounded-[30px] ">
            <div className="text-white font-gray font-sora py-10 px-5">
              "I love using this platform! The user interface is intuitive, and
              the real-time updates keep me engaged. The advanced tools,
              especially the Probability Graph, have significantly improved my
              trading strategies. Highly recommend it to anyone serious about
              trading!"
            </div>

            <div className="flex justify-between">
              <div>
                <div className="text-white font-gray font-sora px-5 mt-2">
                  Sarah Taranian
                </div>
                <div className="text-gray font-gray font-sora px-5">
                  Creative Director
                </div>
              </div>

              <div>
                <img src={sports} alt="" className="h-20 w-20 rounded-[20px]" />
              </div>
            </div>
          </div>

          <div className="border-2 border-white mt-10 rounded-[30px] ">
            <div className="text-white font-gray font-sora py-10 px-5">
              "I love using this platform! The user interface is intuitive, and
              the real-time updates keep me engaged. The advanced tools,
              especially the Probability Graph, have significantly improved my
              trading strategies. Highly recommend it to anyone serious about
              trading!"
            </div>

            <div className="flex justify-between">
              <div>
                <div className="text-white font-gray font-sora px-5 mt-2">
                  Sarah Taranian
                </div>
                <div className="text-gray font-gray font-sora px-5">
                  Creative Director
                </div>
              </div>

              <div>
                <img src={sports} alt="" className="h-20 w-20 rounded-[20px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;














