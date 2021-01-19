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
  } = useEconomyContext();

  const handleSaveGame = () => {
    console.log('Game Saved');
    setSaveGame([money, round, [...roundArray]]);
    console.log(savedGame);
  };

  //   useEffect(() => {
  //     if (round >= 1 && roundOver) {
  //       console.log(savedGame);
  //       console.log(roundOver);
  //     }
  //   }, [savedGame]);

  return round >= 1 && !gameStarted ? (
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
