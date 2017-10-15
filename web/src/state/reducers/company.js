import {
  RECEIVE_COMPANY,
  REQUEST_COMPANY,
} from '../actions/company';

import { defaultCompany } from './defaultState';

const company = (state = defaultCompany, action) => {
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
