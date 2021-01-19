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

const SaveGame = () => {
  const {
    round,
    savedGame,
    setSaveGame,
    money,
    roundArray,
    gameStarted,
    gameJustLoaded,
  } = useEconomyContext();

  const handleSaveGame = () => {
    setSaveGame([money, round, [...roundArray]]);
  };

  window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    if (savedGame.length > 0) {
      localStorage.setItem('savedGame', JSON.stringify(savedGame));
    }
    const confirmationMessage = 'Game will be saved';
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  });

  return (
    round >= 1 &&
    !gameStarted &&
    !gameJustLoaded && (
      <StyledButton onClick={handleSaveGame} type="button">
        Save game
      </StyledButton>
    )
  );
};

export default SaveGame;
