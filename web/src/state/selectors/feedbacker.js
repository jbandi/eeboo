export const getFeedbacker = (state, id) => (
  state.find(feedbacker => feedbacker.id === id) || {}
);

export default getFeedbacker;
