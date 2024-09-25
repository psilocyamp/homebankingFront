import React from "react";

const Logo = ({ className }) => {
  return (
    <img
      src="/logo.png"
      alt="Logo"
      className={`h-12 w-auto ${className}`}
    />
  );
};

export default Logo;
