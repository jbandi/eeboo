import {
  getProcs,
  getProcess,
  getClients,
  getQuestionaires,
  getQuestionaire,
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
          questionaires: {
            1: {
              id: 1,
            },
          },
        },
        2: {
          clients: {
            client1: { id: 'client1' },
          },
          id: '2',
          questionaires: {
            1: {
              id: 1,
            },
          },
        },
      },
    },
  };

  it('it should return a list of process Ids', () => {
    expect(getProcs(state)[1]).toEqual('2');
  });

  it('it should return an empty list if no procs found', () => {
    expect(getProcs({}).length).toEqual(0);
  });

  it('it should return a process by Id', () => {
    expect(getProcess(state, 2).id).toEqual('2');
  });

  it('it should return a list of clients for a specific process', () => {
    expect(getClients(state, 1)[1].id).toEqual('client2');
  });

  it('it should return an empty list if process id not found', () => {
    expect(getClients(state, 3).length).toEqual(0);
  });

  it('it should return a list of questionaires for a specific process', () => {
    expect(getQuestionaires(state, 1)[0].id).toEqual(1);
  });

  it('it should return an empty list if procId not found', () => {
    expect(getQuestionaires(state, 3).length).toEqual(0);
  });

  it('it should return specific questionaire', () => {
    expect(getQuestionaire(state, 2, 1).id).toEqual(1);
  });
});
