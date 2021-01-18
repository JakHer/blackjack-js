import { useEffect } from 'react';
import { useEconomyContext } from '../../context/Economy-Context';
import { BetButtons } from './Bet-Buttons';

import Money from './Money/Money';
import Bet from './Bet/Bet';

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
        {!gameStarted && <h1>Place Your Bets</h1>}
        <Money />
      </div>
      <div>
        <Bet />
        <BetButtons />
      </div>
    </>
  );
};
