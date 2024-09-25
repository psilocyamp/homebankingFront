import React, { useState } from "react";

const formatNumber = (value) => {
  if (!value) return '';
  // Remove any non-numeric characters and convert to a number
  const number = parseFloat(value.replace(/[^0-9.]/g, ''));
  if (isNaN(number)) return '';
  
  // Format the number with comma separators and two decimal places
  return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const InputAmount = ({ name, value, placeholder, onChange, className }) => {
  const [inputValue, setInputValue] = useState(formatNumber(value));

  const handleChange = (e) => {
    const newValue = e.target.value;
    
    // Update the displayed formatted value
    setInputValue(formatNumber(newValue));
    
    // Send the raw numeric value (without formatting) to the parent component
    if (onChange) {
      onChange({
        target: {
          name,
          value: newValue.replace(/[^0-9.]/g, ''), // Clean non-numeric characters for the actual value
        },
      });
    }
  };

  return (
    <label className="relative block mb-4">
      <input
        type="text"
        name={name}
        value={inputValue ? `$ ${inputValue}` : ''}
        placeholder={placeholder}
        onChange={handleChange}
        className={`w-full py-2 px-3 border rounded-md bg-white shadow-sm text-end text-lg ${className}`}
        autoComplete="off"
      />
    </label>
  );
};

export default InputAmount;
