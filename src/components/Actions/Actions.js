import { useEffect } from 'react';
import { useEconomyContext } from '../../context/Economy-Context';

const Actions = () => {
  const {
    firstDeal,
    setFirstDeal,
    deckID,
    returnValue,
    setPlayerHand,
    playerHand,
    setPlayerScore,
    playerScore,
    setGameStart,
    setBet,
    money,
    setMoney,
    prize,
  } = useEconomyContext();

  const hit = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
      .then((resp) => resp.json())
      .then((json) => {
        const value0 = returnValue(json.cards[0].value);

        setPlayerHand([...playerHand, json.cards[0]]);

        setPlayerScore(playerScore + value0);
      });
  };

  const stand = () => {
    if (firstDeal === true) {
      setFirstDeal(false);
    }
  };

  useEffect(() => {
    if (playerScore > 21) {
      console.log('LOSE KURWO');
      console.log(money);
      setGameStart(false);
      setBet(0);
      setPlayerScore(0);
      setMoney(money);
      setPlayerHand([]);
    } else if (playerScore > 15) {
      console.log('BLACKJACK');
      setGameStart(false);
      setMoney(money + prize * 1.5);
      setBet(0);
      setPlayerScore(0);
      setPlayerHand([]);
      console.log(prize * 1.5);
    }
  }, [playerScore]);

  return (
    <div>
      <button onClick={hit} type="button">
        Hit
      </button>
      <button onClick={stand} type="button">
        Stand
      </button>
    </div>
  );
};

export default Actions;
