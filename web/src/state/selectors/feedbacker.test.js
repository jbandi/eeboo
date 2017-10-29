import { feedbacker } from './feedbacker-data';

import {
  getFeedbacker,
  getFeedbackerClientIds,
  getContexts,
  getContextIds,
} from './feedbacker';

describe('test selectors for feedbacker', () => {
  const state = {
    feedbacker,
  };

  it('it should return a specific feedbacker from state', () => {
    expect(getFeedbacker(state).id).toEqual('feedbacker1');
  });

  it('should return an empty object if state is empty', () => {
    expect(getFeedbacker({})).toEqual({});
  });

  it('should return an empty list if feedbacker does not include clients', () => {
    expect(getFeedbackerClientIds({}).length).toEqual(0);
  });

  it('should return a list of all clients', () => {
    expect(getFeedbackerClientIds(state).length).toEqual(2);
  });

  it('should return a list of context objects', () => {
    expect(getContexts(state, 1234)[1].contents[0].content).toEqual('Teamfähigkeit');
  });

  it('should return contextIds as array', () => {
    expect(getContextIds(state, 1234).length).toEqual(2);
  });
});
