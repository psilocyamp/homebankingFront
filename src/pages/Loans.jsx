import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import ButtonSubmit from "../components/ButtonSubmit";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../components/ConfirmationModal"; 
import { loadClient } from "../redux/actions/authenticationAction";
import axios from "axios";

const Loans = () => {
  const [type, setType] = useState("");
  const [account, setAccount] = useState("");
  const [payments, setPayments] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [amount, setAmount] = useState("");
  const [allLoans, setAllLoans] = useState([]);
  const [availableLoans, setAvailableLoans] = useState([]);

  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensajes de error
  const [successMessage, setSuccessMessage] = useState(""); // Estado para mensaje de éxito

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const client = useSelector((state) => state.authenticationReducer.client);

  
  useEffect(() => {
    dispatch(loadClient());
    axios
      .get("https://homebanking-42y9.onrender.com/api/loans/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setAllLoans(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  }, [dispatch]);

  useEffect(() => {
    if (client) {
      const filteredLoans = allLoans?.filter(
        (loan) =>
          !client.loans.some((clientLoan) => clientLoan.name === loan.name)
      );
      setAvailableLoans(filteredLoans);
    }
  }, [allLoans]); //allLoans, client




  // Manejar la selección del tipo de préstamo
  const handleLoanTypeChange = (event) => {
    const selectedType = event.target.value;
    setType(selectedType);

    const selectedLoan = availableLoans.find(
      (loan) => loan.name === selectedType
    );
    if (selectedLoan) {
      setPayments(selectedLoan.payments); // Actualizar las cuotas del préstamo
      setMaxAmount(selectedLoan.maxAmount); // Actualizar el monto máximo
    } else {
      setPayments([]);
      setMaxAmount(null);
    }
  };

  // Manejar la selección de las cuotas
  const handlePaymentChange = (event) => {
    setSelectedPayment(Number(event.target.value));
  };

  // Manejar la selección de la cuenta de origen
  const handleAccountChange = (event) => {
    setAccount(event.target.value);
  };

  // Validar el monto del préstamo según el monto máximo permitido
  const handleAmountChange = (event) => {
    const inputAmount = Number(event.target.value);
    if (inputAmount <= maxAmount) {
      setAmount(inputAmount);
    } else {
      alert(`The maximum allowed amount for this loan is ${maxAmount}`);
    }
  };

  const loanDetails = {
    id:
    type === "Mortgage"
      ? 1
      : type === "Automotive"
      ? 3
      : type === "Personal"
      ? 2 
      :0,
    amount: amount,
    payments: selectedPayment,
    destinationAccount: account, 
  };
  const handleOpenModal = (event) => {
    event.preventDefault();
    if (!amount || amount <= 0) {
      setErrorMessage("Please enter a valid amount.");
      return;
    }
    if (amount > maxAmount) {
      setErrorMessage(`Exceeds the allowed amount (${maxAmount}).`);
      return;
    }
    if (!selectedPayment || selectedPayment <= 0) {
      setErrorMessage("Please enter valid installments.");
      return;
    }
    // Abrir el modal de confirmación
    setIsModalOpen(true);
    setErrorMessage(""); // Limpiar mensajes de error si los hay
  };

  const handleConfirm = () => {
axios
.post("https://homebanking-42y9.onrender.com/api/loans/", loanDetails,
   {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
})
.then((response) => {
  console.log(response.data);
  setSuccessMessage("Loan generated successfully!");
  setErrorMessage("Failed to generate loan.");
})
.catch((error) => {
  console.error("Error fetching data:", error);
});
setIsModalOpen(false);

};


  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
      {/* Header Section */}
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-gray-800">Apply for a Loan</h1>
        <p className="text-lg text-gray-600 mt-2">
          Complete the form below to apply for your desired loan. We’ll help you
          every step of the way.
        </p>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <FormContainer 
            title="Loan Application Form"
            description="Select your loan type, source account, amount, and number of installments."
          >
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm mb-4">{successMessage}</p>
            )}
            <SelectField
              options={availableLoans.map((loan) => ({
                label: loan.name,
                value: loan.name,
              }))}
              placeholder="Select Loan Type"
              className="mb-4"
              campo="nameLoan"
              onChange={handleLoanTypeChange}
            />
            <SelectField
              options={client.accounts?.map((account) => ({
                label: account.number,
                value: account.number,
              }))}
              placeholder="Select Source Account"
              className="mb-4"
              onChange={handleAccountChange}
            />
            {maxAmount && (
              <InputField
                type="number"
                placeholder={`Enter Amount (max: ${maxAmount})`}
                value={amount.toLocaleString()}
                onChange={handleAmountChange}
                className="mb-4"
              />
            )}
            {payments.length > 0 && (
              <SelectField
                options={payments.map((payment) => ({
                  label: `${payment} payments`,
                  value: payment.toString(),
                }))}
                placeholder="Select Installments"
                value={selectedPayment?.toString() || ""}
                onChange={handlePaymentChange}
                className="mb-6"
              />
            )}
            <ButtonSubmit label="Apply Now"  />
          </FormContainer>
        </div>
        <ConfirmationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Confirm Loan Details"
        details={[
          { label: "Account", value: loanDetails.destinationAccount },
          { label: "Amount", value: "$ " + loanDetails.amount },
          { label: "Payments", value: loanDetails.payments},
        ]}
        onConfirm={() => {
          handleConfirm
          console.log("Confirmed loan details", { type, account, amount, payments: selectedPayment });
          setIsModalOpen(false); // Close the modal after confirmation
        }}
      />
        

        {/* Additional Information Section */}
        <div className="mt-16 px-4 py-8 bg-white rounded-lg shadow-lg max-w-screen-lg mx-auto">
          <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
            Why Choose Our Loans?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-indigo-200 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-indigo-700 mb-4">
                Flexible Terms
              </h3>
              <p className="text-gray-700">
                Choose the loan term that suits you best, from 12 to 36 months.
                Tailor your repayments to your needs.
              </p>
            </div>
            <div className="bg-blue-200 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-blue-700 mb-4">
                Competitive Rates
              </h3>
              <p className="text-gray-700">
                We offer competitive interest rates to ensure you get the best
                deal possible on your loan.
              </p>
            </div>
            <div className="bg-indigo-300 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-indigo-800 mb-4">
                Quick Approval
              </h3>
              <p className="text-gray-700">
                Our streamlined application process ensures fast approval, so
                you can get your funds quickly.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};



export default Loans;
