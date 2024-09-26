import React, { useEffect, useState } from 'react';
import CardTypeSelect from '../components/CardTypeSelect';
import CardMembershipSelect from '../components/CardMembershipSelect';
import BannerTitle from '../components/BannerTitle';
import { useDispatch, useSelector } from 'react-redux';
import { addCardToClient } from '../redux/actions/authenticationAction';
import ConfirmationModal from "../components/ConfirmationModal"; 
import { loadClient } from "../redux/actions/authenticationAction";
import axios from 'axios';

const ApplyCard = () => {
  const [selectedCardType, setSelectedCardType] = useState('');
  const [selectedMembership, setSelectedMembership] = useState('');
  const [errorMessage, setErrorMessage] = useState(""); 
  const [successMessage, setSuccessMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false); 

  const dispatch = useDispatch();
  const client = useSelector((state) => state.authenticationReducer.client);

  useEffect(() => {
    if (client.firstName === '') {
      dispatch(loadClient());
    }
  }, [dispatch, client.firstName]);

  const handleConfirm = () => {
  const selectedData = {
    type: selectedCardType,
    cardColor: selectedMembership,
  }
  console.log(selectedData);
  axios
.post("https://homebanking-42y9.onrender.com/api/clients/current/cards", selectedData, {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
}).then((response) => {
  console.log(response.data);
  setSuccessMessage("Card created succefully!");
  
  })
  .catch((error) => {
    setIsModalOpen(false);
  console.error("Error fetching data:", error);
  setErrorMessage("An error occurred. Please try again.");
  });
  setErrorMessage("");
  setSuccessMessage("");
}

  const handleApply = () => {
  if (!selectedCardType || !selectedMembership) {
  setErrorMessage('Please select both card type and membership.');
  return;
  }
  if(client.cards.find (card => card.type === selectedCardType && card.color === selectedMembership)){
    setErrorMessage('You already have a card of this type and color.');
    return;
  }
  setIsModalOpen(true);

}


  const handleCancel = () => {
    setSelectedCardType('');
    setSelectedMembership('');
    setErrorMessage('');
    setSuccessMessage("");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner Section */}
        <BannerTitle
          title="Request Your New Card"
          title2="Choose Your Card Type and Membership Level"
          description="Select your preferred card type and membership color from the options below. Once you've made your choices, click Apply to proceed with your card request, or Cancel to reset your selections."
        />

      {/* Main Content */}
      <div className="max-w-screen-lg mx-auto mt-12 px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Select Your Card Options</h2>

          {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm mb-4">{successMessage}</p>
            )}
          <div className="space-y-6">
            <CardTypeSelect
              selectedCardType={selectedCardType}
              onCardTypeChange ={setSelectedCardType}
              onChange={(e) => setSelectedCardType(e.target.value)}

            />
            <CardMembershipSelect
              selectedMembership={selectedMembership}
              onMembershipChange={setSelectedMembership}
              onChange={(e) => setSelectedMembership(e.target.value)}
            />
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick= {handleApply}
              className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
            >
              Apply
            </button>
            <button
              onClick={handleCancel}
              className="w-full bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-300 ml-4"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      {/* Modal de Confirmación */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Card Request Details"
        details={[
          { label: "Card Type", value: selectedCardType }, 
          { label: "Membership Level", value: selectedMembership },
        ]}
        onConfirm={() => {
          {handleConfirm()}
          setIsModalOpen(false);
        }}
      />


      {/* Promotional Section: 4 Steps to Get a card */}
      <div className="max-w-screen-lg mx-auto mt-16 px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-12">4 Simple Steps to Get a Card</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-indigo-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-indigo-600 mb-4">Step 1: Sign Up</h3>
            <p className="text-gray-700">Create your account with us in just a few minutes.</p>
          </div>
          <div className="bg-indigo-200 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-indigo-600 mb-4">Step 2: Choose Your Card</h3>
            <p className="text-gray-700">Select the card type that best suits your needs.</p>
          </div>
          <div className="bg-indigo-300 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-indigo-600 mb-4">Step 3: Submit Your Application</h3>
            <p className="text-gray-700">Fill out the card application form with your details.</p>
          </div>
          <div className="bg-indigo-400 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-indigo-600 mb-4">Step 4: Get Approved</h3>
            <p className="text-gray-700">Receive your card approval and funds in no time!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyCard;
