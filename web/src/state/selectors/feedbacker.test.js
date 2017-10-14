import { getFeedbacker } from './feedbacker';

describe('feedbacker selector', () => {
  const id1 = 'sie8-19sk-119s-679b';
  const id2 = 'aaaa-bbbb-cccc-dddd';
  const state = [
    { id: id1, name: '1' },
    { id: id2, name: '2' },
  ];

  it('it should return a specific feedbacker from state', () => {
    expect(getFeedbacker(state, id2)).toEqual({
      id: id2,
      name: '2',
    });
  });

  it('should return an empty object if id is missing', () => {
    expect(getFeedbacker([{ name: '2' }], id2)).toEqual({});
  });

  it('should return an empty object if id not found', () => {
    expect(getFeedbacker(state, 1)).toEqual({});
  });
});
