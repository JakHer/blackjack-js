import './index.css';

import Controls from '../../components/Controls/Controls';

import { EconomyContextProvier } from '../../context/Economy-Context';
import { Economy } from '../../components/Economy/Economy';
import History from '../../components/History/History';
import ScoreHistory from '../../components/ScoreHistory/ScoreHistory';
import SaveLoadGame from '../../components/SaveLoadGame/SaveLoadGame';
import ResetGame from '../../components/ResetGame/ResetGame';
import CurrentRound from '../../components/CurrentRound/CurrentRound';
import Money from '../../components/Economy/Money/Money';
import Bet from '../../components/Economy/Bet/Bet';

const Root = () => (
  <>
    <EconomyContextProvier>
      <SaveLoadGame />
      <Money />
      <Bet />
      <ResetGame />
      <CurrentRound />
      <Economy />
      <Controls />
      <History />
      <ScoreHistory />
    </EconomyContextProvier>
  </>
);
export default Root;
