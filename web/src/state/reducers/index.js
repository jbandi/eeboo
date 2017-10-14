import { combineReducers } from 'redux';
import company from './company';
import feedbacker from './feedbacker';
import questionaire from './questionaire';

const eeboo = combineReducers({
  company,
  feedbacker,
  questionaire,
});

export default eeboo;
