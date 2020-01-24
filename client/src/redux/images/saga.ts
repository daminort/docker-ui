import { put, all, takeLatest, call } from 'redux-saga/effects';

import { ImagesService } from '../../services';

import { ImagesActionTypes } from './types';
import { imagesActions, ImagesActions } from './actions';
import { appActions } from '../app/actions';
import { InfoType, ItemType } from '../../enums/app';

function* listReload() {
  const { error, data } = yield call(ImagesService.list);
  if (error) {
    return;
  }

  yield put(imagesActions.listRefresh(data));
}

function* itemSelect(action: ImagesActions) {
  const { payload } = action;
  if ( !('itemID' in payload) ) {
    return;
  }
  const { itemID } = payload;

  yield put(appActions.itemTypeRefresh(ItemType.image));
  yield put(appActions.infoTypeRefresh(InfoType.info));
  yield put(appActions.itemIDRefresh(itemID));
}

export function* imagesSaga() {
  yield all([
    yield takeLatest(ImagesActionTypes.listReload, listReload),
    yield takeLatest(ImagesActionTypes.itemSelect, itemSelect),
  ]);
}
