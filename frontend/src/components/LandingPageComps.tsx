import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import bgGradient from "../assets/image.svg";
import { useState } from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

interface TransactionInfoProps {
  icon: string;
  title: string;
  description: string;
}

interface TradingOpportunityProps {
  title: string;
  description: string;
  image: string;
}

interface TradingToolProps {
  title: string;
  description: string;
  image: string;
  isReversed: boolean;
}

interface CustomerReviewProps {
  review: string;
  name: string;
  position: string;
  image: string;
}

export const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full h-24 bg-[#05071A] p-5 flex justify-between items-center">
      {/* OpinioX Logo */}
      <div className="text-white font-sora font-semibold text-4xl">OpinioX</div>

      {/* Mobile Menu Toggle */}
      <div className="sm:hidden">
        <button onClick={toggleDropdown} className="text-white text-3xl">
          {isOpen ? " ☰ " : " ☰ "} {/* Simple toggle icon */}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center space-x-4 pr-10">
        <div className="text-gray font-sora">Features</div>
        <div className="text-gray font-sora">Reviews</div>
        <div className="text-gray font-sora">FAQ's</div>
        {/* Sign Up Button */}
        <button className="w-[160px] h-[40px] bg-gradient-to-r from-[#212635] to-[#191B25] rounded font-sora font-semibold text-md text-white">
          SIGN UP
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-24 left-0 w-full bg-[#05071A] p-5 flex flex-col space-y-2 md:hidden">
          <div className="text-gray font-sora">Features</div>
          <div className="text-gray font-sora">Reviews</div>
          <div className="text-gray font-sora">FAQ's</div>
          {/* Sign Up Button */}
          <button className="w-[160px] h-[40px] bg-gradient-to-r from-[#212635] to-[#191B25] rounded font-sora font-semibold text-md text-white">
            SIGN UP
          </button>
        </div>
      )}
    </div>
  );
};

export const HeroSection: React.FC = () => (
  <div className="flex flex-col items-center justify-center">
        <div
          className="text-gray font-extralight font-sora text-center px-3 py-1 rounded-full
        shadow-[inset_-10px_-10px_30px_rgba(28,36,76,0.5),_inset_10px_10px_40px_rgba(28,36,76,0.5)]"
        >
          Mobile app available. Download now.
        </div>
        <div className="text-white font-sora text-7xl text-center mt-14">
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
);


export const Button: React.FC<ButtonProps> = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="bg-blue-500 text-white font-semibold rounded-[10px] font-sora px-5 py-3 m-8"
  >
    <span className="flex gap-2">
      {text} <MdArrowOutward className="text-xl" />
    </span>
  </button>
);

export const TransactionInfo: React.FC<TransactionInfoProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="p-5 rounded-xl shadow-[inset_-10px_-10px_30px_rgba(28,36,76,0.5),_inset_10px_10px_40px_rgba(28,36,76,0.5)]">
    <div className="flex justify-center items-center mt-5 ">
      <div className="w-14 h-14 bg-[#101636] rounded-full">
        <img src={icon} alt="" className="w-10 h-10 mt-2 ml-2" />
      </div>
    </div>
    <div className="text-white text-xl font-sora text-center my-3">{title}</div>
    <div className="text-gray text-center text-xs font-sora mb-5">
      {description}
    </div>
  </div>
);

export const TradingOpportunity: React.FC<TradingOpportunityProps> = ({
  title,
  description,
  image,
}) => (
  <div className="rounded-xl p-10 px-14 shadow-[inset_-10px_-10px_30px_rgba(28,36,76,0.5),_inset_10px_10px_40px_rgba(28,36,76,0.5)]">
    <div className="text-white text-3xl font-sora my-5">{title}</div>
    <div className="text-gray font-sora text-sm mb-10">{description}</div>
    <div className="flex justify-center items-center">
      <img src={image} alt="" className="h-64 w-64 mb-5" />
    </div>
  </div>
);

export const TradingTool: React.FC<TradingToolProps> = ({
  title,
  description,
  image,
  isReversed,
}) => (
  <>
    {isReversed ? (
      <>
        <div>
          <div className="text-white text-3xl font-sora my-5 mt-10">
            {title}
          </div>
          <div className="text-gray font-sora text-sm mb-10">{description}</div>
          <button
            onClick={() => {}}
            className="bg-blue-500 text-white font-semibold rounded-[10px] font-sora px-5 py-3"
          >
            <span className="flex gap-2">
              Learn More <MdArrowOutward className="text-xl" />
            </span>
          </button>
        </div>
        <div className="rounded-xl p-10 shadow-[inset_-10px_-10px_30px_rgba(28,36,76,0.5),_inset_10px_10px_40px_rgba(28,36,76,0.5)]">
          <div className="flex justify-center items-center">
            <img src={image} alt="" className="h-52 w-52" />
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="rounded-xl p-10 shadow-[inset_-10px_-10px_30px_rgba(28,36,76,0.5),_inset_10px_10px_40px_rgba(28,36,76,0.5)]">
          <div className="flex justify-center items-center">
            <img src={image} alt="" className="h-52 w-52 mb-5" />
          </div>
        </div>
        <div>
          <div className="text-white text-3xl font-sora my-5 mt-10">
            {title}
          </div>
          <div className="text-gray font-sora text-sm mb-10">{description}</div>

          <button
            onClick={() => {}}
            className="bg-blue-500 text-white font-semibold rounded-[10px] font-sora px-5 py-3"
          >
            <span className="flex gap-2">
              Learn More <MdArrowOutward className="text-xl" />
            </span>
          </button>
        </div>
      </>
    )}
  </>
);

export const CustomerReview: React.FC<CustomerReviewProps> = ({
  review,
  name,
  position,
  image,
}) => (
  <div className="border-2 border-white mt-10 rounded-[30px]">
    <div className="text-white font-gray font-sora py-10 px-5">{review}</div>
    <div className="flex justify-between">
      <div>
        <div className="text-white font-gray font-sora px-5 mt-2">{name}</div>
        <div className="text-gray font-gray font-sora px-5">{position}</div>
      </div>
      <div>
        <img src={image} alt="" className="h-20 w-20 rounded-[20px]" />
      </div>
    </div>
  </div>
);

export const Footer = () => {
  return (
    <div
      className="relative px-4 sm:px-8 md:px-20 mt-10 sm:mt-16 md:mt-20 pb-10 sm:pb-16 md:pb-20 bg-cover bg-top"
      style={{ backgroundImage: `url(${bgGradient}),` }}
    >
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10 items-center sm:items-start">
        <div className="text-white font-sora text-xl sm:text-2xl">OpinioX</div>
        <div className="hidden sm:block h-8 w-0.5 bg-white"></div>
        <div className="text-gray font-sora text-sm text-center sm:text-left sm:mt-2">
          Trade your opinion using OpiniX
        </div>
      </div>
      
      <div className="w-full h-0.5 bg-gray mt-6 sm:mt-8 md:mt-10"></div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 sm:gap-0 pt-6 sm:pt-5">
        <div className="text-center sm:text-left">
          <div className="text-gray font-sora text-xs sm:text-sm">
            Copyright 2024 OpinioX.
          </div>
          <div className="text-gray font-sora text-xs sm:text-sm">
            All Rights Reserved.
          </div>
        </div>
        <div className="flex gap-6 sm:gap-8 md:gap-10">
          <CiFacebook className="text-white h-5 w-5" />
          <FaInstagram className="text-white h-5 w-5" />
          <BsTwitterX className="text-white h-5 w-5" />
          <FaLinkedin className="text-white h-5 w-5" />
        </div>
      </div>
    </div>
  );
};