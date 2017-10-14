export const REQUEST_FEEDBACKER = 'REQUEST_FEEDBACKER';
export const RECEIVE_FEEDBACKER = 'RECEIVE_FEEDBACKER';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';

export function updateAnswer(answer) {
  return {
    type: UPDATE_ANSWER,
    lastUpdated: Date.now(),
    id: answer.id,
    questionId: answer.questionId,
    score: answer.score,
  };
}
