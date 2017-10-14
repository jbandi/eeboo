import {
  RECEIVE_FEEDBACKER,
  REQUEST_FEEDBACKER,
  UPDATE_ANSWER,
} from '../actions/feedbacker';

const defaultState = {
  byId: ['sie8-19sk-119s-679b', 'aaaa-bbbb-cccc-dddd'],
  byHash: {
    'sie8-19sk-119s-679b': {
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
    'aaaa-bbbb-cccc-dddd': {
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
  },
};

const feedbacker = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_FEEDBACKER:
      return Object.assign({}, state, {
        isFetchingFeedbacker: true,
      });
    case RECEIVE_FEEDBACKER:
      return Object.assign({}, state, {
        isFetchingFeedbacker: false,
        lastUpdated: action.receivedAt,
        feedbacker: action.feedbacker,
      });
    case UPDATE_ANSWER: {
      const newState = {
        ...state.byId,
        ...state.byHash,
        [action.id]: {
          ...state.byHash[action.id],
          answers: {
            ...state.byHash[action.id].answers,
            [action.question_id]: { score: action.score },
          },
        },
      };
      return newState;
    }
    default:
      return state;
  }
};

export default feedbacker;
