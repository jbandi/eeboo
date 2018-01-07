import { feedbacker } from './feedbacker-data';

import {
  getFirstFeedbacker,
  getFeedbackerClientIds,
  feedbackerExists,
  getFeedbackerAnswer,
  getFeedbackerAnswers,
  getRoleIdByClientId,
  clientsContainId,
  getFeedbackerIdsByClientId,
  getFeedbackerWithoutClients,
  getNumAnswers,
} from './feedbacker';

describe('test selectors for feedbacker', () => {
  const state = {
    feedbacker,
  };

  it('it should return a specific feedbacker from state', () => {
    expect(getFirstFeedbacker(state).id).toEqual('feedbacker1');
  });

  it('should return an empty object if state is empty', () => {
    expect(getFirstFeedbacker({})).toEqual({});
  });

  it('should return an empty list if feedbacker does not include clients', () => {
    expect(getFeedbackerClientIds({}).length).toEqual(0);
  });

  it('should return a list of all clients', () => {
    expect(getFeedbackerClientIds(state, 'feedbacker1').length).toEqual(2);
  });

  it('should return a specific answer', () => {
    expect(getFeedbackerAnswer(state, 'feedbacker1', 'client2', 'question1')).toEqual(3);
  });

  it('should return -1 if question not found', () => {
    expect(getFeedbackerAnswer(state, 'client1', 'undef')).toEqual(0);
  });

  it('should return -1 if client not found', () => {
    expect(getFeedbackerAnswer(state, 'undef', 'question1')).toEqual(0);
  });

  it('should return an array of answers for a client', () => {
    expect(getFeedbackerAnswers(state, 'feedbacker1', 'client2').question1).toEqual(3);
  });

  it('should return a role for a client', () => {
    expect(getRoleIdByClientId(state, 'feedbacker1', 'client1')).toEqual('role2');
  });

  it('should test if a feedbacker exists', () => {
    expect(feedbackerExists({
      feedbacker,
    }, { id: '1', mail: 'feedbacker1@example.com' })).toEqual(true);
  });

  it('should test if a feedbacker does not exist', () => {
    expect(feedbackerExists({
      feedbacker,
    }, { id: '1', mail: 'undefined' })).toEqual(false);
  });

  it('should check if a list of clients contains a specific client id', () => {
    expect(clientsContainId({ client1: '', client2: '' }, 'client1')).toEqual(true);
  });

  it('should check if a list of clients does not contain a specific client id', () => {
    expect(clientsContainId({ client1: '', client2: '' }, 'undef')).toEqual(false);
  });

  it('should get a list of feedbackers that contain a specific client id', () => {
    expect(getFeedbackerIdsByClientId({
      feedbacker,
    }, 'client3')).toEqual(['feedbacker2']);
  });

  it('should get a list of feedbackers withoud clientID', () => {
    expect(getFeedbackerWithoutClients({
      feedbacker: {
        feedbackers: [
          { id: 'f1', clients: { 1: '1' } },
          { id: 'f2', clients: {} },
        ],
      },
    })).toEqual(['f2']);
  });

  it('should get the total count of answers', () => {
    expect(getNumAnswers({ feedbacker }, 'feedbacker2')).toEqual(5);
  });
});
