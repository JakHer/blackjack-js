import { useEffect } from 'react';
import { useEconomyContext } from '../../context/Economy-Context';

const ScoreHistory = () => {
  const { historicArray } = useEconomyContext();

  historicArray.sort((a, b) => b - a);

  useEffect(() => {
    localStorage.setItem('topHistoricResults', JSON.stringify(historicArray));
  }, [historicArray]);

  const historyFromStorage =
    JSON.parse(localStorage.getItem('topHistoricResults')) || [];

  return (
    <div>
      <h1>Top historic results</h1>
      {historyFromStorage && (
        <p>
          {historyFromStorage.map((item) => (
            <li>{item}</li>
          ))}
        </p>
      )}
    </div>
  );
};

export default ScoreHistory;
