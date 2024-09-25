import React from 'react';

const CardMembershipSelect = ({ selectedMembership, onMembershipChange }) => {

 
  return (
    <select 
      value={selectedMembership} 
      onChange={e => onMembershipChange(e.target.value)} 
      className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm bg-white focus:ring-indigo-500 focus:border-indigo-500"
    >
      <option value="" disabled selected hidden>Select Card Membership</option>
      <option value="GOLD">Gold</option>
      <option value="SILVER">Silver</option>
      <option value="TITANIUM">Titanium</option>
    </select>
  );
};

export default CardMembershipSelect;
