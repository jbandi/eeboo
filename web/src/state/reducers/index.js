import { combineReducers } from 'redux';
import feedbacker from './feedbacker';
import process from './process';

const eeboo = combineReducers({
  feedbacker,
  process,
});

export default eeboo;
