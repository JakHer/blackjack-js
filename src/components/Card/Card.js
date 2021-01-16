import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const Card = ({ src }) => (
  <StyledCard>
    <StyledImage alt="card" src={src} />
  </StyledCard>
);

Card.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Card;
