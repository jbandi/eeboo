import {
  getProcs,
  getProcess,
  getClients,
  clientExists,
  getQuestionaires,
  getQuestionaire,
  getLanguage,
  getContextById,
} from './process';

import { Language } from '../../utils';

describe('test selectors for processes', () => {
  const state = {
    process: {
      byId: ['1', '2'],
      byHash: {
        1: {
          clients: {
            client1: { id: 'client1', mail: 'c1@example.com' },
            client2: { id: 'client2', mail: 'c2@examle.com' },
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
            client1: { id: 'client1', mail: 'c1@example.com' },
          },
          id: '2',
          questionaires: {
            1: {
              id: 1,
              contexts: {
                A: { id: 'A' },
                B: { id: 'B' },
              },
            },
          },
        },
      },
    },
  };

  it('it should return specific context by its id', () => {
    expect(getContextById(state, 2, 1, 'A').id).toEqual('A');
  });

  it('it should return an empty Object if context does not exist', () => {
    expect(getContextById(state, 3, 1, 'A')).toEqual({});
  });

  it('should return a list of process Ids', () => {
    expect(getProcs(state)[1]).toEqual('2');
  });

  it('should return an empty list if no procs found', () => {
    expect(getProcs({}).length).toEqual(0);
  });

  it('should return a process by Id', () => {
    expect(getProcess(state, 2).id).toEqual('2');
  });

  it('should return a list of clients for a specific process', () => {
    expect(getClients(state, 1)[1].id).toEqual('client2');
  });

  it('should return an empty list if process id not found', () => {
    expect(getClients(state, 3).length).toEqual(0);
  });

  it('should return a list of questionaires for a specific process', () => {
    expect(getQuestionaires(state, 1)[0].id).toEqual(1);
  });

  it('should return an empty list if procId not found', () => {
    expect(getQuestionaires(state, 3).length).toEqual(0);
  });

  it('should return specific questionaire', () => {
    expect(getQuestionaire(state, 2, 1).id).toEqual(1);
  });

  it('should test if a client exists', () => {
    expect(clientExists(state, 1, { id: '1', mail: 'c1@example.com' })).toEqual(true);
  });

  it('should test if a client does not exists', () => {
    expect(clientExists(state, 1, { id: '1', mail: 'undefined' })).toEqual(false);
  });

  it('should get a language if exists', () => {
    expect(getLanguage(state, 1)).toEqual(Language.DE);
  });

  it('should get default language', () => {
    expect(getLanguage(state, 'no process')).toEqual(Language.DE);
  });
});
