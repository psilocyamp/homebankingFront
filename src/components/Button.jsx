import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
  return (
    <Link to={props.to} className="group relative inline-block overflow-hidden border border-[#8b52ff] px-8 py-3 focus:outline-none focus:ring w-[150px]">
      <span className="absolute inset-y-0 left-0 w-[2px] bg-[#8b52ff] transition-all group-hover:w-full group-active:bg-[#8b52ff]"></span>
      <span className="relative text-sm font-medium text-[#8b52ff] transition-colors group-hover:text-white">
        {props.title}
      </span>
    </Link>
  );
};

export default Button;
