import styled from 'styled-components';
import { useEconomyContext } from '../../../context/Economy-Context';

const StyledCard = styled.img`
  max-width: 100px;
  max-height: 100px;
  @media (max-width: 600px) {
    max-width: 60px;
    max-height: 60px;
  }
`;

const StyledCardsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const StyledParagraph = styled.p`
  font-size: 16px;
  color: #fff;
`;

const StyledTitle = styled.h3`
  color: #fff;
  font-size: 1rem;
`;

const PlayersHand = () => {
  const { playerScore, gameStarted, playerHand } = useEconomyContext();

  return (
    playerScore > 0 &&
    gameStarted && (
      <div>
        <StyledTitle>Players hand</StyledTitle>
        <StyledParagraph>Player score: {playerScore}</StyledParagraph>
        <StyledCardsList>
          {playerHand.map((item) => (
            <li key={item.value + item.suit + item.code}>
              <StyledCard alt={item.value + item.code} src={item.image} />
            </li>
          ))}
        </StyledCardsList>
      </div>
    )
  );
};

export default PlayersHand;
