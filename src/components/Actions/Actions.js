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
