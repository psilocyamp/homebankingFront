import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const loadClient = createAsyncThunk(
    "loadClient",
    async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  
      try {
        const response = await axios.get(
          "https://homebanking-42y9.onrender.com/api/auth/current",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data);
        
        return response.data; // Devuelve los datos del cliente directamente
      } catch (error) {
        console.error("Error loading client:", error);
        return rejectWithValue(
          error.response ? error.response.data : "Unknown error"
        ); // Devuelve un mensaje de error
      }
    }
  )
  export const logoutClient = createAction('auth/logoutClient');


  export const addCardToClient = createAsyncThunk(
    "addCardToClient",
    async ({ rejectWithValue }) => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://homebanking-42y9.onrender.com/api/clients/current/cards", // Cambia esta URL a la correcta en tu backend
          null, // Datos de la nueva tarjeta
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return response.data; // Devuelve la tarjeta añadida
      } catch (error) {
        console.error("Error adding card:", error);
        return rejectWithValue(
          error.response ? error.response.data : "Unknown error"
        ); // Manejo de errores
      }
    }
  );

  export const addAccountToClient = createAsyncThunk(
    "addAccountToClient",
    async (newAccount, { rejectWithValue }) => {
      const token = localStorage.getItem("token");
  
      try {
        const response = await axios.post(
          "https://homebanking-42y9.onrender.com/api/accounts/clients/current/accounts", // URL del backend
          newAccount, // Los datos de la nueva cuenta
          {
            headers: { Authorization: `Bearer ${token}` }, // Encabezado con el token
          }
        );
        return response.data; // Devuelve los datos de la cuenta añadida
      } catch (error) {
        console.error("Error adding account:", error);
        return rejectWithValue(
          error.response ? error.response.data : "Unknown error"
        );
      }
    }
  );
