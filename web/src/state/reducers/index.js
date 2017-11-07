import { combineReducers } from 'redux';
import company from './company';
import feedbacker from './feedbacker';
import process from './process';

const eeboo = combineReducers({
  company,
  feedbacker,
  process,
});

export default eeboo;
