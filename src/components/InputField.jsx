import React from 'react';

const InputField = ({ type, placeholder,value, onChange, icon }) => {
  return (
    <div className="relative">
      <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="mt-1 p-3 border rounded w-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
      {icon && (
        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icon}
          </svg>
        </span>
      )}
    </div>
  );
};

export default InputField;
