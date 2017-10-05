const templates = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CONTEXT':
      return [
        ...state,
        {
          id: action.id,
          text: action.description,
        },
      ];
    default:
      return state;
  }
};

export default templates;
