import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useEconomyContext } from '../../context/Economy-Context';

const slide = keyframes`
  0% {
    transform: translate(-50px);
    opacity: 0;
  }

  100% {
    transform: translate(0);
    opacity: 1;
  }
`;

const StyledHistory = styled.ul`
  background: #f1f1f1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  z-index: 99999;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  animation: ${slide} 0.4s ease 1;
  font-size: 12px;
  max-height: 100vh;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const StyledButton = styled.button`
  outline: none;
  background: none;
  cursor: pointer;
  border: none;
  color: #000;
  position: fixed;
  bottom: 20px;
  left: 10px;
  width: 100px;
  border: 1px solid #000;
  z-index: 1999;
  transition: 0.4s ease background;

  :hover {
    background: yellow;
  }
`;

const StyledLi = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: rgba(34, 167, 240, 0.4);
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
`;

const History = () => {
  const { dealerHistory, roundArray } = useEconomyContext();

  const [historyVisible, setHistoryVisibility] = useState(false);

  const handleHistoryVisibility = () => {
    setHistoryVisibility(!historyVisible);
  };

  return (
    <div>
      {dealerHistory && roundArray.length > 0 && (
        <StyledButton type="button" onClick={handleHistoryVisibility}>
          Show Rounds History
        </StyledButton>
      )}
      {historyVisible && roundArray && (
        <StyledHistory>
          {roundArray.map((item) => [
            <StyledLi>
              <p>Round: {item[4]}</p>
              <p>Dealer Hand: </p>
              {item[0].map((dh) => (
                <li key={dh.suit + dh.value}>{`${dh.suit} ${dh.value}`}</li>
              ))}
              <p>Player Hand</p>
              {item[1].map((ph) => (
                <li key={ph.suit + ph.value}>{`${ph.suit} ${ph.value}`}</li>
              ))}
              <p>Dealer Score: {item[2]}</p>
              <p>Player Score: {item[3]}</p>
            </StyledLi>,
          ])}
        </StyledHistory>
      )}
    </div>
  );
};

export default History;
