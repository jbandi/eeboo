export const feedbacker = {
  byId: ['feedbacker1', 'feedbacker2'],
  byHash: {
    feedbacker1: {
      clients: {
        client1: {
          id: 'client1',
          role: 'role2',
        },
        client2: {
          answers: {
            question0: 2,
            question1: 3,
            question2: 4,
            question3: 2,
          },
          id: 'client2',
          role: 'role1',
        },
      },
      id: 'feedbacker1',
      mail: 'feedbacker1@example.com',
      proc: '1',
    },
    feedbacker2: {
      clients: {
        client1: {
          answers: {
            question0: 2,
            question1: 4,
            question2: 3,
            question3: 2,
          },
          id: 'client1',
          role: 'role2',
        },
        client2: {
          id: 'client2',
          role: 'role1',
        },
        client3: {
          id: 'client3',
          role: 'role1',
        },
      },
      id: 'feedbacker2',
      mail: 'feedbacker2@example.com',
      proc: '1',
    },
  },
};

export default feedbacker;
