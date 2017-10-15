import { defaultQuestionaire } from './defaultState';

const questionaire = (state = defaultQuestionaire, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default questionaire;
