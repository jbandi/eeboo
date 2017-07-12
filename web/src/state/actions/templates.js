let nextContextId = 0;

export const addTodo = description => {
  return {
    type: 'ADD_CONTEXT',
    id: nextContextId++,
    description
  }
}
