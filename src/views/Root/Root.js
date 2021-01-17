import './index.css';
import Controls from '../../components/Controls/Controls';

import { EconomyContextProvier } from '../../context/Economy-Context';
import { Economy } from '../../components/Economy/Economy';
import History from '../../components/History/History';

const Root = () => (
  <>
    <EconomyContextProvier>
      <Economy />
      <Controls />
      <History />
    </EconomyContextProvier>
  </>
);

export default Root;
