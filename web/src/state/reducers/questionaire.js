const questionaire = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const defaultState = {
  allIds: ['question1', 'question2', 'question3'],
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
    question2: {
      id: 'question2',
      scores: 3,
      context: 1,
      contents: [
        {
          lan: 'de',
          role: 1,
          content: 'Frage 2 für Teamleiter zu Konfliktmanagement',
        },
        {
          lan: 'en',
          role: 1,
          content: 'question 2 for teamleader, conflict management',
        },
        {
          lan: 'de',
          role: 2,
          content: 'Frage 2 für Kollegen zu Konfliktmanagement',
        },
        {
          lan: 'en',
          role: 2,
          content: 'question 2 for colleagues, conflict management',
        },
      ],
    },
    question3: {
      id: 'question3',
      scores: 6,
      context: 2,
      contents: [
        {
          lan: 'de',
          role: 1,
          content: 'Frage 3 für teamleaders zu Kommunikation',
        },
        {
          lan: 'en',
          role: 1,
          content: 'question 3 for teamleaders, communication',
        },
        {
          lan: 'de',
          role: 2,
          content: 'Frage 3 für Kollegen zu Kommunikation',
        },
        {
          lan: 'en',
          role: 2,
          content: 'question 3 for colleagues, communication',
        },
      ],
    },
  },
};


export default questionaire;
