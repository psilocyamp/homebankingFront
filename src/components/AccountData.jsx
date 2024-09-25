import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadClient } from '../redux/actions/authenticationAction';

const AccountData = () => {
  
  const dispatch = useDispatch();
  const { client, status, error } = useSelector(state => state.authenticationReducer.client); // Accedemos a los datos del cliente y el estado


    useEffect(() => {
        // Despachamos la acción para cargar los datos del cliente
        dispatch(loadClient());
    }, [dispatch]);

    if (status === 'loading') {
        return <p>Loading client data...</p>;
    }

    if (status === 'failed') {
        return <p>Error fetching client data: {error}</p>;
    }
  
    
  
    return (
      <div>
     
    </div>
  )
}


export default AccountData;
