import { ItemType, InfoType } from '../../enums/app';
import { ActionUnion, createAction } from '../commonTypes';
import { AppActionTypes } from './types';

export const appActions = {
  itemTypeRefresh: (itemType: ItemType) => createAction(AppActionTypes.itemTypeRefresh, {
    itemType,
  }),
  itemIDRefresh: (itemID: string) => createAction(AppActionTypes.itemIDRefresh, {
    itemID,
  }),
  infoTypeRefresh: (infoType: InfoType) => createAction(AppActionTypes.infoTypeRefresh, {
    infoType,
  }),
  resetTypes: () => createAction(AppActionTypes.resetTypes),
};

export type AppActions = ActionUnion<typeof appActions>;
