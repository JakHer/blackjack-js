import { useEffect } from 'react';
import styled from 'styled-components';
import { useEconomyContext } from '../../context/Economy-Context';
import { BetButtons } from './Bet-Buttons';

import Bet from './Bet/Bet';

const StyledPlaceBet = styled.h2`
  color: #fff;
  text-align: center;
  margin-top: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 250px;
  height: 40px;
  margin-left: -125px;
  margin-top: -200px;
`;

export const Economy = () => {
  const { setDeckID, gameStarted, roundOver } = useEconomyContext();

  useEffect(() => {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
      .then((resp) => resp.json())
      .then((json) => {
        setDeckID(json.deck_id);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div>
        {!gameStarted && <StyledPlaceBet>Place Your Bets</StyledPlaceBet>}
      </div>
      <div>
        <Bet />
        {!roundOver && !gameStarted && <BetButtons />}
      </div>
    </>
  );
};
