import React, { useEffect, useState , useRef} from "react";
import FormContainer from "../components/FormContainer";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import ButtonSubmit from "../components/ButtonSubmit";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../components/ConfirmationModal";
import { loadClient } from "../redux/actions/authenticationAction";
import LoanCard from "../components/LoanCard";
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
  const [amountError, setAmountError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [sourceAccountError, setSourceAccountError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Estado para mensaje de éxito

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const client = useSelector((state) => state.authenticationReducer.client);

// Create a ref for the loans section
const loansRef = useRef(null);

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
  }, [allLoans, client]);

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

  const loanDetails = {
    id:
      type === "Mortgage"
        ? 1
        : type === "Automotive"
        ? 3
        : type === "Personal"
        ? 2
        : 0,
    amount: amount,
    payments: selectedPayment,
    destinationAccount: account,
  };

  const handleOpenModal = (event) => {
    event.preventDefault();

    // Limpiar mensajes de error antes de validar
    setTypeError("");
    setSourceAccountError("");
    setAmountError("");
    setPaymentError("");

    if (!type || type <= 0) {
      setTypeError("Please enter a valid type.");
      return;
    }
    setTypeError("");
    if (!account) {
      setSourceAccountError("Please enter a valid account.");
      return;
    }
    setSourceAccountError("");
    // Validate amount
    const amountValue = parseFloat(amount.replace(/,/g, "")); // Clean and convert amount
    if (!amountValue || amountValue <= 0) {
      setAmountError("Please enter a valid amount.");
      return;
    }

    // Check if amount exceeds maxAmount
    if (amountValue > maxAmount) {
      setAmountError(
        `Amount exceeds the allowed maximum amount of $${formatNumberWithCommas(
          maxAmount
        )}.`
      );
      return;
    }
    if (!selectedPayment || selectedPayment <= 0) {
      setPaymentError("Please enter valid installments.");
      return;
    }
    setPaymentError("");

    setIsModalOpen(true);
    setErrorMessage(""); // Limpiar mensajes de error
    setTypeError("");
    setSourceAccountError("");
    setAmountError("");
    setPaymentError("");
  };

  const handleConfirm = () => {
    const cleanedAmount = cleanNumber(amount);
    axios
      .post(
        "https://homebanking-42y9.onrender.com/api/loans/",
        {
          ...loanDetails,
          amount: cleanedAmount, // Usar el valor limpiado
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        setSuccessMessage("Loan generated successfully!");
        dispatch(loadClient());

        // Scroll to the loans section after 3 seconds
        setTimeout(() => {
          if (loansRef.current) {
            loansRef.current.scrollIntoView({ behavior: "smooth" });
          }
        }, 3000);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        ConfirmationModal(error.response.data);
      });
    setIsModalOpen(false);

    setAmount("");
    setSelectedPayment(null);
    setAccount("");
    setSuccessMessage("");
    setErrorMessage("");
  };

  // Función para formatear el número con comas
  const formatNumberWithCommas = (num) => {
    if (!num) return "";
    const parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Agrega comas
    return parts.join(".");
  };

  // Función para limpiar el número, eliminando comas y espacios
  const cleanNumber = (num) => {
    return num.replace(/,/g, "").replace(/ /g, "");
  };

  return (
    <div ref={loansRef} className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
      {/* Header Section */}
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-gray-800">
          Your Loans Overview
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Explore details of the loans you’ve taken with us and get an overview
          of your financial situation.
        </p>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Cards Section: Prestamos Tomados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {client?.loans?.length > 0 ? (
            client.loans.map((loan) => <LoanCard key={loan.id} loan={loan} />)
          ) : (
            <p>No loans taken yet.</p>
          )}
        </div>
      </div>

      {/* Verificar si el usuario tiene 3 o más préstamos */}
      {client?.loans?.length >= 3 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-600">
            You've reached the limit of 3 loans.
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            You cannot apply for any more loans at this time.
          </p>
        </div>
      ) : (
        <>
          {/* Header Section */}
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-800">
              Apply for a Loan
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Complete the form below to apply for your desired loan. We’ll help
              you every step of the way.
            </p>
          </div>
          <div className="container mx-auto px-4 py-8">
            {/* Form Container */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <FormContainer
                title="Loan Application Form"
                description="Select your loan type, source account, amount, and number of installments."
              >
                {typeError && (
                  <p className="text-red-500 text-sm mb-4">{typeError}</p>
                )}{" "}
                {sourceAccountError && (
                  <p className="text-red-500 text-sm mb-4">
                    {sourceAccountError}
                  </p>
                )}
                {amountError && (
                  <p className="text-red-500 text-sm mb-4">{amountError}</p>
                )}
                {paymentError && (
                  <p className="text-red-500 text-sm mb-4">{paymentError}</p>
                )}
                {successMessage && (
                  <p className="text-green-500 text-sm mb-4">
                    {successMessage}
                  </p>
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
                  placeholder="Select Destination Account"
                  className="mb-4"
                  onChange={handleAccountChange}
                />
                <InputField
                  type="text"
                  placeholder={`Enter Amount (max: $${formatNumberWithCommas(
                    maxAmount
                  )})`}
                  value={amount}
                  onChange={(e) =>
                    setAmount(
                      formatNumberWithCommas(cleanNumber(e.target.value))
                    )
                  }
                  className="mb-4"
                />
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
                <ButtonSubmit label="Apply Now" onClick={handleOpenModal} />
              </FormContainer>
            </div>
            <ConfirmationModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Confirm Loan Details"
              details={[
                { label: "Account", value: loanDetails.destinationAccount },
                { label: "Amount", value: "$ " + loanDetails.amount },
                { label: "Payments", value: loanDetails.payments },
              ]}
              onConfirm={() => {
                handleConfirm();
                console.log("Confirmed loan details", {
                  type,
                  account,
                  amount,
                  selectedPayment,
                });
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Loans;
