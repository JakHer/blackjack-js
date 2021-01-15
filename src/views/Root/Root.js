import { useEffect, useState } from 'react';
import './index.css';

const Root = () => {
  const returnValue = (value) => {
    const cardValues = {
      ACE: 11,
      KING: 10,
      QUEEN: 10,
      JACK: 10,
      10: 10,
      9: 9,
      8: 8,
      7: 7,
      6: 6,
      5: 5,
      4: 4,
      3: 3,
      2: 2,
    };

    return cardValues[value];
  };

  const [deckID, setDeckID] = useState('');

  const [playerHand, setPlayerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState([]);

  const [dealersHand, setDealersHand] = useState([]);
  const [dealerScore, setDealerScore] = useState([]);

  useEffect(() => {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
      .then((resp) => resp.json())
      .then((json) => {
        setDeckID(json.deck_id);
      });
  }, []);

  const startGame = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=4`)
      .then((resp) => resp.json())
      .then((json) => {
        const value0 = returnValue(json.cards[0].value);
        const value1 = returnValue(json.cards[1].value);
        const value2 = returnValue(json.cards[2].value);
        const value3 = returnValue(json.cards[3].value);

        setPlayerHand(json.cards.slice(0, 2));
        setPlayerScore(value0 + value1);

        setDealersHand(json.cards.slice(2, 4));
        setDealerScore(value2 + value3);
      });
  };

  return (
    <>
      <button type="button" onClick={startGame}>
        Start Game
      </button>
      {dealersHand.length > 0 && (
        <div>
          <h2>Dealer Hand</h2>
          <p>Dealer Score: {dealerScore}</p>
          {dealersHand.map((item) => (
            <img
              key={item.code + item.value}
              alt={item.code}
              src={item.image}
            />
          ))}
        </div>
      )}
      {playerHand.length > 0 && (
        <div>
          <h2>Player Hand</h2>
          <p>Player Score: {playerScore}</p>
          {playerHand.map((item) => (
            <img
              key={item.code + item.value}
              alt={item.code}
              src={item.image}
            />
          ))}
        </div>
      )}
      <div>
        <img alt={dealersHand.value} src={dealersHand.image} />
      </div>
    </>
  );
};

export default Root;
