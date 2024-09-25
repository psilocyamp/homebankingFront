import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import ButtonSubmit from '../components/ButtonSubmit';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loadClient } from '../redux/actions/authenticationAction';
const LoginForm = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const dispatch = useDispatch();
const navigate= useNavigate();

const [errorMessage, setErrorMessage] = useState(""); 
const [successMessage, setSuccessMessage] = useState("");

const handleLogin = async(e) => {
  e.preventDefault();
  const user= {email, password};
if(email===""){
  setErrorMessage("Email is required");
  return;
}
if(password ===""){
  setErrorMessage("Password is required");
  return;
}
if(!email.includes("@")){
  setErrorMessage("Email is not valid");
  return;
}


  try {
    const res= await axios.post("http://localhost:8080/api/auth/login", user);
    console.log(res.data);
    
    localStorage.setItem("token", res.data);
    dispatch(loadClient());
    navigate("/accounts");

  } catch (error) {
    console.error("Error logging in:", error);
    setErrorMessage("Invalid email or password");
  }
}

  return (
    <FormContainer 
      title="Log In" 
      description="Access your account to continue."
      onSubmit={handleLogin}
    >
      <div className="text-center mb-8">
        <Logo />
      </div>
      {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm mb-4">{successMessage}</p>
            )}

      <InputField
        type="email"
        placeholder="Email"
        title="Email"
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

      <InputField
        type="password"
        name="password"
        placeholder="Password"
        title="Password"
        onChange={(e) => setPassword(e.target.value)}
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

      <ButtonSubmit label="Log In" />

      <p className="text-center text-sm text-gray-500 mt-4">
        Don't have an account? <a className="underline" href="/signup">Sign up</a>
      </p>
    </FormContainer>
  );
};

export default LoginForm; 