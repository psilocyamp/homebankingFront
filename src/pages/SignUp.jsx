import FormContainer from '../components/FormContainer';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import ButtonSubmit from '../components/ButtonSubmit';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import axios from 'axios';


const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); // Inicializa useNavigate
  const dispatch = useDispatch();

const handleSignUp = async(e) => {
  e.preventDefault();

  const user= {firstName, lastName, email, password};
if (!firstName || firstName.trim().length === 0) {
  setErrorMessage("First name cannot be empty.");
  return;

}
if (!lastName || lastName.trim().length === 0) {
  setErrorMessage("Last name cannot be empty.");
  return;

}
if (!email || email.trim().length === 0) {
  setErrorMessage("Email cannot be empty.");
  return;

} else if ((!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))) {
  setErrorMessage("Email format is invalid.");
  return;

}
if (!password || password.trim().length === 0) {
  setErrorMessage("Password cannot be empty.");
  return;
} else if (password.length < 8) {
  setErrorMessage("Password must be at least 8 characters long.");
  return;
}

  try {
    const res= await axios.post("https://homebanking-42y9.onrender.com/api/auth/register", user);
    console.log(res.data);
    
    localStorage.setItem("token", res.data);
    setSuccessMessage("Registration successful!");
    navigate("/login");

  } catch (error) {
    console.error("Error registering:", error);
    setErrorMessage("Invalid email or password");
    alert(error.response.data);
  }
}

  return (
    <div >
    <FormContainer 
    title="Sign Up" 
    description="Create your account to get started with our services."
  >
    <div className="text-center mb-8">
      <Logo />
    </div>

    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    {successMessage && <p className="text-green-500">{successMessage}</p>}

     <InputField
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} 
          />

<InputField
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} 
          />

<InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Actualiza el estado
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            }
          />


<InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Actualiza el estado
            icon={
              <>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </>
            }
          />


    <ButtonSubmit label="Register" onClick={handleSignUp} />

    <p className="text-center text-sm text-gray-500 mt-4">
      Already have an account? <a className="underline" href="/login">Log in</a>
    </p>
  </FormContainer>
    </div>
  );
};


export default SignUpForm;
