import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useEconomyContext } from '../../context/Economy-Context';

const slide = keyframes`
  0% {
    transform: translate(50px);
    opacity: 0;
  }

  100% {
    transform: translate(0);
    opacity: 1;
  }
`;

const StyledHisoryToggler = styled.button`
  position: fixed;
  right: 10px;
  max-width: 100px;
  margin: 0 auto;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  transition: 0.4s ease background;
  border: 1px solid #000;
  z-index: 9999;

  :hover {
    background: yellow;
  }
`;

const StyledH2 = styled.h2`
  margin: 70px 0 20px 0;
  text-align: center;
`;

const StyledHistoryContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 0;
  display: flex;
  flex-direction: column;
  min-width: 250px;
  max-width: 250px;
`;

const StyledArrayComponent = styled.div`
  animation: ${slide} 0.4s ease 1;
  background: rgb(189, 195, 199);
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const StyledLi = styled.li`
  padding: 10px 0;
`;

const ScoreHistory = () => {
  const { historicArray } = useEconomyContext();

  const [historyVisible, setHistoryVisible] = useState(false);

  const handleHistoryVisibility = () => {
    setHistoryVisible(!historyVisible);
  };

  historicArray.sort((a, b) => b - a);

  useEffect(() => {
    localStorage.setItem('topHistoricResults', JSON.stringify(historicArray));
  }, [historicArray]);

  let historyFromStorage =
    JSON.parse(localStorage.getItem('topHistoricResults')) || [];

  historyFromStorage = [...new Set(historyFromStorage)].slice(0, 5);

  return (
    <StyledHistoryContainer>
      {historyFromStorage.length > 0 ? (
        <StyledHisoryToggler onClick={handleHistoryVisibility} type="button">
          {historyVisible ? 'Hide ' : 'Show '}
          Historic Results
        </StyledHisoryToggler>
      ) : (
        <StyledHisoryToggler disabled type="button">
          Show Historic Results
        </StyledHisoryToggler>
      )}

      {historyFromStorage && historyVisible && (
        <StyledArrayComponent>
          <StyledH2>Top historic results</StyledH2>
          <StyledUl>
            {historyFromStorage.map((item) => (
              <StyledLi key={item}>{item}</StyledLi>
            ))}
          </StyledUl>
        </StyledArrayComponent>
      )}
    </StyledHistoryContainer>
  );
};

export default ScoreHistory;
