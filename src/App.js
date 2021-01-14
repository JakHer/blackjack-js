import { useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [responseData, setResponseData] = useState(false);

  const fetchDeck = async () => {
    const result = await axios(
      'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6',
    );
    setResponseData(result.data);
  };

  // useEffect(() => {
  //   fetchDeck();
  // }, []);

  return (
    <>
      <button type="button" onClick={fetchDeck}>
        Start New Game
      </button>
      <p>{responseData}</p>
    </>
  );
};

export default App;
