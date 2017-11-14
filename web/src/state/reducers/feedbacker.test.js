import deepFreeze from 'deep-freeze';
import feedbacker from './feedbacker';

import {
  REQUEST_FEEDBACKER,
  RECEIVE_FEEDBACKER,
  REQUEST_FEEDBACKERS,
  RECEIVE_FEEDBACKERS,
  UPDATE_ANSWER,
  UPDATE_ROLE,
} from '../actions/feedbacker';

describe('feedbacker reducer for a single feedbacker', () => {
  const state = {
    feedbacker: {
      id: 1,
      mail: 'mailx',
      clients: {
        client1: {
          id: 'client1',
          role: 'role1',
          answers: {
            question1: 3,
            question2: 4,
          },
        },
        client2: {
          id: 'client2',
          role: 'role2',
          answers: {},
        },
      },
      proc: {
        clients: {},
        questionaires: { 1234: {} },
      },
    },
  };

  const actionContent = {
    feedbacker: {
      id: 1,
      clients: {
        client1: {},
        client2: {},
      },
    },
    proc: {
      clients: {},
      questionaires: {
        1234: {},
      },
    },
  };

  deepFreeze(state);

  it('should request a new feedbacker', () => {
    const changedState = feedbacker(state, {
      type: REQUEST_FEEDBACKER,
    });
    expect(changedState.isFetchingFeedbacker).toBe(true);
  });

  it('should receive a new feedbacker', () => {
    const changedState = feedbacker(state, {
      type: RECEIVE_FEEDBACKER,
      feedbacker: actionContent.feedbacker,
    });
    expect(changedState.id).toBe(1);
  });

  it('should add an answer', () => {
    const changedState = feedbacker(state.feedbacker, {
      type: UPDATE_ANSWER,
      clientId: 'client2',
      questionId: 'question1',
      score: 5,
    });
    expect(changedState.clients.client2.answers.question1).toBe(5);
  });

  it('should update an existing answer', () => {
    const changedState = feedbacker(state.feedbacker, {
      type: UPDATE_ANSWER,
      clientId: 'client1',
      questionId: 'question1',
      score: 5,
    });
    expect(changedState.clients.client1.answers.question1).toBe(5);
  });

  it('should update rold', () => {
    const changedState = feedbacker(state.feedbacker, {
      type: UPDATE_ROLE,
      clientId: 'client1',
      roleId: 'role5',
    });
    expect(changedState.clients.client1.role).toBe('role5');
  });
});

describe('feedbacker reducer for multiple feedbacker', () => {
  const state = ({
    feedbackers: [],
  });
  const actionContent = [{
    id: 'feedbacker1',
  }, {
    id: 'feedbacker2',
  }];
  deepFreeze(state);

  it('should request a list of feedbackers', () => {
    const changedState = feedbacker(state, {
      type: REQUEST_FEEDBACKERS,
    });
    expect(changedState.isFetchingFeedbackers).toBe(true);
  });

  it('should receive a list of feedbackers', () => {
    const changedState = feedbacker(state, {
      type: RECEIVE_FEEDBACKERS,
      feedbackers: actionContent,
    });
    expect(changedState.isFetchingFeedbackers).toBe(false);
    expect(changedState.feedbackers.length).toBe(2);
  });
});
