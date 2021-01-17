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

  const betValues = [500, 100, 10, 1];

  const [deckID, setDeckID] = useState('');

  const [money, setMoney] = useState(1000);
  const [bet, setBet] = useState(0);

  const [playerHand, setPlayerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState([]);

  const [dealersHand, setDealersHand] = useState([]);
  const [dealerScore, setDealerScore] = useState([]);

  const [gameStarted, setGameStart] = useState(false);
  const [firstDeal, setFirstDeal] = useState(false);

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
    playerHand,
    setPlayerHand,
    playerScore,
    setPlayerScore,
    gameStarted,
    setGameStart,
    betValues,
    firstDeal,
    setFirstDeal,
  };

  return (
    <EconomyContext.Provider value={value}>{children}</EconomyContext.Provider>
  );
};

export const useEconomyContext = () => useContext(EconomyContext);

EconomyContextProvier.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};
