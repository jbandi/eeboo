import {
  RECEIVE_COMPANY,
  REQUEST_COMPANY,
} from '../actions/company';

const defaultState = {
  idFechting: false,
  id: 1,
  name: 'eeboo',
  color: '#01DF74',
  mail: 'mathu at example.com',
  lastUpdated: Date.now(),
};

const company = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_COMPANY:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_COMPANY:
      return Object.assign({}, state, {
        isFetching: false,
        id: action.id,
        name: action.name,
        color: action.color,
        mail: action.mail,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
};

export default company;
