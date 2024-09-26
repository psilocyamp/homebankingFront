import { BrowserRouter, Route, Routes } from "react-router-dom";
import Accounts from "./pages/Accounts";
import AccountDetails from './pages/AccountDetails';
import { Navigate } from 'react-router-dom';
import Cards from "./pages/Cards";
import Loans from "./pages/Loans";
import Transactions from "./pages/Transactions";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import ApplyCard from "./pages/ApplyCard";


import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/login" replace />} />
                      <Route path="/accounts" element={<Accounts />} />
            <Route path="/accounts/:id" element={<AccountDetails />} />
            <Route path="/cards" element={<Cards />}></Route>
            <Route path="/loans" element={<Loans/>}></Route>
            <Route path="/transactions" element={<Transactions/>}></Route>
            <Route path="/applycard" element={<ApplyCard/>} />
          </Route>
          <Route path="/signup" element={<SignUp/>} ></Route>
        <Route path="/login" element={<LogIn/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;