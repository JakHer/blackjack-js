// import { useEffect } from 'react';
import { useEconomyContext } from '../../../context/Economy-Context';

const LoadGame = () => {
  const {
    savedGame,
    setMoney,
    setRound,
    setRoundArray,
    setBet,
    gameStarted,
  } = useEconomyContext();

  //   useEffect(() => {
  //     console.log(savedGame);
  //   }, [savedGame]);

  const handleLoadGame = () => {
    setMoney(savedGame[0]);
    setRound(savedGame[1]);
    setRoundArray(savedGame[2]);
    setBet(0);
  };

  return savedGame.length > 0 && !gameStarted ? (
    <button onClick={handleLoadGame} type="button">
      Load Game
    </button>
  ) : (
    <button disabled type="button">
      Load Game
    </button>
  );
};

export default LoadGame;
