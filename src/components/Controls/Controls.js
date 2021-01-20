import styled from 'styled-components';
import { useEconomyContext } from '../../context/Economy-Context';
import Actions from '../Actions/Actions';
import Hands from '../Hands/Hands';

const StyledDeal = styled.button`
  outline: none;
  border: none;
  background: none;
  color: #fff;
  cursor: pointer;
  position: absolute;
  height: 20px;
  margin-top: 30px;
  width: 100%;
  transition: 0.4s ease color;
  font-size: 1.5rem;

  :hover {
    color: red;
  }
`;

const Controls = () => {
  const {
    bet,
    deckID,
    returnValue,
    setDealersHand,
    dealerScore,
    setDealerScore,
    setPlayerHand,
    setPlayerScore,
    gameStarted,
    setGameStart,
    setFirstDeal,
    setPrize,
    round,
    setRound,
    setJustLoaded,
    setJustSaved,
  } = useEconomyContext();

  const startGame = () => {
    setGameStart(true);
    setFirstDeal(true);
    setRound(round + 1);
    setJustLoaded(false);
    setJustSaved(false);
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=4`)
      .then((resp) => resp.json())
      .then((json) => {
        const value0 = returnValue(json.cards[0].value);
        const value1 = returnValue(json.cards[1].value);
        const value2 = returnValue(json.cards[2].value);
        const value3 = returnValue(json.cards[3].value);

        setPlayerHand(json.cards.slice(0, 2));
        setPlayerScore(value0 + value1);

        setDealersHand(json.cards.slice(2, 4));
        setDealerScore(value2 + value3);
      })
      .catch((err) => console.log(err.name))
      .then(() => {
        setPrize(bet * 1.5);
      });
  };

  return (
    <>
      {bet > 0 && deckID && !gameStarted && (
        <StyledDeal type="button" onClick={startGame}>
          Deal
        </StyledDeal>
      )}

      {dealerScore > 0 && gameStarted && (
        <div>
          <Actions />
          <Hands />
        </div>
      )}
    </>
  );
};

export default Controls;
