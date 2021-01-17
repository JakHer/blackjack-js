import { useEconomyContext } from '../../context/Economy-Context';

export const BetButtons = () => {
  const {
    money,
    bet,
    setMoney,
    setBet,
    gameStarted,
    betValues,
  } = useEconomyContext();

  const increment = (amount) => {
    setBet(bet + amount);
    setMoney(money - amount);
  };

  const decrement = (amount) => {
    setBet(bet - amount);
    setMoney(money + amount);
  };

  return (
    <div>
      {betValues.map((item) =>
        money <= 0 || item > money || gameStarted ? (
          <button disabled onClick={() => increment(item)} type="button">
            +{item}
          </button>
        ) : (
          <button onClick={() => increment(item)} type="button">
            +{item}
          </button>
        ),
      )}

      {betValues.map((item) =>
        bet <= 0 || bet < item || gameStarted ? (
          <button disabled onClick={() => decrement(item)} type="button">
            -{item}
          </button>
        ) : (
          <button onClick={() => decrement(item)} type="button">
            -{item}
          </button>
        ),
      )}
    </div>
  );
};
