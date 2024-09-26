import React from 'react';
import PropTypes from 'prop-types';

export default function LoanCard({ singleLoan, loan }) {

  const formattedDate = (date) => new Date(date).toLocaleDateString();

  const cardClassName = `
    w-full max-w-xs lg:max-w-md xl:max-w-lg 
    bg-white rounded-lg shadow-lg 
    hover:shadow-xl transition-shadow 
    cursor-pointer
    border-l-4 ${singleLoan ? 'border-green-500' : 'border-indigo-500'}
    hover:bg-green-50
  `;

  const contentClassName = `
    p-6
    flex flex-col justify-between
    h-full
  `;
  const formattedAmount = loan.amount?.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <article
      className={cardClassName}
    >
      <div className={contentClassName}>

        <h3 className="mt-2 text-lg font-bold text-gray-900">
          {loan.name}
        </h3>
        <p className="text-md font-semibold text-gray-700 mt-1">
          Loan Amount: ${formattedAmount}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Installments: {loan.payments}
        </p>
      </div>
    </article>
  );
}

LoanCard.propTypes = {
  singleLoan: PropTypes.bool,
  loan: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    payments: PropTypes.number.isRequired,
  }).isRequired,
};

LoanCard.defaultProps = {
  singleLoan: false,
};