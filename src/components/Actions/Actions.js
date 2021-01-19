import { useEffect } from 'react';
import { useEconomyContext } from '../../context/Economy-Context';

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
    // console.log(dealerScore);
    // console.log(playerScore);
    setFirstDeal(false);

    console.log(dealersHand);
    console.log(playerHand);

    let value0 = 0;

    if (playerScore >= dealerScore) {
      console.log('Pobieram nowa karte bo za malo');
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
    console.log(
      `ILE MAJOM DILERZY: ${dealerScore} ${playerScore} ${firstDeal} ${dealersMove}`,
    );

    console.log(`Is round over: ${roundOver}`);
    console.log(`Round ${round}`);

    if (double && firstDeal) {
      setPrize(prize * 2);
      setDouble(false);

      if (playerScore <= 21) {
        stand();
      }
    }

    if (dealerScore === 21 && firstDeal && !dealersMove) {
      console.log('To Tu KURWO');
      // setPlayersMove(true);
    }

    if (playerScore > 21 && !roundOver) {
      console.log('Player LOSE');
      setFirstDeal(false);
      setRoundOver(true);
      setDealerWin(true);
      setBet(0);
      setMoney(money);
    } else if (playerScore === 21 && !dealerScore === 21) {
      console.log('PLAYER BLACKJACK');
      setFirstDeal(false);
      setRoundOver(true);
      setPlayerWin(true);
      setMoney(money + prize);
      setBet(0);
    } else if (playerScore === 21 && dealerScore === 21 && dealersMove) {
      console.log('Player ma blackjacka  i dealer tez weic remix');
      setFirstDeal(false);
      setDealersMove(false);
      setRoundOver(true);
      setDealerWin(false);
      setTie(true);
      setMoney(money);
      setBet(0);
    } else if (dealerScore === 21 && playerScore < dealerScore && !firstDeal) {
      console.log('Wygrwa diler bo ma 21 i wiecej niz player');
      setFirstDeal(false);
      setDealersMove(false);
      setRoundOver(true);
      setDealerWin(true);
      setTie(false);
      setMoney(money);
      setBet(0);
    }

    if (!firstDeal && dealerScore === 22 && dealersHand.length === 2) {
      console.log('DEALER Ma 2 ASY CO ZA ASY');
      setDealerScore(21);
    }

    if (!firstDeal && playerScore === 22 && playerHand.length === 2) {
      console.log('PLAYER Ma 2 ASY CO ZA ASY');
      setPlayerScore(21);
    }

    if (playerScore > 21 && firstDeal) {
      console.log('PO CO FECZOWAĆ, I TAK KASZTAN PRZEGgrał');
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
      console.log('dodatkowy stand dealera ');
      stand();
      setDealersMove(true);
    }

    if (
      playerScore === dealerScore &&
      dealerScore < 21 &&
      !firstDeal &&
      !roundOver
    ) {
      console.log('BYLBY REMIS ALE JEBANIE JEDZIE DALEJ Z KURWAMI (DEALER)');

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
      console.log('TIE');
      setFirstDeal(false);
      setRoundOver(true);
      setTie(true);
      setDealersMove(false);
      setBet(0);
      setMoney(money + prize);
    }

    if (dealerScore > 21 && !firstDeal && dealersMove) {
      console.log('Player wygrywa bo dealer ma wiecej niz 21');
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
      console.log('dealer score = 21 i nie pierwszy deal');
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
      console.log(
        'Dealer wygrywa bo ma wiecej punktow i player nie ma blackjacka i dealer ma mniej niz 21 punktow',
      );
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
      console.log(
        'Player Wygrywa bo ma wiecej punktow i delaer nie ma blackjacka i player ma mniej niz 21 punktow',
      );
      setFirstDeal(false);
      setRoundOver(true);
      setPlayerWin(true);
      setDealerWin(false);
      setMoney(money + prize);
      setBet(0);
    }

    if (dealerScore <= 21 && dealerScore > playerScore && !firstDeal) {
      console.log('Kasztanie wygrywa diler');
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
    <div>
      <button onClick={hit} type="button">
        Hit
      </button>
      <button onClick={stand} type="button">
        Stand
      </button>
      {firstDeal && !denyDouble && (
        <button onClick={doubleDown} type="button">
          Double
        </button>
      )}
    </div>
  ) : (
    gameStarted && roundOver && (
      <div>
        <p>Round {round} / 5</p>
        {dealerWin && <p>Dealer Wins!</p>}
        {playerWin && <p>Win ${prize}</p>}
        {tie && <p>Tie</p>}
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
