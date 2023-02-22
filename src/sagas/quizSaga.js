/* eslint-disable no-underscore-dangle */
import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import axiosInstance from '../utils/axiosInstance';

export function* submitQuiz({ payload, meta }) {
  const { data, questionsList, testID, user } = payload;
  // const answers = questionsList.reduce((p, c) => [...p, c.answer], []);
  const date = new Date();
  const dateTaken = new Intl.DateTimeFormat('en-US').format(date);
  const result = questionsList.reduce(
    (previous, current, index) => {
      if (current.answer === data[index]) {
        const score = current.weight + previous.score;
        const correct = previous.correct + 1;
        return { ...previous, score, correct };
      }
      return previous;
    },
    { score: 0, correct: 0 },
  );
  yield put({
    type: 'SUBMIT_QUIZ_SUCCESS',
    payload: {
      ...result,
      testID,
      dateTaken,
      userID: user._id,
    },
    meta,
  });
  try {
    yield call(axiosInstance, {
      method: 'PATCH',
      url: `/api/users/update/${user._id}`,
      data: {
        quizHistory: [
          ...user.quizHistory,
          {
            testID,
            score: result.score,
            dateTaken,
          },
        ],
      },
    });
    
    const token = localStorage.getItem('token');
    const JSONToken = JSON.parse(token);
    const updatedUser = {
      ...user,
      quizHistory: [
        ...user.quizHistory,
        {
          testID,
          score: result.score,
          dateTaken,
        },
      ],
    };

    yield put({
      type: 'SAVE_QUIZ_HISTORY_SUCCESS',
      payload: updatedUser,
      meta: {
        ...meta,
        JSONToken,
      },
    });
  } catch (error) {
    yield put({
      type: 'SAVE_QUIZ_HISTORY_FAIL',
      payload: { message: error.message },
      meta,
    });
  }
}

function* submitQuizRequest() {
  yield takeEvery('SUBMIT_QUIZ_REQUEST', submitQuiz);
}

export default function* rootQuizSaga() {
  yield all([fork(submitQuizRequest)]);
}
