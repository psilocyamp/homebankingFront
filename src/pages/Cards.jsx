import React from "react";
import CardData from "../components/CardData";
import BannerTitle from "../components/BannerTitle";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadClient } from '../redux/actions/authenticationAction';



const Cards = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadClient());
  }, [dispatch]);

  return (
    <>
      {/* Banner Section */}
      <BannerTitle
        title="Manage Your Cards With Move"
        title2="All Your Cards Together"
        description="Keep track of all your debit and credit cards effortlessly. Our intuitive interface allows you to view balances, recent transactions, and manage your card settings with just a few clicks. Enjoy the convenience of having all your financial tools at your fingertips, ensuring you stay in control of your finances anytime, anywhere."
      />
<div className="p-6 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen flex flex-col items-center">
      {/* Credit Cards Section */}
      <h1 className="text-3xl font-bold text-gray-800">Your Cards</h1>
      <div className="mt-8 w-full flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-4">Credit Cards</h3>
        <div className="w-full max-w-screen-lg">
          <CardData cardType="CREDIT" />
        </div>
      </div>

      {/* Debit Cards Section */}
      <div className="mt-8 w-full flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-4">Debit Cards</h3>
        <div className="w-full max-w-screen-lg">
          <CardData cardType="DEBIT" />
        </div>
      </div>

      {/* Apply for a New Card Button */}
      <div className="mt-8 flex justify-center">
        <Link to="/applycard">
          <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">
            Apply for a New Card
          </button>
        </Link>
      </div>

      {/* Promotional Section: Benefits of Using Our Cards */}
      <div className="max-w-screen-lg mx-auto mt-16 px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-12">Exclusive Benefits of Using Our Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-indigo-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-indigo-600 mb-4">Cashback Rewards</h3>
            <p className="text-gray-700">Earn up to 5% cashback on every purchase you make with our credit cards.</p>
          </div>
          <div className="bg-indigo-200 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-indigo-600 mb-4">Low Interest Rates</h3>
            <p className="text-gray-700">Enjoy some of the lowest interest rates on the market, keeping your finances in check.</p>
          </div>
          <div className="bg-indigo-300 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-indigo-600 mb-4">Exclusive Discounts</h3>
            <p className="text-gray-700">Get access to exclusive discounts and offers at your favorite stores.</p>
          </div>
          <div className="bg-indigo-400 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-indigo-600 mb-4">Travel Perks</h3>
            <p className="text-gray-700">Benefit from complimentary travel insurance and airport lounge access worldwide.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Cards;
