import { combineReducers } from 'redux';
import company from './company';
import feedbacker from './feedbacker';
import proc from './proc';

const eeboo = combineReducers({
  company,
  feedbacker,
  proc,
});

export default eeboo;
