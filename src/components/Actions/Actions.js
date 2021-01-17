import { useEffect } from 'react';
import { useEconomyContext } from '../../context/Economy-Context';

const Actions = () => {
  const {
    // firstDeal,
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
    // firstDeal,
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
  } = useEconomyContext();

  const reset = () => {
    // setDealerHistory([...dealerHistory, ...dealersHand]);

    // setPlayerHistory([...playerHistory, ...playerHand]);

    // setDealerScoreHistory([...dealerScoreHistory, dealerScore]);

    // setPlayerScoreHistory([...playerScoreHistory, playerScore]);

    setRoundArray([
      ...roundArray,
      [[...dealersHand], [...playerHand], dealerScore, playerScore, round],
    ]);

    setPlayerWin(false);
    setDealerWin(false);
    setGameStart(false);
    setRoundOver(false);
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
      .then(() => reset())
      .then(() => {
        setMoney(1000);
        setRound(0);
        setRoundArray([]);
      })
      .catch((err) => console.log(err.name));
  };

  const hit = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
      .then((resp) => resp.json())
      .then((json) => {
        const value0 = returnValue(json.cards[0].value);

        setPlayerHand([...playerHand, json.cards[0]]);

        setPlayerScore(playerScore + value0);
      })
      .catch((err) => console.log(err.name));
  };

  const stand = () => {
    setFirstDeal(false);

    // if (dealerScore > 15) {
    //   fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    //     .then((resp) => resp.json())
    //     .then((json) => {
    //       const value0 = returnValue(json.cards[0].value);

    //       setDealersHand([...dealersHand, json.cards[0]]);

    //       setDealerScore(dealerScore + value0);
    //       console.log(dealersHand);
    //     });
    // }
  };

  useEffect(() => {
    if (playerScore > 21) {
      console.log('LOSE');
      setFirstDeal(false);
      setRoundOver(true);
      setDealerWin(true);
      setBet(0);
      setMoney(money);
    } else if (playerScore === 21) {
      console.log('BLACKJACK');
      setFirstDeal(false);
      setRoundOver(true);
      setPlayerWin(true);
      setMoney(money + prize * 1.5);
      setBet(0);
    }
    console.log(round);
    if (round > 5) {
      console.log('Game Over');
    }
  }, [playerScore]);

  useEffect(() => {
    setDealerHistory([...dealerHistory, ...dealersHand]);

    setPlayerHistory([...playerHistory, ...playerHand]);

    setDealerScoreHistory([...dealerScoreHistory, dealerScore]);

    setPlayerScoreHistory([...playerScoreHistory, playerScore]);
  }, [round]);

  return !roundOver ? (
    <div>
      <button onClick={hit} type="button">
        Hit
      </button>
      <button onClick={stand} type="button">
        Stand
      </button>
    </div>
  ) : (
    gameStarted && roundOver && (
      <div>
        <p>Round {round} / 5</p>
        {dealerWin && <p>Dealer Wins!</p>}
        {playerWin && <p>Win {prize * 1.5}$</p>}
        {round < 5 ? (
          <button type="button" onClick={reset}>
            Next Round
          </button>
        ) : (
          <button type="button" onClick={reshuffle}>
            Start New Game
          </button>
        )}
      </div>
    )
  );
};

export default Actions;
