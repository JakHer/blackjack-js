import { useEconomyContext } from '../../../context/Economy-Context';

const Bet = () => {
  const { bet } = useEconomyContext();
  return <h1>{bet > 0 && `$${bet}`}</h1>;
};

export default Bet;
