import React from "react";
import Button from "./Button";
import OutIcon from "./OutIcon";
import Logo from "./Logo";
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between bg-gray-100 px-4 py-4 md:py-6">
      <div className="flex items-center md:flex-shrink-0">
        <Logo className="h-20 w-auto md:h-16" /> 
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center md:space-x-6 flex-grow mt-4 md:mt-0 md:justify-center">
        <Button title="Accounts" to="/accounts" className="text-xs md:text-sm px-4 py-2 md:px-6 md:py-2.5" />
        <Button title="Cards" to="/cards" className="text-xs md:text-sm px-4 py-2 md:px-6 md:py-2.5" />
        <Button title="Loans" to="/loans" className="text-xs md:text-sm px-4 py-2 md:px-6 md:py-2.5" />
        <Button title="Transactions" to="/transactions" className="text-xs md:text-sm px-4 py-2 md:px-6 md:py-2.5" />
      </div>
      
      <Link  to ="/login">
      <div className="flex items-center mt-4 md:mt-0 md:ml-4">
        <OutIcon src="/outbutton.png" onClick={() => {localStorage.removeItem("token")}} className="h-8 w-8 md:h-10 md:w-10" />
      </div>
      </Link>
    </header>
  );
};

export default Header;
