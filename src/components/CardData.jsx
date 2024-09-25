import React from 'react';
import { useSelector } from 'react-redux';
import Card from './Card';

const CardData = ({ cardType }) => {
  const client = useSelector(state => state.authenticationReducer.client);
 
  if (!client.cards || client.cards.length === 0) {
    return <p>Loading cards data...</p>;
  }
  const filteredCards = client.cards.filter(card => card.type === cardType);

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     {filteredCards.map((card) => (
        <Card
        key={card.id}
        cvv={card.cvv}
        color={card.color}
        type={card.type}
        number={card.number}
        expiration={card.thruDate}
        name={card.cardHolder}
      />
      ))}
    </div>
  );
}

export default CardData;
