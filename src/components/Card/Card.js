import styled from 'styled-components';
import AppContext from '../../context';

const StyledCard = styled.div`
  max-height: 200px;
  background-color: #f1f1f1;
  position: relative;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  max-height: 100px;
`;

const Card = () => (
  <AppContext.Consumer>
    {(img) => (
      <StyledCard>
        <StyledImage alt="card" src={img} />
      </StyledCard>
    )}
  </AppContext.Consumer>
);

export default Card;
