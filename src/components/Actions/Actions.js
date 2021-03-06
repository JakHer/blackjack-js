import { useEffect } from 'react';
import styled from 'styled-components';
import { useEconomyContext } from '../../context/Economy-Context';

const StyledButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 50px;
`;

const StyledButton = styled.button`
  outline: none;
  background: none;
  border: 1px solid #fff;
  color: #fff;
  margin: 0 5px;
  cursor: pointer;
  transition: 0.4s ease opacity;

  :hover {
    opacity: 0.7;
  }
`;

const StyledSummaryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ParagraphWin = styled.p`
  color: rgba(41, 241, 195, 1);
`;

const ParagraphLost = styled.p`
  color: red;
`;

const ParagraphTie = styled.p`
  color: #fff;
`;

const Actions = () => {
  const {
    setPrize,
    setFirstDeal,
    deckID,
    returnValue,
    setPlayerHand,
    playerHand,
    setPlayerScore,
    playerScore,
    setGameStart,
    gameStarted,
    setBet,
    money,
    setMoney,
    prize,
    roundOver,
    setRoundOver,
    playerWin,
    setPlayerWin,
    dealerWin,
    setDealerWin,
    dealerScore,
    setDealersHand,
    setDealerScore,
    round,
    dealersHand,
    firstDeal,
    setDealerHistory,
    dealerHistory,
    playerHistory,
    setPlayerHistory,
    dealerScoreHistory,
    setDealerScoreHistory,
    playerScoreHistory,
    setPlayerScoreHistory,
    roundArray,
    setRoundArray,
    setRound,
    tie,
    setTie,
    dealersMove,
    setDealersMove,
    double,
    setDouble,
    bet,
    historicArray,
    setHistoricArray,
    denyDouble,
    setDenyDouble,
    savedGame,
  } = useEconomyContext();

  const reset = () => {
    setRoundArray([
      ...roundArray,
      [[...dealersHand], [...playerHand], dealerScore, playerScore, round],
    ]);

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
  };

  const reshuffle = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/shuffle/`)
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json);
      })
      .then(() => setHistoricArray([...historicArray, money]))
      .then(() => reset())
      .then(() => {
        setMoney(1000);
        setRound(0);
        setRoundArray([]);
      })
      .catch((err) => console.log(err.name));
  };

  const hit = () => {
    setRoundOver(false);
    setDenyDouble(true);
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
      .then((resp) => resp.json())
      .then((json) => {
        const value0 = returnValue(json.cards[0].value);

        setPlayerHand([...playerHand, ...json.cards]);

        setPlayerScore(playerScore + value0);
      })
      .catch((err) => console.log(err.name));
  };

  const stand = () => {
    setFirstDeal(false);

    let value0 = 0;

    if (playerScore >= dealerScore) {
      fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
        .then((resp) => resp.json())
        .then((json) => {
          value0 = returnValue(json.cards[0].value);
          setDealersHand([...dealersHand, json.cards[0]]);
          setDealerScore(dealerScore + value0);
          setDealersMove(true);
        });
    }
  };

  const doubleDown = () => {
    setDouble(true);
    setBet(bet * 2);
    setPrize(bet * 2);
    setMoney(money - bet);
    hit();
  };

  useEffect(() => {
    if (double && firstDeal) {
      setPrize(prize * 2);
      setDouble(false);

      if (playerScore <= 21) {
        stand();
      }
    }

    if (playerScore > 21 && !roundOver) {
      setFirstDeal(false);
      setRoundOver(true);
      setDealerWin(true);
      setBet(0);
      setMoney(money);
    } else if (playerScore === 21 && !dealerScore === 21) {
      setFirstDeal(false);
      setRoundOver(true);
      setPlayerWin(true);
      setMoney(money + prize);
      setBet(0);
    } else if (playerScore === 21 && dealerScore === 21 && dealersMove) {
      setFirstDeal(false);
      setDealersMove(false);
      setRoundOver(true);
      setDealerWin(false);
      setTie(true);
      setMoney(money);
      setBet(0);
    } else if (dealerScore === 21 && playerScore < dealerScore && !firstDeal) {
      setFirstDeal(false);
      setDealersMove(false);
      setRoundOver(true);
      setDealerWin(true);
      setTie(false);
      setMoney(money);
      setBet(0);
    }

    if (!firstDeal && dealerScore === 22 && dealersHand.length === 2) {
      setDealerScore(21);
    }

    if (!firstDeal && playerScore === 22 && playerHand.length === 2) {
      setPlayerScore(21);
    }

    if (playerScore > 21 && firstDeal) {
      setFirstDeal(false);
      setRoundOver(true);
      setDealerWin(true);
      setBet(0);
      setMoney(money);
    }

    if (
      dealerScore < 21 &&
      dealerScore < playerScore &&
      !firstDeal &&
      !roundOver &&
      dealersMove
    ) {
      stand();
      setDealersMove(true);
    }

    if (
      playerScore === dealerScore &&
      dealerScore < 21 &&
      !firstDeal &&
      !roundOver
    ) {
      if (
        dealerScore <= 21 &&
        dealerScore >= playerScore &&
        !firstDeal &&
        !dealersMove
      )
        stand();
    }

    if (
      playerScore === dealerScore &&
      dealerScore === 20 &&
      !firstDeal &&
      dealersMove
    ) {
      setFirstDeal(false);
      setRoundOver(true);
      setTie(true);
      setDealersMove(false);
      setBet(0);
      setMoney(money + prize);
    }

    if (dealerScore > 21 && !firstDeal && dealersMove) {
      setDealersMove(false);
      setFirstDeal(false);
      setRoundOver(true);
      setPlayerWin(true);
      setTie(false);
      setDealerWin(false);
      setBet(0);
      setMoney(money + prize);
    }

    if (dealerScore === 21 && !firstDeal) {
      setFirstDeal(false);
      setRoundOver(true);
      setDealerWin(true);
      setBet(0);
      setMoney(money);
    }

    if (
      dealerScore > playerScore &&
      playerScore <= 21 &&
      dealerScore < 21 &&
      !firstDeal &&
      dealersMove
    ) {
      setFirstDeal(false);
      setDealersMove(false);
      setRoundOver(true);
      setDealerWin(true);
      setPlayerWin(false);
      setBet(0);
      setMoney(money);
    }

    if (
      playerScore > dealerScore &&
      dealerScore <= 21 &&
      playerScore < 21 &&
      !firstDeal &&
      roundOver &&
      dealersMove
    ) {
      setFirstDeal(false);
      setRoundOver(true);
      setPlayerWin(true);
      setDealerWin(false);
      setMoney(money + prize);
      setBet(0);
    }

    if (dealerScore <= 21 && dealerScore > playerScore && !firstDeal) {
      setFirstDeal(false);
      setRoundOver(true);
      setDealerWin(true);
      setBet(0);
      setMoney(money);
    }
  }, [playerScore, dealerScore, firstDeal, dealersMove, savedGame]);

  useEffect(() => {
    setDealerHistory([...dealerHistory, ...dealersHand]);

    setPlayerHistory([...playerHistory, ...playerHand]);

    setDealerScoreHistory([...dealerScoreHistory, dealerScore]);

    setPlayerScoreHistory([...playerScoreHistory, playerScore]);
  }, [round]);

  return !roundOver ? (
    <StyledButtonsWrapper>
      <StyledButton onClick={hit} type="button">
        Hit
      </StyledButton>
      <StyledButton onClick={stand} type="button">
        Stand
      </StyledButton>
      {firstDeal && !denyDouble && (
        <StyledButton onClick={doubleDown} type="button">
          Double
        </StyledButton>
      )}
    </StyledButtonsWrapper>
  ) : (
    gameStarted && roundOver && (
      <StyledSummaryWrapper>
        {dealerWin && <ParagraphLost>Dealer Wins!</ParagraphLost>}
        {playerWin && <ParagraphWin>Win ${prize}</ParagraphWin>}
        {tie && <ParagraphTie>Tie</ParagraphTie>}
        {round < 5 ? (
          <StyledButton type="button" onClick={reset}>
            Next Round
          </StyledButton>
        ) : (
          <StyledButton type="button" onClick={reshuffle}>
            Start New Game
          </StyledButton>
        )}
      </StyledSummaryWrapper>
    )
  );
};

export default Actions;
