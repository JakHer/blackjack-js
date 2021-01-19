import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useEconomyContext } from '../../context/Economy-Context';

const StyledHisoryToggler = styled.button`
  position: relative;
  right: 0;
  max-width: 100px;
  margin: 0 auto;
`;

const StyledHistoryContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  min-width: 250px;
  max-width: 250px;
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

  const historyFromStorage =
    JSON.parse(localStorage.getItem('topHistoricResults')) || [];

  return (
    <StyledHistoryContainer>
      {historyFromStorage.length > 0 ? (
        <StyledHisoryToggler onClick={handleHistoryVisibility} type="button">
          Show Historic Results
        </StyledHisoryToggler>
      ) : (
        <StyledHisoryToggler disabled type="button">
          Show Historic Results
        </StyledHisoryToggler>
      )}

      {historyFromStorage && historyVisible && (
        <>
          <h1>Top historic results</h1>
          <ul>
            {historyFromStorage.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </>
      )}
    </StyledHistoryContainer>
  );
};

export default ScoreHistory;
