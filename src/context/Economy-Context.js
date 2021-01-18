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

  const [prize, setPrize] = useState(0);

  const [round, setRound] = useState(0);
  const [roundArray, setRoundArray] = useState([]);

  const [playerHand, setPlayerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState([]);

  const [roundOver, setRoundOver] = useState(false);

  const [dealersHand, setDealersHand] = useState([]);
  const [dealerScore, setDealerScore] = useState([]);

  const [playerWin, setPlayerWin] = useState(false);
  const [dealerWin, setDealerWin] = useState(false);

  const [tie, setTie] = useState(false);

  const [gameStarted, setGameStart] = useState(false);
  const [firstDeal, setFirstDeal] = useState(false);

  const [dealerHistory, setDealerHistory] = useState([]);
  const [playerHistory, setPlayerHistory] = useState([]);

  const [dealerScoreHistory, setDealerScoreHistory] = useState([]);
  const [playerScoreHistory, setPlayerScoreHistory] = useState([]);

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
    prize,
    setPrize,
    roundOver,
    setRoundOver,
    playerWin,
    setPlayerWin,
    dealerWin,
    setDealerWin,
    round,
    setRound,
    setDealerHistory,
    dealerHistory,
    playerHistory,
    setPlayerHistory,
    dealerScoreHistory,
    setDealerScoreHistory,
    playerScoreHistory,
    setPlayerScoreHistory,
    roundArray,
    setRoundArray,
    tie,
    setTie,
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
