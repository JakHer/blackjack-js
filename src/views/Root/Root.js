import './index.css';
import Controls from '../../components/Controls/Controls';

import { EconomyContextProvier } from '../../context/Economy-Context';
import { Economy } from '../../components/Economy/Economy';

const Root = () => (
  <>
    <EconomyContextProvier>
      <Economy />
      <Controls />
    </EconomyContextProvier>
  </>
);

export default Root;
