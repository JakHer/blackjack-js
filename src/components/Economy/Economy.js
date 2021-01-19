import { useEffect } from 'react';
import styled from 'styled-components';
import { useEconomyContext } from '../../context/Economy-Context';
import { BetButtons } from './Bet-Buttons';

import Bet from './Bet/Bet';

const StyledPlaceBet = styled.h2`
  color: #fff;
  text-align: center;
`;

export const Economy = () => {
  const { setDeckID, gameStarted } = useEconomyContext();

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
        <BetButtons />
      </div>
    </>
  );
};
