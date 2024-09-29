import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import ButtonSubmit from '../components/ButtonSubmit';
import FormContainer from '../components/FormContainer';
import axios from 'axios';

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const user = { firstName, lastName, email, password };

    if (!firstName.trim()) {
      setErrorMessage("First name cannot be empty.");
      return;
    }
    if (!lastName.trim()) {
      setErrorMessage("Last name cannot be empty.");
      return;
    }
    if (!email.trim()) {
      setErrorMessage("Email cannot be empty.");
      return;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setErrorMessage("Email format is invalid.");
      return;
    }
    if (!password.trim()) {
      setErrorMessage("Password cannot be empty.");
      return;
    } else if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    try {
      const res = await axios.post("https://homebanking-42y9.onrender.com/api/auth/register", user);
      console.log(res.data);

      localStorage.setItem("token", res.data);
      setSuccessMessage("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error registering:", error);
      setErrorMessage("Invalid email or password");
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-gradient-to-b from-indigo-100 via-white to-indigo-100 min-h-screen flex justify-center items-center px-4">
      {/* Container that holds both logo/info and form */}
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg flex flex-col md:flex-row items-center md:items-start p-8">
        {/* Left side with Logo and Bank Info */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:pr-8">
          <Logo className="w-32 h-32 mx-auto md:mx-0" />
          <h2 className="text-2xl font-semibold mt-4 text-indigo-800">Welcome to Move Digital Banking</h2>
          <p className="text-gray-600 mt-2">Your trusted partner for secure and easy online banking.</p>
        </div>

        {/* Right side with the Sign Up form */}
        <div className="w-full md:w-1/2">
          <FormContainer 
            title="Sign Up" 
            description="Create your account to get started with our services."
            onSubmit={handleSignUp}
            className="w-full"
          >
            {/* Display Error or Success Messages */}
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

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
              onChange={(e) => setEmail(e.target.value)}
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              }
            />
{/* Input de contraseña con visibilidad controlada */}
<div className="relative">
              <InputField
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              >
                {showPassword ? (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 011.658-2.953M15 12a3 3 0 00-6 0M6.343 7.343L13.875 18.825" />
                  </svg>
                )}
              </span>
            </div>

            <ButtonSubmit label="Register" className="bg-indigo-600 text-white w-full py-3 rounded-full mt-6" />

            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account? <a className="underline" href="/login">Log in</a>
            </p>
          </FormContainer>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full text-center text-gray-500 text-sm py-4 bg-white">
  <p className="text-sm text-gray-700">
    Open-source{" "}
    <a href="https://github.com/psilocyamp/HTML-MindHub" target="_blank" rel="noreferrer" className="text-[#8b52ff] hover:underline">
      code
    </a>{" "}
    by{" "}
    <a href="https://www.linkedin.com/in/amparo-p%C3%A9rez/" target="_blank" rel="noreferrer" className="text-[#8b52ff] hover:underline">
      Amparo Perez
    </a>
  </p>
</footer>
    </div>
  );
};

export default SignUp;
