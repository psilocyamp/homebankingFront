import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const AccountCard = ({ singleCard = false, account }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        if (account && account.id) {
            navigate(`/accounts/${account.id}`);
        }
    };

    const formattedDate = date => new Date(date).toLocaleDateString();

    const formatNumberWithCommas = (num) => {
        if (!num) return '';
        const parts = num.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    };
    const cardClassName = `
        w-full max-w-xs lg:max-w-md xl:max-w-lg 
        bg-white rounded-lg shadow-lg 
        hover:shadow-xl transition-shadow 
        cursor-pointer
        border-l-4 ${singleCard ? 'border-blue-500' : 'border-indigo-500'}
        hover:bg-blue-50
    `;

    const contentClassName = `
        p-6
        flex flex-col justify-between
        h-full
    `;

    return (
        <article
            className={cardClassName}
            onClick={handleCardClick}
        >
            <div className={contentClassName}>
                <time dateTime={account.creationDate} className="block text-xs text-gray-500">
                    {formattedDate(account.creationDate)}
                </time>
                <h3 className="mt-2 text-lg font-bold text-gray-900">
                    Account Number: {account.number}
                </h3>
                <p className="text-md font-semibold text-gray-700 mt-1">
                    Amount: ${typeof account.balance === 'number' ? formatNumberWithCommas(account.balance.toFixed(2)) : 'N/A'}
                </p>
                <div className="mt-4 border-t border-gray-200 pt-4 text-gray-500 text-sm">
                    Created on: {formattedDate(account.creationDate)} 
                </div>
            </div>
        </article>
    );
};

// Define PropTypes
AccountCard.propTypes = {
    singleCard: PropTypes.bool,
    accountId: PropTypes.number, // Ahora pasamos solo el ID de la cuenta
};

export default AccountCard;
