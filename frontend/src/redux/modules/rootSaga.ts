import { all } from 'redux-saga/effects';
import { bookmarkSaga } from '../bookmark';
import { authSaga } from './auth';
import { profileSaga } from './profile';

export default function* rootSaga() {
  yield all([authSaga(), profileSaga(), bookmarkSaga()]);
}
