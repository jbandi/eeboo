import { getContentByLanguage } from './context';

describe('test selectors for feedbackers', () => {
  const context = {
    id: '1',
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
  };

  it('it should return luangage specific content for a given context', () => {
    expect(getContentByLanguage(context, 'de').content).toEqual('Konfliktfähigkeit');
  });

  it('it should return an empty object if content not found', () => {
    expect(getContentByLanguage(context, 1, 'bla')).toEqual({});
  });
});
