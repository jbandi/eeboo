import uuidv4 from 'uuid/v4';

// Language constants
export const Language = {
  DE: 'de',
  EN: 'en',
  FR: 'fr',
};

// remove an item from an object list
// removal is implemented as immutable update
// return a new list of objects
export const removeItem = (list, item) => (
  Object.keys(list).reduce((obj, key) => {
    if (key !== item) {
      return { ...obj, [key]: list[key] };
    }
    return obj;
  }, {})
);

// add an item to an object list
// return a new list of objects
export const addItem = (list, newArray) => {
  const l = list;
  newArray.forEach((e) => { l[e.id] = e; });
  return l;
};

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
