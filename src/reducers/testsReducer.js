export const testsInitialState = [];

export default (state = testsInitialState, { type, payload }) => {
  switch (type) {
    case 'LOAD_TESTS_SUCCESS':
      return payload;

    default:
      return state;
  }
};
