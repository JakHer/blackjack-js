import styled from 'styled-components';
import { useEconomyContext } from '../../context/Economy-Context';

const StyledRound = styled.p`
  color: #fff;
  position: absolute;
  width: 150px;
  margin-right: -75px;
  right: 50%;
  top: 0;
`;

const CurrentRound = () => {
  const { round } = useEconomyContext();

  return round > 0 && <StyledRound>Round {round} / 5</StyledRound>;
};

export default CurrentRound;
