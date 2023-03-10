export const quizzesInitialState = {
  history: [],
  current: {
    quiz: null,
    result: null,
  },
};

export default (state = quizzesInitialState, { type, payload }) => {
  switch (type) {
    case 'LOAD_HISTORY_SUCCESS':
      return { ...quizzesInitialState, history: payload };

    case 'LOAD_QUIZ_SUCCESS':
      return { ...state, current: { quiz: payload, result: null } };

    case 'SUBMIT_QUIZ_SUCCESS':
      return { ...state, current: { ...state.current, result: payload } };

    default:
      return state;
  }
};
