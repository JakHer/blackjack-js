import { useEffect } from 'react';
import styled from 'styled-components';
import { useEconomyContext } from '../../../context/Economy-Context';

const StyledButton = styled.button`
  border: none;
  outline: none;
  background: none;
  color: #fff;
  cursor: pointer;
  transition: 0.4s ease background;
  padding: 10px;

  :hover {
    background: brown;
  }
`;

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
    gameJustSaved,
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

  return (
    savedGame.length > 0 &&
    !gameStarted &&
    !gameJustLoaded &&
    !gameJustSaved && (
      <StyledButton onClick={handleLoadGame} type="button">
        Load Game
      </StyledButton>
    )
  );
};

export default LoadGame;
