import { useEffect } from 'react';
import { useEconomyContext } from '../../context/Economy-Context';
import { BetButtons } from './Bet-Buttons';

export const Economy = () => {
  const { money, bet, setDeckID } = useEconomyContext();

  useEffect(() => {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
      .then((resp) => resp.json())
      .then((json) => {
        setDeckID(json.deck_id);
      });
  }, []);

  return (
    <>
      <div>
        <h1>Place Your Bets</h1>
        <p>Money</p>
        <p>{money}$</p>
      </div>
      <div>
        <p>Bet</p>
        <p>{bet}$</p>
        <BetButtons />
      </div>
    </>
  );
};
