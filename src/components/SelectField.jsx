import React from "react";

const SelectField = ({ options = [], placeholder, value, onChange }) => {
  if (!Array.isArray(options)) {
    console.error("Invalid options prop: Expected an array.");
    return null; // No renderizar el select si options no es un array
  }

  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="mt-1 p-3 border rounded w-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" disabled selected hidden>{placeholder}</option>
        {options.length > 0 ? (
          options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))
        ) : (
          <option disabled>No options available</option>
        )}
      </select>
    </div>
  );
};

export default SelectField;
