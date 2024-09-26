import React from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import BannerTitle from "../components/BannerTitle";
import AccountData from "../components/AccountData";
import AccountCard from "../components/AccountCard";
import { useDispatch, useSelector } from "react-redux";
import { loadClient } from '../redux/actions/authenticationAction';
import ConfirmationModal from "../components/ConfirmationModal"; 
import axios from "axios";


const Accounts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const client = useSelector(state => state.authenticationReducer.client);
  console.log(client);
  
  const token = useSelector(state => state.authenticationReducer.token);

  const [isModalOpen, setIsModalOpen] = useState(false);

useEffect(() => {
  if (!client.id && token) {
    // If client data is not loaded but token is available, dispatch loadClient action
    dispatch(loadClient());
  }
}, [client.id, token, dispatch]);

const handleRequestNewAccount = () => {
  // Abre el modal al hacer clic en el botón
   if (client.accounts.length >= 3) {
      alert("You have reached the maximum limit of 3 accounts.");
    } else {
      // Abre el modal al hacer clic en el botón
      setIsModalOpen(true);
    }}

const handleConfirm = async () => {
 
  axios
    .post(
      "https://homebanking-42y9.onrender.com/api/clients/current/accounts",
      null,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    )
    .then((response) => {
      console.log(response.data);
      dispatch(loadClient());
      setIsModalOpen(false); // Cierra el modal
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};


  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
      {/* Banner Section */}
      <BannerTitle
        title={`Welcome ${client.firstName}`}
        title2="to your Accounts"
        description="Manage and review all your accounts effortlessly. Check balances, review transactions, and more—all at your fingertips. Enjoy a sleek, user-friendly interface designed for your busy lifestyle. Stay on top of your financial health with ease."
      />
      
      <div className="container mx-auto px-4 py-8">
        <header className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Your Accounts</h2>
          <button
            onClick={handleRequestNewAccount}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
             
          >
            Request New Account
          </button> 
        </header>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {client.accounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
            />
          ))}
        </div>

        {/* Account Data Section */}
        <div className="mt-8">
          <AccountData />
        </div>

        <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="Confirm New Account Request"
        details={[{ label: "Are you sure you want to request a new account?", value: "" }]} // Puedes personalizar los detalles si lo deseas
      />
        

        {/* Promotional Section: Benefits of Opening an Account */}
        <div className="mt-16 px-4 py-8 bg-white rounded-lg shadow-lg max-w-screen-lg mx-auto">
          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-12">Why Open a New Account with Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-indigo-200 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-indigo-700 mb-4">Easy Access</h3>
              <p className="text-gray-700">Manage your account anytime, anywhere with our mobile app. Stay connected to your finances on the go!</p>
            </div>
            <div className="bg-blue-200 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-blue-700 mb-4">Low Fees</h3>
              <p className="text-gray-700">Enjoy competitive fees with our student and youth accounts, designed to keep more money in your pocket.</p>
            </div>
            <div className="bg-indigo-300 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-indigo-800 mb-4">Custom Alerts</h3>
              <p className="text-gray-700">Set up personalized alerts to stay informed about your account activity and never miss a beat.</p>
            </div>
            <div className="bg-blue-300 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-blue-800 mb-4">Rewards Program</h3>
              <p className="text-gray-700">Earn points for every purchase you make with your debit card and redeem them for exciting rewards.</p>
            </div>
            <div className="bg-indigo-400 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Financial Tips</h3>
              <p className="text-gray-700">Get exclusive access to our financial literacy content, helping you make informed decisions with your money.</p>
            </div>
            <div className="bg-blue-400 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-4">24/7 Support</h3>
              <p className="text-gray-700">Our customer support team is always here to help, no matter the time of day.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
