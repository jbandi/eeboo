import { getContextIds, getContextById, getContentByLanguage } from './context';

describe('test selectors for feedbackers', () => {
  const state = {
    context: {
      allIds: ['1', '2'],
      byId: {
        1: {
          id: 1,
          contents: [
            {
              lan: 'de',
              content: 'Konfliktfähigkeit',
            },
            {
              lan: 'en',
              content: 'abilitity to manage conflicts',
            },
          ],
        },
        2: {
          id: 2,
          contents: [
            {
              lan: 'de',
              content: 'Teamfähigkeit',
            },
            {
              lan: 'en',
              content: 'ability to work in team',
            },
          ],
        },
      },
    },
  };

  it('it should return a list of all context ids', () => {
    expect(getContextIds(state).length).toEqual(2);
  });

  it('it should return an empty list if context ist not propper defined', () => {
    expect(getContextIds({ test: 'test ' }).length).toEqual(0);
  });

  it('it should return specific context by its id', () => {
    expect(getContextById(state, 2).id).toEqual(2);
  });

  it('it should return luangage specific content for a given context', () => {
    expect(getContentByLanguage(state, 2, 'de').content).toEqual('Teamfähigkeit');
  });

  it('it should return an empty object if content not found', () => {
    expect(getContentByLanguage(state, 2, 'bla')).toEqual({});
  });
});
