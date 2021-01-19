import styled from 'styled-components';
import { useEconomyContext } from '../../../context/Economy-Context';

const StyledMoney = styled.h2`
  position: absolute;
  bottom: 20px;
  left: 50%;
  width: 100px;
  margin-left: -100px;
  color: #fff;

  @media (max-width: 600px) {
    margin-left: -50px;
  }
`;

const Money = () => {
  const { money } = useEconomyContext();

  return <StyledMoney>${money}</StyledMoney>;
};

export default Money;
