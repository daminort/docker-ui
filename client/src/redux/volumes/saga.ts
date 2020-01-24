import { put, all, takeLatest, call } from 'redux-saga/effects';

import { VolumesService } from '../../services';

import { VolumesActionTypes } from './types';
import { volumesActions } from './actions';

function* listReload() {
  const { error, data } = yield call(VolumesService.list);
  if (error) {
    return;
  }

  yield put(volumesActions.listRefresh(data));
}

export function* volumesSaga() {
  yield all([
    yield takeLatest(VolumesActionTypes.listReload, listReload),
  ]);
}
