import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// Sagas that handle messaging. 
// fetchMessages retrieves past messages from the database and stores in a reducer
// markAsRead will change a messages status upon viewing and re-retrieve all messages

function* fetchMessages() {
  try {
    const response = yield axios.get('/api/messaging');
    // store messages in reducer
    yield put({ type: 'SET_MESSAGES', payload: response.data });
  } catch (err) {
    console.log('Error in fetchMessages', err);
  }
}

function* markAsRead(action) {
  try {
    yield axios.put('/api/messaging', { id: action.payload });
    yield put({ type: 'FETCH_MESSAGES' });
  } catch (err) {
    console.log('Error in markAsRead', err);
  }
}

export default function* messagingSaga() {
  yield takeEvery('FETCH_MESSAGES', fetchMessages);
  yield takeEvery('MARK_AS_READ', markAsRead);
}
