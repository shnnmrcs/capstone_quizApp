export const quizInitialState = null;

export default (state = quizInitialState, { type, payload }) => {
  switch (type) {
    case 'SUBMIT_QUIZ_SUCCESS':
      return payload;

    default:
      return state;
  }
};
