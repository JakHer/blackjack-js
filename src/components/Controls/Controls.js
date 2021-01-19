import styled from 'styled-components';
import { useEconomyContext } from '../../context/Economy-Context';
import Actions from '../Actions/Actions';

const StyledCard = styled.img`
  max-width: 100px;
  max-height: 100px;
`;

const StyledDeal = styled.button`
  outline: none;
  border: none;
  background: none;
  color: #fff;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 20px;
  margin-top: 30px;
  margin-left: -100px;
  width: 200px;
  transition: 0.4s ease color;

  :hover {
    color: red;
  }
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
    gameStarted,
    setGameStart,
    firstDeal,
    setFirstDeal,
    setPrize,
    round,
    setRound,
    setJustLoaded,
  } = useEconomyContext();

  const startGame = () => {
    setGameStart(true);
    setFirstDeal(true);
    setRound(round + 1);
    setJustLoaded(false);
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
          <h2>Dealears hand</h2>

          {firstDeal ? (
            <p>
              Dealears score: {dealerScore - returnValue(dealersHand[1].value)}
            </p>
          ) : (
            <p>Dealears score: {dealerScore}</p>
          )}
          {firstDeal ? (
            <ul>
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
          ) : (
            <ul>
              {dealersHand.map((item) => (
                <li key={item.value + item.code + item.suit}>
                  <StyledCard alt={item.value + item.code} src={item.image} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {playerScore > 0 && gameStarted && (
        <div>
          <h2>Players hand</h2>
          <p>Player score: {playerScore}</p>
          <ul>
            {playerHand.map((item) => (
              <li key={item.value + item.suit + item.code}>
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
