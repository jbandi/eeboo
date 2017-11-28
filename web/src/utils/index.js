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
export const createFeedbacker = (clientId, mail, procId, gender = 'm', role = 'self') => ({
  id: uuidv4(),
  mail,
  proc: procId,
  gender,
  clients: {
    [clientId]: {
      id: clientId,
      role,
    },
  },
});

export default removeItem;
