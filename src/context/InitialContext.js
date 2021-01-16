import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const InitialContext = createContext();

const initialState = {
  cardValues: {
    ACE: 11,
    KING: 10,
    QUEEN: 10,
    JACK: 10,
    10: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
  },
  gameStarted: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'START':
      return {
        gameStarted: true,
      };
    default:
      throw new Error();
  }
};

export const InitialContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { children } = props;

  return (
    <InitialContext.Provider value={[state, dispatch]}>
      {children}
    </InitialContext.Provider>
  );
};

InitialContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};
