import React from 'react';

const CardTypeSelect = ({ selectedCardType, onCardTypeChange }) => {


  return (
    <select 
      value={selectedCardType} 
      onChange={e => onCardTypeChange(e.target.value)} 
      className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm bg-white focus:ring-indigo-500 focus:border-indigo-500"
    >
     <option value="" disabled selected hidden>Select Card Type</option>
      <option value="DEBIT">Debit</option>
      <option value="CREDIT">Credit</option>
    </select>
  );
};

export default CardTypeSelect;
