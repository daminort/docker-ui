import { fork, all } from 'redux-saga/effects';

import { containersSaga } from './containers/saga';

export function* rootSaga() {
  yield all([
    fork(containersSaga),
  ]);
}
