import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const EconomyContext = createContext();

export const EconomyContextProvier = (props) => {
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

  const [money, setMoney] = useState(1000);
  const [bet, setBet] = useState(0);

  // const [playerHand, setPlayerHand] = useState([]);
  // const [playerScore, setPlayerScore] = useState([]);

  const [dealersHand, setDealersHand] = useState([]);
  const [dealerScore, setDealerScore] = useState([]);

  const { children } = props;

  const value = {
    money,
    setMoney,
    bet,
    setBet,
    deckID,
    setDeckID,
    returnValue,
    dealersHand,
    setDealersHand,
    dealerScore,
    setDealerScore,
  };

  return (
    <EconomyContext.Provider value={value}>{children}</EconomyContext.Provider>
  );
};

export const useEconomyContext = () => useContext(EconomyContext);

EconomyContextProvier.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};
