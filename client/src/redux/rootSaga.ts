import { fork, all } from 'redux-saga/effects';

import { containersSaga } from './containers/saga';
import { imagesSaga } from './images/saga';
import { volumesSaga } from './volumes/saga';

export function* rootSaga() {
  yield all([
    fork(containersSaga),
    fork(imagesSaga),
    fork(volumesSaga),
  ]);
}
