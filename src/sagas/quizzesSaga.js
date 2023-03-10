/* eslint-disable no-underscore-dangle */
import { all, fork, put, call, takeLatest } from 'redux-saga/effects';
import axiosInstance from '../utils/axiosInstance';

// export function* submitQuiz({ payload, meta }) {
//   const { data, questionsList, testID, user } = payload;
//   // const answers = questionsList.reduce((p, c) => [...p, c.answer], []);
//   const date = new Date();
//   const dateTaken = new Intl.DateTimeFormat('en-US').format(date);
//   const result = questionsList.reduce(
//     (previous, current, index) => {
//       if (current.answer === data[index]) {
//         const score = current.weight + previous.score;
//         const correct = previous.correct + 1;
//         return { ...previous, score, correct };
//       }
//       return previous;
//     },
//     { score: 0, correct: 0 },
//   );
//   const updatedUser = {
//     ...user,
//     quizHistory: [
//       ...user.quizHistory,
//       {
//         testID,
//         score: result.score,
//         dateTaken,
//       },
//     ],
//   };

//   yield put({
//     type: 'SUBMIT_QUIZ_SUCCESS',
//     payload: {
//       ...result,
//       testID,
//       dateTaken,
//       userID: user._id,
//     },
//     meta,
//   });

//   try {
//     yield call(axiosInstance, {
//       method: 'PATCH',
//       url: `/api/users/update/${user._id}`,
//       data: {
//         quizHistory: [
//           ...user.quizHistory,
//           {
//             testID,
//             score: result.score,
//             dateTaken,
//           },
//         ],
//       },
//     });

//     yield put({
//       type: 'SAVE_QUIZ_HISTORY_SUCCESS',
//       payload: updatedUser,
//       meta,
//     });
//   } catch (error) {
//     yield put({
//       type: 'SAVE_QUIZ_HISTORY_FAIL',
//       payload: { message: error.message },
//       meta,
//     });
//   }
// }

export function* submitQuiz({ payload, meta }) {
  const { data, testID, userID } = payload;
  const date = new Date();
  const dateTaken = new Intl.DateTimeFormat('en-US').format(date);

  try {
    const res = yield call(axiosInstance, {
      method: 'POST',
      url: '/api/quiz/add',
      data: {
        testID,
        userID,
        dateTaken,
        answers: data,
      },
    });

    yield put({
      type: 'SUBMIT_QUIZ_SUCCESS',
      payload: res,
      meta,
    });
  } catch (error) {
    yield put({
      type: 'SUBMIT_QUIZ_FAIL',
      payload: { message: error.message },
      meta,
    });
  }
}

export function* loadHistory({ payload, meta }) {
  try {
    const res = yield call(axiosInstance, payload);
    yield put({
      type: 'LOAD_HISTORY_SUCCESS',
      payload: res,
      meta,
    });
  } catch (error) {
    yield put({ type: 'LOAD_HISTORY_FAIL', payload: error, meta });
  }
}

export function* loadQuiz({ payload, meta }) {
  try {
    const res = yield call(axiosInstance, payload);
    yield put({
      type: 'LOAD_QUIZ_SUCCESS',
      payload: res,
      meta,
    });
  } catch (error) {
    yield put({ type: 'LOAD_QUIZ_FAIL', payload: error, meta });
  }
}

function* loadHistoryRequest() {
  yield takeLatest('LOAD_HISTORY_REQUEST', loadHistory);
}

function* loadQuizRequest() {
  yield takeLatest('LOAD_QUIZ_REQUEST', loadQuiz);
}

function* submitQuizRequest() {
  yield takeLatest('SUBMIT_QUIZ_REQUEST', submitQuiz);
}

export default function* rootQuizSaga() {
  yield all([
    fork(loadHistoryRequest),
    fork(loadQuizRequest),
    fork(submitQuizRequest),
  ]);
}
