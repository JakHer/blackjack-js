import styled from 'styled-components';
import { useEconomyContext } from '../../context/Economy-Context';

const StyledHistory = styled.div`
  background: #f1f1f1;
  display: flex;
  flex-direction: column;
`;

const History = () => {
  const {
    dealerHistory,
    // playerHistory,
    // dealerScoreHistory,
    // playerScoreHistory,
    roundArray,
  } = useEconomyContext();

  return (
    <div>
      {dealerHistory && (
        <StyledHistory>
          {roundArray.map((item) => [
            <p>Round: {item[4]}</p>,
            <p>Dealer Hand</p>,
            item[0].map((dh) => (
              <li key={dh.suit + dh.value}>{`${dh.suit} ${dh.value}`}</li>
            )),
            <p>Player Hand</p>,
            item[1].map((ph) => (
              <li key={ph.suit + ph.value}>{`${ph.suit} ${ph.value}`}</li>
            )),
            <p>Dealer Score: {item[2]}</p>,
            <p>Player Score: {item[3]}</p>,
          ])}
          {/* {roundArray.map((item) => item[0].map((dh) => <li>{dh.suit}</li>))}
          <p>Playre Hand</p>
          {roundArray.map((item) => item[1].map((ph) => <li>{ph.suit}</li>))} */}
        </StyledHistory>
      )}
    </div>
  );
};

export default History;
