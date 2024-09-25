import React from "react";

const OutIcon = ({ src, className, onClick }) => {
  return (
    <img
      src={src}
      alt="Logout"
      className={className}
      onClick={onClick}
      style={{ cursor: 'pointer' }} 
    />
  );
};

export default OutIcon;
