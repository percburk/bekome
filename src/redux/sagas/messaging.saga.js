import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchMessages() {
  try {
    const response = yield axios.get('/api/messaging');
    yield put({ type: 'SET_MESSAGES', payload: response.data });
  } catch (err) {
    console.log('Error in fetchMessages', err);
  }
}

export default function* messagingSaga() {
  yield takeEvery('FETCH_MESSAGES', fetchMessages);
}
