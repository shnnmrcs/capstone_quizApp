export const quizInitialState = null;

export default (state = testsInitialState, { type, payload }) => {
  switch (type) {
    case 'TAKE_QUIZ_SUCCESS':
      return payload;

    case 'CLEAR_QUIZ_SUCCESS':
      return payload;

    case 'SUBMIT_QUIZ_SUCCESS':
      return payload;

    default:
      return state;
  }
};
