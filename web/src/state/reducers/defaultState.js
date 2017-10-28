export const defaultCompany = {
  idFechting: false,
  id: 1,
  name: 'eeboo',
  color: '#01DF74',
  mail: 'mathu at example.com',
  lastUpdated: Date.now(),
};

export const defaultQuestionaire = {
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
          content: 'Frage 3 für teamleaders zu Teamfähigkeit',
        },
        {
          lan: 'en',
          role: 1,
          content: 'question 3 for teamleaders, work in teams',
        },
        {
          lan: 'de',
          role: 2,
          content: 'Frage 3 für Kollegen zu Teamfähigkeit',
        },
        {
          lan: 'en',
          role: 2,
          content: 'question 3 for colleagues, work in teams',
        },
      ],
    },
  },
};

export const defaultContext = {
  allIds: ['1', '2'],
  byId: {
    1: {
      id: 1,
      contents: [
        {
          lan: 'de',
          content: 'Konfliktfähigkeit',
        },
        {
          lan: 'en',
          content: 'abilitity to manage conflicts',
        },
      ],
    },
    2: {
      id: 2,
      contents: [
        {
          lan: 'de',
          content: 'Teamfähigkeit',
        },
        {
          lan: 'en',
          content: 'ability to work in team',
        },
      ],
    },
  },
};

export const defaultClient = {
  byId: [1, 2],
  byHash: {
    1: {
      id: '1',
      questionaire: '8as8-1s57-1uus-9s73',
      mail: 'client1.example.com',
      feedbackers: [1, 2],
    },
    2: {
      id: '2',
      questionaire: '8as8-1s57-1uus-9s73',
      mail: 'client2.example.com',
      feedbackers: [3, 4],
    },
  },
};


export const defaultFeedbacker = {
  byId: [1, 2],
  byHash: {
    1: {
      id: '1',
      mail: 'mathu at example.com',
      role: 1,
      questionaire: '8as8-1s57-1uus-9s73',
      lastUpdated: '10',
      answers: {
        xy: { score: 3 },
      },
    },
    2: {
      id: 2,
      mail: 'email address',
      role: 1,
      questionaire: '8as8-1s57-1uus-9s73',
      lastUpdated: '10',
      answers: {
        xy: { score: 3 },
        cd: { score: 3 },
      },
    },
  },
};
