import {
  getProcs,
  getProcess,
  getClients,
} from './process';

describe('test selectors for processes', () => {
  const state = {
    process: {
      byId: ['1', '2'],
      byHash: {
        1: {
          clients: {
            client1: { id: 'client1' },
            client2: { id: 'client2' },
          },
          id: '1',
          questionaires: {},
        },
        2: {
          clients: {
            client1: { id: 'client1' },
          },
          id: '2',
          questionaires: {},
        },
      },
    },
  };

  it('it should return a list of process Ids', () => {
    expect(getProcs(state)[1]).toEqual('2');
  });

  it('it should return an empty list if no procs found', () => {
    expect(getProcs({})).toEqual([]);
  });

  it('it should return a process by Id', () => {
    expect(getProcess(state, 2).id).toEqual('2');
  });

  it('it should return a list of clients for a specific process', () => {
    expect(getClients(state, 1)[1].id).toEqual('client2');
  });
});
