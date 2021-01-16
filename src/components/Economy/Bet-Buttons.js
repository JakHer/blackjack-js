import { useEconomyContext } from '../../context/Economy-Context';

export const BetButtons = () => {
  const { money, bet, setMoney, setBet } = useEconomyContext();

  const increment = () => {
    setBet(bet + 50);
    setMoney(money - 50);
  };

  const decrement = () => {
    setBet(bet - 50);
    setMoney(money + 50);
  };

  return (
    <div>
      {money <= 0 ? (
        <button disabled onClick={increment} type="button">
          Increase
        </button>
      ) : (
        <button onClick={increment} type="button">
          Increase
        </button>
      )}
      {bet <= 0 ? (
        <button disabled onClick={decrement} type="button">
          Decrease
        </button>
      ) : (
        <button onClick={decrement} type="button">
          Decrease
        </button>
      )}
    </div>
  );
};
