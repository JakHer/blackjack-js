import styled from 'styled-components';
import { useEconomyContext } from '../../../context/Economy-Context';

const StyledBet = styled.p`
  color: #fff;
  position: absolute;
  top: 100px;
  left: 10px;
`;

const Bet = () => {
  const { bet } = useEconomyContext();
  return <StyledBet>{bet > 0 && `$${bet}`}</StyledBet>;
};

export default Bet;
