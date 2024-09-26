import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadClient } from '../redux/actions/authenticationAction';
import AccountCard from '../components/AccountCard';
import BannerTitle from '../components/BannerTitle';
import TransactionTable from '../components/TransactionTable';

const AccountDetails = () => {
    const { id } = useParams(); // Get the account ID from the URL
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accounts = useSelector(state => state.authenticationReducer.client.accounts);
    const clientStatus = useSelector(state => state.authenticationReducer.status);
    const error = useSelector(state => state.authenticationReducer.error);

// Despachar la acción para cargar el cliente si el estado es "idle"
useEffect(() => {
    if (clientStatus === "idle") {
        dispatch(loadClient());
    }
}, [dispatch, clientStatus]);

// Encontrar la cuenta específica basada en el ID de la URL
const account = accounts.find(account => account.id === parseInt(id));

if (clientStatus === "loading") {
    return <p className="text-center text-gray-500">Loading account details...</p>;
}

if (clientStatus === "failed") {
    return <p className="text-center text-red-500">Error: {error}</p>;
}

if (!account) {
    return <p className="text-center text-gray-500">Account not found</p>;
}

    return (
        <div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
            <BannerTitle 
                title={`Account Details for ${account.number}`} 
                description="View detailed information about your account, including balance, transactions, and more." 
            />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row lg:space-x-8">
                    <div className="flex-shrink-0 lg:w-1/3">
                        <AccountCard account={account} singleCard />
                    </div>
                    <div className="flex-1 lg:w-2/3 mt-8 lg:mt-0">
                        <TransactionTable transactions={account.transactions} />
                        <div className="mt-8 flex flex-col items-center">
    <p className="text-gray-700 mb-4">Ready to manage your finances? Create a new transaction quickly and easily:</p>
    <button
        onClick={() => navigate('/transactions')}
        className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-600 transition"
    >
        New Transaction
    </button>
</div>

                    </div>
                </div>

                {/* Promotional Section */}
                <div className="mt-16 px-4 py-8 bg-indigo-50 rounded-lg shadow-lg max-w-screen-lg mx-auto">
                    <h2 className="text-3xl font-bold text-indigo-600 mb-8 text-center">Maximize Your Financial Benefits!</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-indigo-200 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold text-indigo-700 mb-4">Exclusive Offers</h3>
                            <p className="text-gray-700">Get access to exclusive banking offers and discounts. Check out our latest promotions!</p>
                        </div>
                        <div className="bg-blue-200 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold text-blue-700 mb-4">Financial Insights</h3>
                            <p className="text-gray-700">Receive personalized financial insights and tips to help you make informed decisions.</p>
                        </div>
                        <div className="bg-indigo-300 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold text-indigo-800 mb-4">Enhanced Security</h3>
                            <p className="text-gray-700">Enjoy enhanced security features to protect your account and personal information.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountDetails;
