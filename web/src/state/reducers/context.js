import { defaultContext } from './defaultState';

const context = (state = defaultContext, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default context;
