import { combineReducers } from 'redux';
import company from './company';
import singleFeedbacker from './singleFeedbacker';
import questionaire from './questionaire';
import context from './context';

const eeboo = combineReducers({
  company,
  singleFeedbacker,
  questionaire,
  context,
});

export default eeboo;
