import React from 'react';

export const formatNumberWithCommas = (num) => {
  if (!num) return '';
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas
  return parts.join('.');
};

export const cleanNumber = (num) => {
  return num.replace(/,/g, '').replace(/ /g, '');
};


const TransactionTable = (props) => {
  return (
    <div className="w-full max-w-2xl p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Transaction Summary</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-indigo-200 text-indigo-700">
            <th className="p-2 border-b-2">Type</th>
            <th className="p-2 border-b-2">Amount</th>
            <th className="p-2 border-b-2">Date</th>
            <th className="p-2 border-b-2">Hour</th>
            <th className="p-2 border-b-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.transactions.map(transaction => (
               <tr key={transaction.id} className="hover:bg-blue-50">
               <td className="p-2 border-b text-gray-700">{transaction.type}</td>
               <td className="p-2 border-b text-gray-700">${formatNumberWithCommas(transaction.amount.toFixed(2))}</td>
               <td className="p-2 border-b text-gray-700">{transaction.date.slice(0, 10)}</td>
               <td className="p-2 border-b text-gray-700">{transaction.date.slice(11, 16)}</td>
               <td className="p-2 border-b text-gray-700">{transaction.description || 'N/A'}</td>
             </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
