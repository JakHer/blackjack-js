import styled from 'styled-components';
import { useEconomyContext } from '../../context/Economy-Context';

const StyledButton = styled.button`
  outline: none;
  background: none;
  border: none;
  min-width: 60px;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  border: 1px dotted rgb(218, 223, 225);
  font-size: 1.3rem;

  :disabled {
    cursor: default;
    color: rgb(149, 165, 166);
    border: 1px dotted gray;
  }
`;

const StyledContainer = styled.div`
  position: absolute;
  top: 150px;
  left: 50%;
  margin-left: -200px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: 100px;
`;

const StyledCoinsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const BetButtons = () => {
  const {
    money,
    bet,
    setMoney,
    setBet,
    gameStarted,
    betValues,
  } = useEconomyContext();

  const increment = (amount) => {
    setBet(bet + amount);
    setMoney(money - amount);
  };

  const decrement = (amount) => {
    setBet(bet - amount);
    setMoney(money + amount);
  };

  return (
    <StyledContainer>
      <StyledCoinsContainer>
        {betValues.map((item) =>
          money <= 0 || item > money || gameStarted ? (
            <StyledButton
              disabled
              onClick={() => increment(item)}
              type="button"
            >
              +{item}
            </StyledButton>
          ) : (
            <StyledButton onClick={() => increment(item)} type="button">
              +{item}
            </StyledButton>
          ),
        )}
      </StyledCoinsContainer>

      <StyledCoinsContainer>
        {betValues.map((item) =>
          bet <= 0 || bet < item || gameStarted ? (
            <StyledButton
              disabled
              onClick={() => decrement(item)}
              type="button"
            >
              -{item}
            </StyledButton>
          ) : (
            <StyledButton onClick={() => decrement(item)} type="button">
              -{item}
            </StyledButton>
          ),
        )}
      </StyledCoinsContainer>
    </StyledContainer>
  );
};
