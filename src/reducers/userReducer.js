export const initialState = {
  accessToken: '',
  user: null,
  userInitialState: true,
};

export const userReducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case 'CHECK_LOGIN':
      if (payload.user !== null)
        localStorage.setItem('token', JSON.stringify(payload));
      return { ...payload, userInitialState: false };

    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', JSON.stringify(payload));
      return { ...payload, userInitialState: false };

    case 'REGISTER_SUCCESS':
      return { ...state, registerSuccess: meta.registerSuccess };

    case 'PASSWORD_RESET_SUCCESS':
      return { ...state, resetPasswordSuccess: meta.resetPasswordSuccess };

    case 'SAVE_QUIZ_HISTORY_SUCCESS':
      localStorage.setItem(
        'token',
        JSON.stringify({
          ...meta.JSONToken,
          user: {
            ...meta.JSONToken.user,
            quizHistory: payload.quizHistory,
          },
        }),
      );
      return {
        ...state,
        user: { ...state.user, quizHistory: payload.quizHistory },
      };

    case 'LOGOUT': {
      localStorage.clear();
      return { initialState, userInitialState: false };
    }

    default:
      return state;
  }
};
