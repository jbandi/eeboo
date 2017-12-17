export const roles = {
  role1: {
    id: 'role1',
    contents: [{ content: 'Kollege', lan: 'de' }, { content: 'friend', lan: 'en' }],
  },
  role2: {
    id: 'role2',
    contents: [{ content: 'Chef', lan: 'de' }, { content: 'chief', lan: 'en' }],
  },
};
export const contexts = {
  A: {
    id: 'A',
    contents: [{ content: 'Kritikfähigkeit', lan: 'de' }],
  },
  B: {
    id: 'B',
    contents: [{ content: 'Konfliktfähigkeit', lan: 'de' }],
  },
  C: {
    id: 'C',
    contents: [{ content: 'Teamfähigkeit', lan: 'de' }],
  },
};
export const questions = {
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
    ],
  },
  question2: {
    id: 'question2',
    scores: 5,
    context: 2,
  },
  question3: {
    id: 'question3',
    scores: 5,
    context: 2,
  },
};

export const process = {
  byId: ['1', '2'],
  byHash: {
    1: {
      clients: {
        client1: {
          feedbackers: ['feedbacker1', 'feedbacker2'],
          id: 'client1',
          mail: 'c1@example.com',
          name: 'c1-name',
          firstname: 'c1-firstname',
          questionaire: 'q1',
        },
        client2: {
          feedbackers: ['feedbacker1', 'feedbacker2'],
          id: 'client2',
          mail: 'c2@example.com',
          name: 'c2-name',
          firstname: 'c2-firstname',
          questionaire: 'q1',
        },
      },
      company: 'c1',
      end: '1511730071318',
      id: '1',
      language: 'de',
      questionaires: {
        1234: {
          id: '1234',
          contexts,
          questions,
          roles,
        },
      },
      start: '1511730071319',
      state: 'running',
    },
    2: {
      clients: {
        client1: {
          feedbackers: ['feedbacker1', 'feedbacker2'],
          id: 'client1',
          mail: 'c1@example.com',
          name: 'c1-name',
          firstname: 'c1-firstname',
          questionaire: 'q1',
        },
        client2: {
          feedbackers: ['feedbacker1', 'feedbacker2'],
          id: 'client2',
          mail: 'c2@example.com',
          name: 'c2-name',
          firstname: 'c2-firstname',
          questionaire: 'q1',
        },
      },
      company: 'c2',
      end: '1511730071318',
      id: '2',
      questionaires: {},
      start: '1511730071319',
      state: 'running',
    },
  },
};

export default process;
