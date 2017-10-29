export const defaultCompany = {
  idFechting: false,
  id: 1,
  name: 'eeboo',
  color: '#01DF74',
  mail: 'mathu at example.com',
  lastUpdated: Date.now(),
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

export const defaultProc = {
  clients: {
    client1: {
      feedbackers: [
        'feedbacker1',
        'feedbacker2',
      ],
      id: 'client1',
      mail: 'client1@example.com',
      questionaire: '8as8-1s57-1uus-9s73',
    },
    client2: {
      feedbackers: [
        'feedbacker1',
        'feedbacker2',
      ],
      id: 'client2',
      mail: 'client2@example.com',
      questionaire: '8as8-1s57-1uus-9s73',
    },
  },
  id: '1',
  questionaires: {
    1234: {
      contexts: [
        null,
        {
          contents: [
            {
              content: 'Konfliktfähigkeit',
              lan: 'de',
            },
            {
              content: 'ability to manage conflicts',
              lan: 'en',
            },
          ],
        },
        {
          contents: [
            {
              content: 'Teamfähigkeit',
              lan: 'de',
            },
            {
              content: 'ability to work in team',
              lan: 'en',
            },
          ],
        },
      ],
      id: 1234,
      questions: {
        question1: {
          contents: [
            {
              content: 'Frage1 für Rolle1 im Kontext1',
              lan: 'de',
              role: 'role1',
            },
            {
              content: 'Frage 1 für Rolle2 im Kontext1',
              lan: 'de',
              role: 'role2',
            },
            {
              content: 'quetsion1 for role1 in context1',
              lan: 'en',
              role: 'role3',
            },
            {
              content: 'question1 for role2 in context1',
              lan: 'en',
              role: 'role2',
            },
          ],
          context: 1,
          id: 'question1',
          scores: 5,
        },
        question2: {
          contents: [
            {
              content: 'Frage2 für Rolle1 im Kontext1',
              lan: 'de',
              role: 'role1',
            },
            {
              content: 'Frage2 für Rolle2 im Kontext2',
              lan: 'de',
              role: 'role2',
            },
            {
              content: 'quetsion2 for role1 in context1',
              lan: 'en',
              role: 'role1',
            },
            {
              content: 'question2 for role2 in context1',
              lan: 'en',
              role: 'role2',
            },
          ],
          context: 1,
          id: 'question2',
          score: 4,
        },
        question3: {
          contents: [
            {
              content: 'Frage3 für Rolle1 im Kontext2',
              lan: 'de',
              role: 'role1',
            },
            {
              content: 'Frage3 für Rolle2 im Kontext2',
              lan: 'de',
              role: 'role2',
            },
            {
              content: 'question3 for role1 in context2',
              lan: 'en',
              role: 'role1',
            },
            {
              content: 'question 3 for role2 in context2',
              lan: 'en',
              role: 'role2',
            },
          ],
          context: 2,
          id: 'question3',
          score: 5,
        },
      },
      roles: {
        role1: {
          contents: [
            {
              content: 'Arbeitskollege',
              lan: 'de',
            },
            {
              content: 'collegue',
              lan: 'en',
            },
          ],
          id: 'role1',
        },
        role2: {
          contents: [
            {
              content: 'Vorgesetzter',
              lan: 'de',
            },
            {
              content: 'chief',
              lan: 'en',
            },
          ],
          id: 'role2',
        },
      },
    },
  },
};
