import deepFreeze from 'deep-freeze';
import singleFeedbacker from './singleFeedbacker';

import { defaultQuestionaire, defaultClient, defaultFeedbacker } from './defaultState';

import {
  UPDATE_ANSWER,
  REQUEST_SINGLE_FEEDBACKER,
  RECEIVE_SINGLE_FEEDBACKER,
} from '../actions/singleFeedbacker';

describe('singleFeedbacker reducer', () => {
  const state = {
    client: defaultClient.byHash,
    questionaire: defaultQuestionaire.byHash,
    feedbacker: defaultFeedbacker.byHash,
  };

  deepFreeze(state);

  it('should add an answer to a specific feedbacker', () => {
    const changedState = singleFeedbacker(state, {
      type: UPDATE_ANSWER,
      id: '1',
      questionId: 'ab',
      score: 4,
    });
    expect(changedState.feedbacker[1].answers.xy.score).toBe(3);
    expect(changedState.feedbacker[1].answers.ab.score).toBe(4);
  });

  it('should update an existing answer of a specific feedbacker', () => {
    const changedState = singleFeedbacker(state, {
      type: UPDATE_ANSWER,
      id: '2',
      questionId: 'cd',
      lastUpdated: '10',
      score: 4,
    });
    expect(changedState.feedbacker[2].answers.xy.score).toBe(3);
    expect(changedState.feedbacker[2].answers.cd.score).toBe(4);
  });

  it('should request a new feedbacker', () => {
    const changedState = singleFeedbacker(state, {
      type: REQUEST_SINGLE_FEEDBACKER,
    });
    expect(changedState.isFetchingSingleFeedbacker).toBe(true);
  });

  it('should receive a new feedbacker', () => {
    const changedState = singleFeedbacker(state, {
      type: RECEIVE_SINGLE_FEEDBACKER,
      feedbacker: state.feedbacker,
      client: state.client,
      questionaire: state.questionaire,
    });
    expect(changedState.feedbacker[1].id).toBe('1');
  });
});
