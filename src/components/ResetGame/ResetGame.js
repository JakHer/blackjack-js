import { useEconomyContext } from '../../context/Economy-Context';

const ResetGame = () => {
  const {
    setPlayerWin,
    setDealerWin,
    setGameStart,
    setRoundOver,
    setDenyDouble,
    setPlayerScore,
    setPlayerHand,
    setDealerScore,
    setDealersHand,
    setTie,
    setMoney,
    setRound,
    setRoundArray,
    setBet,
    setJustLoaded,
    round,
    bet,
  } = useEconomyContext();

  const resetGame = () => {
    setPlayerWin(false);
    setDealerWin(false);
    setTie(false);
    setGameStart(false);
    setRoundOver(false);
    setDenyDouble(false);
    setPlayerScore(0);
    setPlayerHand([]);
    setDealerScore(0);
    setDealersHand([]);
    setMoney(1000);
    setRound(0);
    setBet(0);
    setRoundArray([]);
    setJustLoaded(false);
  };

  return round === 0 && bet === 0 ? (
    <button disabled onClick={resetGame} type="button">
      Reset Game
    </button>
  ) : (
    <button onClick={resetGame} type="button">
      Reset Game
    </button>
  );
};

export default ResetGame;
