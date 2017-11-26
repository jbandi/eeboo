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

export default removeItem;
