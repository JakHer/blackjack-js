import './index.css';

import Controls from '../../components/Controls/Controls';

import { EconomyContextProvier } from '../../context/Economy-Context';
import { Economy } from '../../components/Economy/Economy';
import History from '../../components/History/History';
import ScoreHistory from '../../components/ScoreHistory/ScoreHistory';
import SaveLoadGame from '../../components/SaveLoadGame/SaveLoadGame';
import ResetGame from '../../components/ResetGame/ResetGame';

const Root = () => (
  <>
    <EconomyContextProvier>
      <SaveLoadGame />
      <ResetGame />
      <Economy />
      <Controls />
      <History />
      <ScoreHistory />
    </EconomyContextProvier>
  </>
);
export default Root;
