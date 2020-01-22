import { put, all, takeLatest, call } from 'redux-saga/effects';

import { ContainersService } from '../../services';

import { ContainersActionTypes } from './types';
import { containersActions } from './actions';

function* listReload() {
  const { error, data } = yield call(ContainersService.list);
  if (error) {
    return;
  }

  yield put(containersActions.listRefresh(data));
}

export function* containersSaga() {
  yield all([
    yield takeLatest(ContainersActionTypes.listReload, listReload),
  ]);
}
