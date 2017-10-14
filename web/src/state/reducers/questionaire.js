const defaultState = {
  allIds: ['question1'],
  byId: {
    question1: {
      id: 'question1',
      scores: 5,
      context: 1,
      contents: [
        {
          lan: 'de',
          role: 1,
          content: 'Frage 1 für Teamleiter zu Konfliktmanagement',
        },
        {
          lan: 'en',
          role: 1,
          content: 'question 1 for teamleader, conflict management',
        },
        {
          lan: 'de',
          role: 2,
          content: 'Frage 1 für Kollegen zu Konfliktmanagement',
        },
        {
          lan: 'en',
          role: 2,
          content: 'question 1 for colleagues, conflict management',
        },
      ],
    },
  },
};

const questionaire = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default questionaire;
