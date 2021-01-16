import styled from 'styled-components';
import { useEconomyContext } from '../../context/Economy-Context';

const StyledCard = styled.img`
  max-width: 100px;
  max-height: 100px;
`;

const Controls = () => {
  const {
    bet,
    deckID,
    returnValue,
    dealersHand,
    setDealersHand,
    dealerScore,
    setDealerScore,
    playerHand,
    setPlayerHand,
    playerScore,
    setPlayerScore,
  } = useEconomyContext();

  const startGame = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=4`)
      .then((resp) => resp.json())
      .then((json) => {
        const value0 = returnValue(json.cards[0].value);
        const value1 = returnValue(json.cards[1].value);
        const value2 = returnValue(json.cards[2].value);
        const value3 = returnValue(json.cards[3].value);

        // json.cards.map((item) => returnValue(item.value));

        setPlayerHand(json.cards.slice(0, 2));
        setPlayerScore(value0 + value1);

        setDealersHand(json.cards.slice(2, 4));
        setDealerScore(value2 + value3);
      });
  };

  return (
    <>
      {bet > 0 && deckID && (
        <button type="button" onClick={startGame}>
          New Game
        </button>
      )}
      {dealerScore > 0 && (
        <div>
          <h2>Dealears hand</h2>
          <p>
            Dealears score: {dealerScore - returnValue(dealersHand[1].value)}
          </p>
          <ul>
            {/* {dealersHand.map((item) => (
              <li key={item.value + item.code}>
                <img alt={item.value + item.code} src={item.image} />
              </li>
            ))} */}
            <li key={dealersHand[0].value + dealersHand[0].code}>
              <StyledCard
                alt={dealersHand[0].value + dealersHand[0].code}
                src={dealersHand[0].image}
              />
            </li>
            <li>
              <StyledCard
                alt="Hidden Card"
                src="https://www.pngkey.com/png/full/349-3492792_card-back.png"
              />
            </li>
          </ul>
        </div>
      )}

      {playerScore > 0 && (
        <div>
          <h2>Players hand</h2>
          <p>Player score: {playerScore}</p>
          <ul>
            {playerHand.map((item) => (
              <li key={item.value + item.code}>
                <StyledCard alt={item.value + item.code} src={item.image} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Controls;
