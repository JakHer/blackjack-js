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

const DealersHand = () => {
  const {
    dealerScore,
    gameStarted,
    firstDeal,
    returnValue,
    dealersHand,
  } = useEconomyContext();

  return (
    <div>
      {dealerScore > 0 && gameStarted && (
        <StyledTitle>Dealers hand</StyledTitle>
      )}
      {firstDeal ? (
        <StyledParagraph>
          Dealers score: {dealerScore - returnValue(dealersHand[1].value)}
        </StyledParagraph>
      ) : (
        <StyledParagraph>Dealers score: {dealerScore}</StyledParagraph>
      )}

      {firstDeal ? (
        <StyledCardsList>
          <li key={dealersHand[0].value + dealersHand[0].code}>
            <StyledCard
              alt={dealersHand[0].value + dealersHand[0].code}
              src={dealersHand[0].image}
            />
          </li>
          <li>
            <StyledCard
              alt="Hidden Card"
              src="https://www.pngkey.com/png/full/349-3492792_card-back.png"
            />
          </li>
        </StyledCardsList>
      ) : (
        <StyledCardsList>
          {dealersHand.map((item) => (
            <li key={item.value + item.code + item.suit}>
              <StyledCard alt={item.value + item.code} src={item.image} />
            </li>
          ))}
        </StyledCardsList>
      )}
    </div>
  );
};

export default DealersHand;
