// import { useEffect } from 'react';
import { useEconomyContext } from '../../../context/Economy-Context';

const SaveGame = () => {
  const {
    round,
    savedGame,
    setSaveGame,
    money,
    // roundOver,
    roundArray,
    gameStarted,
    gameJustLoaded,
  } = useEconomyContext();

  const handleSaveGame = () => {
    console.log('Game Saved');
    setSaveGame([money, round, [...roundArray]]);
    console.log(savedGame);
  };

  //   useEffect(() => {
  //
  //   }, [savedGame]);

  window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    if (savedGame.length > 0) {
      localStorage.setItem('savedGame', JSON.stringify(savedGame));
    }
    const confirmationMessage = 'Some message';
    e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
    return confirmationMessage; // Gecko, WebKit, Chrome <34
  });

  //   useEffect(() => {
  //     if (round >= 1 && roundOver) {
  //       console.log(savedGame);
  //       console.log(roundOver);
  //     }
  //   }, [savedGame]);

  return round >= 1 && !gameStarted && !gameJustLoaded ? (
    <button onClick={handleSaveGame} type="button">
      Save game
    </button>
  ) : (
    <button disabled type="button">
      Save game
    </button>
  );
};

export default SaveGame;
