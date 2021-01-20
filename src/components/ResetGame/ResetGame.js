import styled from 'styled-components';
import { useEconomyContext } from '../../context/Economy-Context';

const StyledButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 10px;
  width: 100px;
  border: 1px solid #000;
  background: none;
  cursor: pointer;
  outline: none;
  transition: 0.4s ease background;
  min-height: 61.61px;

  :hover {
    background: yellow;
  }

  :disabled {
    display: none;
  }
`;

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
    setJustSaved,
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
    setJustSaved(false);
  };

  return round === 0 && bet === 0 ? (
    <StyledButton disabled onClick={resetGame} type="button">
      Reset Game
    </StyledButton>
  ) : (
    <StyledButton onClick={resetGame} type="button">
      Reset Game
    </StyledButton>
  );
};

export default ResetGame;
