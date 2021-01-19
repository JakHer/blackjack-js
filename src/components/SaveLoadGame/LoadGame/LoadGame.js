import { useEffect } from 'react';
import { useEconomyContext } from '../../../context/Economy-Context';

const LoadGame = () => {
  const {
    savedGame,
    setMoney,
    setRound,
    setRoundArray,
    setBet,
    gameStarted,
    setSaveGame,
    gameJustLoaded,
    setJustLoaded,
  } = useEconomyContext();

  const handleLoadGame = () => {
    setMoney(savedGame[0]);
    setRound(savedGame[1]);
    setRoundArray(savedGame[2]);
    setBet(0);
    setJustLoaded(true);
  };

  useEffect(() => {
    const localStorageSavedGame = JSON.parse(localStorage.getItem('savedGame'));

    if (localStorageSavedGame) {
      setSaveGame(localStorageSavedGame);
    }
  }, []);

  return savedGame.length > 0 && !gameStarted && !gameJustLoaded ? (
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
