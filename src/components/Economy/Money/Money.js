import { useEconomyContext } from '../../../context/Economy-Context';

const Money = () => {
  const { money } = useEconomyContext();

  return <h1>${money}</h1>;
};

export default Money;
