import { createSelector } from 'reselect';

import { RootState } from '../rootReducer';
import { ItemType } from '../../enums/app';

const itemType = (state: RootState) => state.App.itemType;
const itemID = (state: RootState) => state.App.itemID;
const infoType = (state: RootState) => state.App.infoType;

export const selectItemType = createSelector(
  [itemType],
  (itemType) => itemType,
);

export const selectItemID = createSelector(
  [itemID],
  (itemID) => itemID,
);

export const selectInfoType = createSelector(
  [infoType],
  (infoType) => infoType,
);

export const selectActiveContainerID = createSelector(
  [selectItemType, selectItemID],
  (itemType, itemID) => {
    return itemType === ItemType.container ? itemID : '';
  },
);

export const selectActiveImageID = createSelector(
  [selectItemType, selectItemID],
  (itemType, itemID) => {
    return itemType === ItemType.image ? itemID : '';
  },
);

export const selectActiveVolumeID = createSelector(
  [selectItemType, selectItemID],
  (itemType, itemID) => {
    return itemType === ItemType.volume ? itemID : '';
  },
);
