import { combineReducers } from 'redux';
import company from './company';
import feedbacker from './feedbacker';
import questionaire from './questionaire';
import context from './context';

const eeboo = combineReducers({
  company,
  feedbacker,
  questionaire,
  context,
});

export default eeboo;
