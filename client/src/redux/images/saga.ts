import { put, all, takeLatest, call } from 'redux-saga/effects';

import { ImagesService } from '../../services';

import { ImagesActionTypes } from './types';
import { imagesActions } from './actions';

function* listReload() {
  const { error, data } = yield call(ImagesService.list);
  if (error) {
    return;
  }

  yield put(imagesActions.listRefresh(data));
}

export function* imagesSaga() {
  yield all([
    yield takeLatest(ImagesActionTypes.listReload, listReload),
  ]);
}
