import styled from 'styled-components';
import { useEconomyContext } from '../../context/Economy-Context';

const StyledRound = styled.p`
  color: #fff;
  width: 100%;
  text-align: center;
  margin-top: 20px;
`;

const CurrentRound = () => {
  const { round } = useEconomyContext();

  return round > 0 && <StyledRound>Round {round} / 5</StyledRound>;
};

export default CurrentRound;
