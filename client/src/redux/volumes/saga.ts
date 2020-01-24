import { put, all, takeLatest, call } from 'redux-saga/effects';

import { VolumesService } from '../../services';

import { VolumesActionTypes } from './types';
import { volumesActions, VolumesActions } from './actions';
import { appActions } from '../app/actions';
import { InfoType, ItemType } from '../../enums/app';

function* listReload() {
  const { error, data } = yield call(VolumesService.list);
  if (error) {
    return;
  }

  yield put(volumesActions.listRefresh(data));
}

function* itemSelect(action: VolumesActions) {
  const { payload } = action;
  if ( !('itemID' in payload) ) {
    return;
  }
  const { itemID } = payload;

  yield put(appActions.itemTypeRefresh(ItemType.volume));
  yield put(appActions.infoTypeRefresh(InfoType.info));
  yield put(appActions.itemIDRefresh(itemID));
}

export function* volumesSaga() {
  yield all([
    yield takeLatest(VolumesActionTypes.listReload, listReload),
    yield takeLatest(VolumesActionTypes.itemSelect, itemSelect),
  ]);
}
