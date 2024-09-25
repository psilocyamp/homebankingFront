import { createReducer } from "@reduxjs/toolkit";
import { addAccountToClient, addCardToClient, loadClient, logoutClient } from "../actions/authenticationAction";


const initialState = {
    client: {
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      accounts: [
        {
          id: 0,
          number: 0,
          balance: 0,
          creationDate: "",
          transactions: [
            {
              id: 0,
              type: "",
              amount: 0,
              description: "",
              date: "",
            },
          ],
        },
      ],
      loans: [
        {
          id: 0,
          loanId: 0,
          name: "",
          amount: 0,
          payments: 0,
        },
      ],
      cards: [
        {
          id: 0,
          cvv: 0,
          number: 0,
          fromDate: "",
          thruDate: "",
          type: "",
          color: "",
          clientHolder: "",
        },
      ],
    },
    status: "idle",
    error: null, 
  };
  
  
  const authenticationReducer = createReducer(initialState, (builder) => {
    builder
      // Maneja la acción para cargar los datos del cliente

      .addCase(loadClient.fulfilled, (state, action) => {        
        return{
          ...state,
          client: action.payload,
          status: "success",
        }
       
      })
      .addCase(loadClient.pending, (state) => {
        return {
          ...state,
          status: "loading",
        }
      })
      .addCase(loadClient.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.payload,
        }
  
      })
  
      // Maneja la acción para agregar una cuenta
      .addCase(addAccountToClient.fulfilled, (state, action) => {
        return {
          ...state,
          status: "success",
          client: action.payload,
        }
        //state.client.accounts.push(action.payload); // Agrega la cuenta al array de cuentas del cliente
      })
  
      // Maneja la acción para agregar una tarjeta
      .addCase(addCardToClient.fulfilled, (state, action) => {
        state.client.cards.push(action.payload); // Agrega la tarjeta al array de tarjetas del cliente
      })
       // Maneja el logout para resetear el estado
       .addCase(logoutClient, (state) => {
      return initialState; // Reinicia el estado del cliente
    });
  });
  
  export default authenticationReducer;