import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'


const ClientData = () => {

    const [client, setClient] = useState(null);

    useEffect(() => {
      axios
        .get("https://homebanking-42y9.onrender.com/api/clients/1")
        .then((response) => {
          setClient(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);
  
    // Verifica si client es null antes de usarlo
    if (!client) {
      return <p>Loading client data...</p>;
    }
    console.log(client);
    
    return (
    <div>
        
    </div>
  )
}

export default ClientData
