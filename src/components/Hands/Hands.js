// import { useEconomyContext } from '../../context/Economy-Context';
import styled from 'styled-components';

import PlayersHand from './PlayersHand/PlayersHand';
import DealersHand from './DealersHand/DealersHand';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  min-height: 50vh;
  z-index: -1;
`;

const Hands = () => (
  <StyledWrapper>
    <DealersHand />
    <PlayersHand />
  </StyledWrapper>
);

export default Hands;
