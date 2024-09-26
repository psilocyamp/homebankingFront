import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import ButtonSubmit from '../components/ButtonSubmit';
import ConfirmationModal from "../components/ConfirmationModal"; 
import { loadClient } from "../redux/actions/authenticationAction";


const Transaction = () => {
  const [isOwnDestination, setIsOwnDestination] = useState(true);
  const [sourceAccount, setSourceAccount] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [destinationAccount, setDestinationAccount] = useState('');
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");


  const [errorMessage, setErrorMessage] = useState(""); 
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const dispatch = useDispatch();
  const client = useSelector((state) => state.authenticationReducer.client);
  // console.log(client);

  useEffect(() => {
    if(client.firstName == ""){
    dispatch(loadClient());
    }
    
  },[client.firstName, dispatch]);

  useEffect(() => {
    if (client.accounts>0) {
      setAccounts(client.accounts || []); 
    }
  }, [client]);

  const handleDestinationChange = (destinationType) => {
    setIsOwnDestination(destinationType === "own");
    setDestinationAccount("");
  };

  const handleFormSubmit = (event) => {
    if(event){
      event.preventDefault();
    }

    if (!sourceAccount) {
      setErrorMessage("Please select a source account.");
      return;
    }
    if (isOwnDestination && !destinationAccount) {
      setErrorMessage("Please select a destination account.");
      return;
    }
    if(sourceAccount == destinationAccount) {
      setErrorMessage("Source and destination accounts cannot be the same.");
      return;
    }
    if (!amount || amount <= 0) {
      setErrorMessage("Please enter a valid amount.");
      return;
    }
    if (!description) {
      setErrorMessage("Please enter a description.");
      return;
    }
    if(client.accounts.find((account) => account.number == sourceAccount).balance < amount) { 
        setErrorMessage("Insufficient funds in the selected account.");
        return;
    }
    console.log("entro al handleFormSubmit");
    
    setIsModalOpen(true);
    setErrorMessage("");
  }
  const handleConfirm = () => {
    const transactionData = {
      sourceAccount: sourceAccount,
      destinationAccount: destinationAccount,
      amount,
      description,
    };
    console.log(transactionData);
  axios
  .post("https://homebanking-42y9.onrender.com/api/transactions", transactionData,
   {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })
  .then((response) => {
  console.log(response.data);
  setSuccessMessage("Transaction successful!");
  setSourceAccount("");
  setDestinationAccount("");
  setAmount("");
  setDescription("");
  })
  .catch((error) => {
    setIsModalOpen(false);
  console.error("Error fetching data:", error);
  setErrorMessage("An error occurred. Please try again.");
  });

    setErrorMessage("");
    setSuccessMessage("");
  
  };


  return (
    <div className='bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen'>
      {/* Header Section */}
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-gray-800">Make a Transaction</h1>
        <p className="text-lg text-gray-600 mt-2">Complete the form below to process your transaction quickly and easily.</p>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <FormContainer onSubmit={handleFormSubmit}
            title="Transaction Form"
            description="Select the source account, destination type, and enter the amount and description."
          >
             {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm mb-4">{successMessage}</p>
            )}
            
              {/* Botones para elegir el tipo de destino */}
              <div className="flex justify-center mb-4">
                <button
                  type="button"
                  className={`px-4 py-2 mr-2 rounded ${isOwnDestination ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                  onClick={() => handleDestinationChange('own')}
                >
                  Transfer to Own Account
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded ${!isOwnDestination ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                  onClick={() => handleDestinationChange('external')}
                >
                  Transfer to External Account
                </button>
              </div>

              <SelectField
                options={client.accounts?.map((account) => ({
                  label: account.number,
                  value: account.number,
                }))}
                placeholder="Select Source Account"
                value={sourceAccount}
                onChange={(e) => setSourceAccount(e.target.value)}
                className="mb-4"
              />

              {isOwnDestination ? (
                <SelectField
                  options={client.accounts?.filter(accounts =>accounts.number !== sourceAccount).map((account) => ({
                    label: account.number,
                    value: account.number,
                  }))}
                  placeholder="Select Destination Account"
                  value={destinationAccount}
                  onChange={(e) => setDestinationAccount(e.target.value)}
                  className="mb-4"
                />
              ) : (
                <InputField
                  type="text"
                  placeholder="Enter CVU or Alias"
                  value={destinationAccount}
                  onChange={(e) => setDestinationAccount(e.target.value)}
                                    className="mb-4"
                />
              )}
              <InputField
                type="text"
                value={amount.toLocaleString()}
                placeholder="Enter Amount"
                onChange={(e) => setAmount(e.target.value)}
                className="mb-4"
              />
              <InputField
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mb-6"
              />
              <ButtonSubmit label="Make Transaction"  />
              {/* onClick={() => setIsModalOpen(true)} */}
          </FormContainer>
        </div>
    <ConfirmationModal
       isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Transaction Details"
        details={[
        { label: "Source Account", value: sourceAccount }, // Cuenta de origen
        { label: isOwnDestination ? "Destination Account" : "Destination CVU/Alias", value: destinationAccount }, // Cuenta de destino o CVU/Alias
        { label: "Amount", value: "$ " + amount }, // Monto
        { label: "Description", value: description || "No description provided" }, // Descripción
        ]}
  onConfirm={() => {
    handleConfirm();
    console.log("Confirmed transaction details", { sourceAccount, destinationAccount, amount, description });
    setIsModalOpen(false); // Cerrar el modal después de confirmar
    setSuccessMessage('Transaction confirmed successfully!');
  }}
/>


        {/* Additional Information Section */}
        <div className="mt-16 px-4 py-8 bg-white rounded-lg shadow-lg max-w-screen-lg mx-auto">
          <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Need Help with Your Transaction?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-indigo-200 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-indigo-700 mb-4">Check for Common Errors</h3>
              <p className="text-gray-700">Ensure that all fields are filled out correctly, including account numbers and amount. Verify your account details to avoid mistakes.</p>
            </div>
            <div className="bg-blue-200 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-blue-700 mb-4">Verify Transaction Details</h3>
              <p className="text-gray-700">Double-check the destination account and amount before submitting. Mistakes can lead to failed transactions or incorrect transfers.</p>
            </div>
            <div className="bg-indigo-300 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-indigo-800 mb-4">Contact Support</h3>
              <p className="text-gray-700">If you encounter any issues or need further assistance, contact our support team for help. We're here to ensure your transactions are smooth and successful.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
