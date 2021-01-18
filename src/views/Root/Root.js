import './index.css';
import Controls from '../../components/Controls/Controls';

import { EconomyContextProvier } from '../../context/Economy-Context';
import { Economy } from '../../components/Economy/Economy';
import History from '../../components/History/History';
import ScoreHistory from '../../components/ScoreHistory/ScoreHistory';

const Root = () => (
  <>
    <EconomyContextProvier>
      <Economy />
      <Controls />
      <History />
      <ScoreHistory />
    </EconomyContextProvier>
  </>
);

export default Root;
