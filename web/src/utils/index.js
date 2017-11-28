import uuidv4 from 'uuid/v4';

// remove an item from an object listen
// removal is implemented as immutable update
// return a new list of objects
export const removeItem = (list, property) => (
  Object.keys(list).reduce((obj, key) => {
    if (key !== property) {
      return { ...obj, [key]: list[key] };
    }
    return obj;
  }, {})
);

// create an empty Feedbacker with role 'self'
export const createFeedbacker = (client, procId) => ({
  id: uuidv4(),
  mail: client.mail,
  proc: procId,
  clients: {
    [client.id]: {
      id: client.id,
      role: 'self',
    },
  },
});

export default removeItem;
