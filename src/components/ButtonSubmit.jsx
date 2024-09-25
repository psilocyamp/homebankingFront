import React from 'react';

const ButtonSubmit = ({ label, onClick }) => {
  return (
    <button
      type="submit"
      className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
      onClick={onClick}
    >
  
      {label}
    </button>
  );
};

export default ButtonSubmit;
