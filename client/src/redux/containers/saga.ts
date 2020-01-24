import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ContainersService } from '../../services';
import { ItemType, InfoType } from '../../enums/app';

import { appActions } from '../app/actions';

import { ContainersActionTypes } from './types';
import { containersActions, ContainersActions } from './actions';

function* listReload() {
  const { error, data } = yield call(ContainersService.list);
  if (error) {
    return;
  }

  yield put(containersActions.listRefresh(data));
}

function* itemSelect(action: ContainersActions) {
  const { payload } = action;
  if ( !('itemID' in payload) ) {
    return;
  }
  const { itemID } = payload;

  yield put(appActions.itemTypeRefresh(ItemType.container));
  yield put(appActions.infoTypeRefresh(InfoType.info));
  yield put(appActions.itemIDRefresh(itemID));
}

export function* containersSaga() {
  yield all([
    yield takeLatest(ContainersActionTypes.listReload, listReload),
    yield takeLatest(ContainersActionTypes.itemSelect, itemSelect),
  ]);
}
