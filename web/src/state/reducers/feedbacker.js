import {
  RECEIVE_COMPANY,
  REQUEST_COMPANY,
} from '../actions/company';

const defaultState = [
  {
    id: 'sie8-19sk-119s-679b',
    mail: 'mathu at example.com',
    role: 1,
    questionaire: '8as8-1s57-1uus-9s73',
    answers: [
      {
        question_id: 'xy',
        score: 3,
      },
    ],
  },
  {
    id: 'aaaa-bbbb-cccc-dddd',
    mail: 'max at muster.com',
    role: 2,
    questionaire: '8as8-1s57-1uus-9s73',
    answers: [
      {
        question_id: 'xy',
        score: 4,
      },
    ],
  },
];


const company = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_COMPANY:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_COMPANY:
      return Object.assign({}, state, {
        isFetching: false,
        id: action.id,
        name: action.name,
        color: action.color,
        mail: action.mail,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
};

export default company;
